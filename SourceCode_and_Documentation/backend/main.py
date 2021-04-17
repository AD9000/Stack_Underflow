import models
import json
import shutil
import os.path
from models import Users, Tags
from typing import Optional
from fastapi import FastAPI, Request, Depends, File, UploadFile, Body
from pydantic import BaseModel
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from sqlalchemy import delete
from sqlalchemy import insert 
from sqlalchemy import update
from sqlalchemy.orm.exc import NoResultFound
from auth import generate_uid
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

class Tag(BaseModel):
    title : str
    region : str
    location : str 
    n_likes : int
    song : str # url ?
    caption : str

    # I don't know what this classmethod stuff does
    # but it helps solve Pydantic vs UploadFile problem I was having 
    # https://github.com/tiangolo/fastapi/issues/2257 < refer to this
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
        # Create user if details don't exist
        db.add(register)
        db.commit()
        return {"user created": userReg.username}

# Log In
@app.post("/login")
async def loginUser(login: UserLogin, db: Session = Depends(get_db)):
    db.query(Users).filter(Users.username == login.username, Users.password == login.password)
    try:
        # Check username to login with username
        db.query(Users).filter(Users.username == login.username).one()
        db.commit()
        try:
            # If username matches, check password
            db.query(Users).filter(Users.username == login.username, Users.password == login.password).one()
            db.commit()
            return {"user login successful": login.username}
        except NoResultFound:
            return {"incorrect password": login.username}
    except NoResultFound:
        return {"user does not exist": login.username}

# Publish New Tag
# not finished plz dont touch - reinier
@app.post("/publishTag")
async def publishTag(tagInfo : Tag = Body(...), db: Session = Depends(get_db), image: UploadFile = File(...)):
    #tg = Tags()
    #tg.id = generate_uid()
    #tg.title = tagInfo.title
    #tg.region = tagInfo.region
    #tg.location = tagInfo.location
    #tg.n_likes = tagInfo.n_likes
    #tg.song = tagInfo.song
    #tg.caption = tagInfo.caption
    
    # Save to image to folder in backend
    imageIndex=0
    path = "Images/" + str(imageIndex)
    while (os.path.exists(path)):
        imageIndex+=1
        path = "Images/" + str(imageIndex)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)


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
"""
@app.put("/changeUsername")
async def changeUsername(db: Session = Depends(get_db)):
    # need an input new username

    try:
        # Check if username exists
        db.query(Users).filter(Users.username == userReg.username).one()
        db.commit()
        try:
            # update username

            return {"username uodated": }
    except NoResultFound:
        return {"no user found with username": None}
"""

# Change Password
"""
@app.put("/changePassword")
async def changePassword(db: Session = Depends(get_db)):
    # need an input new password

    try:
        # Check if username exists
        db.query(Users).filter(Users.username == userReg.username).one()
        db.commit() 
        # check if password exists
        if password exists:    
            # update password
            return {"password uodated": }
        else:
            return {"password has already been used": None}
    except NoResultFound:
        return {"no user found with username": None}
"""

# Link to Spotify
"""
@app.get("/linkSpotify")
async def linkSpotify(db: Session = Depends(get_db)):
    # Get Spotify login token

    # Add Spotify token to user
"""

# TO DO:
# - Change username 
# - Change password
# - Logout (not sure what to do or if implementation is needed for this in backend)
"""
A additional attribute will be needed -> logged_in (True/False)
"""
# - Link to Spotify

