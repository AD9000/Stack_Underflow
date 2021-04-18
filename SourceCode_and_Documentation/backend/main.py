import models
import json
import shutil
import os.path
import random
from random import randrange
from models import Users, Tags
from typing import Optional
from fastapi import FastAPI, Request, Depends, File, UploadFile, Body
from fastapi.responses import FileResponse
from pydantic import BaseModel
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from sqlalchemy import delete, insert, update, func, or_
from sqlalchemy.orm.exc import NoResultFound
from auth import generate_uid
from datetime import datetime 
from starlette.responses import StreamingResponse
# May need to import this library below, but right now, it isn't being used:
# from sqlalchemy.orm.exc import MultipleResultsFound

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

class UserRegister(BaseModel):
    id : int
    username : str
    password : str
    email : str

class UserLogin(BaseModel):
    username : str
    password : str

class TagInfo(BaseModel):
    user : str
    title : str
    region : str
    location : str 
    caption: str
    song : str # url ?

    # Pydantic vs UploadFile fix
    # https://github.com/tiangolo/fastapi/issues/2257
    @classmethod
    def __get_validators__(cls):
        yield cls.validate_to_json

    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
    

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally: 
        db.close()

# Homepage

@app.get("/")
async def root():
    # insert homepage info here
    return {"message": "Hello World"}

# Sign Up 
@app.post("/registerUser")
async def registerUser(userReg: UserRegister, db: Session = Depends(get_db)):
    register = Users()
    #register.id = generate_uid()
    register.username = userReg.username
    register.password = userReg.password
    register.email = userReg.email

    try:
        # Check if username exists
        db.query(Users).filter(Users.username == userReg.username).one()
        db.commit()
        return {"username already exists": userReg.username}
    except NoResultFound:
        # Check if email exists
        try:
            db.query(Users).filter(Users.email == userReg.email).one()
            db.commit()
            return {"email already exists": userReg.email}
        except NoResultFound:
            # Create user if details don't exist
            db.add(register)
            db.commit()
            return {"user created": userReg.username}

# Log In
@app.put("/login")
async def loginUser(login: UserLogin, db: Session = Depends(get_db)):
    try:
        # Check username to login with username
        db.query(Users).filter(Users.username == login.username).one()
        db.commit()
        try:
            # If username matches, check password
            user = db.query(Users).filter(Users.username == login.username, Users.password == login.password).one()
            db.commit()
        except NoResultFound:
            return {"incorrect password": login.username}
        
        setattr(user, 'loggedIn', True)
        db.commit()
        return {"user login successful": login.username}
    
    except NoResultFound:
        return {"user does not exist": login.username}

#Log Out
@app.put("/logout/{username}")
async def loginUser(username: str, db: Session = Depends(get_db)):
    try:
        user = db.query(Users).filter(Users.username == username),one()
        db.commit()
    except NoResultFound:
        return {"user does not exist": username}
    
    setattr(user, 'loggedIn', False)
    db.commit()
    return {"user logout successful": username}

# Publish New Tag 
# To-Do Do we need to add {username} to get the username of user logged in?
@app.post("/publishTag")
async def publishTag(tagInf : TagInfo = Body(...), db: Session = Depends(get_db), img: UploadFile = File(None)):
    tg = Tags()
    tg.id = 0
    while (True):
        try:
            # if id already exists then +1 to number
            db.query(Tags).filter(Tags.id == tg.id).one()
            db.commit()
            tg.id+=1
        except NoResultFound:
            break

    tg.username = tagInf.user
    tg.title = tagInf.title
    tg.region = tagInf.region
    tg.location = tagInf.location
    tg.n_likes = 0
    tg.caption = tagInf.caption
    tg.song = tagInf.song
    tg.time_made = datetime.now()
    tg.time_edited = tg.time_made
    tg.image = -1 # -1 if image isn't uploaded
    
    if img:
        # Save to image to folder in backend
        imageIndex=0
        path = "Images/" + str(imageIndex)
        while (os.path.exists(path)):
            imageIndex+=1
            path = "Images/" + str(imageIndex)

        tg.image = imageIndex
        with open(path, "wb") as buffer:
            shutil.copyfileobj(img.file, buffer)

    db.add(tg)
    db.commit()    
    
    return {"tag posted": tg.title}

# Generate Random Tag
@app.get("/generateRandomTag")
async def generateRandomTag(db: Session = Depends(get_db)):
    maxTagCount = db.query(func.count(Tags.id)).filter(Tags.n_likes >= 1000).scalar()
    randomNumber = randrange(maxTagCount)

    try:
        randomTag = db.query(Tags).filter(Tags.id == randomNumber).one()
    except NoResultFound:
        return "no posts with 1000+ likes"

    img = "no image attached"
    if randomTag.image > -1:
        img = None
        path = "Images/" + str(randomTag.image)
        img = FileResponse(path)
        
    return {
        "title" : randomTag.title,
        "region" : randomTag.region,
        "location" : randomTag.location,
        "image" : img,
        "song" : randomTag.song,
        "caption" : randomTag.caption
    }

# View Published Tag
@app.get("/viewTag/{tagID}")
async def viewTag(tagID: int, db: Session = Depends(get_db)):
    try:
        tag = db.query(Tags).filter(Tags.id == tagID).one()
    except NoResultFound:
        return "tag does not exist"

    img = "no image attached"
    if tag.image > -1:
        img = None
        path = "Images/" + str(tag.image)
        img = FileResponse(path)
        
    return {
        "title" : tag.title,
        "region" : tag.region,
        "location" : tag.location,
        "image" : img,
        "song" : tag.song,
        "caption" : tag.caption
    }

# View All My Tags
@app.get("/myTags/{username}")
async def viewAllMyTags(username: str, db: Session = Depends(get_db)):
    try:
        tagsByUser = db.query(Tags).filter(Tags.username == username).all()
    except NoResultFound:
        return "user has created no tags"

    tags = []
    for tag in tagsByUser:
        img = "no image attached"
        if tag.image > -1:
            img = None
            path = "Images/" + str(tag.image)
            img = FileResponse(path)
        tags.append({
            "title" : tag.title,
            "region" : tag.region,
            "location" : tag.location,
            "image" : img,
            "song" : tag.song,
            "caption" : tag.caption
        })

    return tags

# Filter for certain posts to appear using keyword
@app.get("/searchTags/{keyword}")
async def filterTags(keyword, db: Session = Depends(get_db)):
    # To-Do filter song details (title, artist)
    try:
        searchResult = db.query(Tags).filter(or_(att.like("%keyword%") for att in (Tags.username, Tags.title, Tags.region, Tags.location, Tags.caption))).all()
    except NoResultFound:
        return "no search results"

    tags = []
    for tag in searchResult:
        img = "no image attached"
        if tag.image > -1:
            img = None
            path = "Images/" + str(tag.image)
            img = FileResponse(path)
        tags.append({
            "title" : tag.title,
            "region" : tag.region,
            "location" : tag.location,
            "image" : img,
            "song" : tag.song,
            "caption" : tag.caption
        })
    return tags

# Filter for most-least/least-most popular tags

# Filter for oldest-newest/newest-oldest tags 

# Delete User 
@app.delete("/deleteUser")
async def deleteUser(userReg: UserRegister, db: Session = Depends(get_db)):
    # Not for functionality of website, just for deleting Users
    if (db.query(Users).filter(Users.username == userReg.username).delete()):
        db.commit()
        return {"user deleted": userReg.username}
    else: 
        return {"no user found": None}

# Change Username
@app.put("/changeUsername/{username}")
async def changeUsername(username, newUsername: str, db: Session = Depends(get_db)):
    try:
        # Check if username exists
        user = db.query(Users).filter(Users.username == username).one()
        db.commit()
    except NoResultFound:
        return {"no user found with username": None}
    
    # update username
    if newUsername == None:
        return {"empty new username": None}
    setattr(user, 'username', newUsername)
    db.commit()
    return {"username updated": newUsername}

# Change Password
@app.put("/changePassword/{username}")
async def changePassword(username: str, newPassword: str, db: Session = Depends(get_db)):
    try:
        user = db.query(Users).filter(Users.username == username).one()
        db.commit() 
    except NoResultFound:
        return {"no user found with username": None}
    
    if user.password == newPassword:    
        return {"password has already been used": None}
    
    if newPassword == None:
        return {"empty new password": None}
    
    setattr(user, 'password', newPassword)
    db.commit()
    return {"password has been updated": newPassword}

# Link to Spotify
"""
@app.get("/linkSpotify")
async def linkSpotify(db: Session = Depends(get_db)):
    # Get Spotify login token

    # Add Spotify token to user
"""

# TO DO:
# - Logout (not sure what to do or if implementation is needed for this in backend)
"""
A additional attribute will be needed -> logged_in (True/False)
"""
# - Link to Spotify

# - Generate Random Tag DONE
# - View All My Tags 1
# - View a tag DONE
# - Filter for certain posts to appear 111 same
# - Search for tags and music 111 same
# - Reset forgotten password
# - Liking a post
# - Add message/comment to new tag
# - View notifications

