import models
from models import Users
from typing import Optional
from fastapi import FastAPI, Request, Depends
from pydantic import BaseModel
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from sqlalchemy import delete
from sqlalchemy import insert 
from sqlalchemy import update
from sqlalchemy.orm.exc import NoResultFound
# May need to import this library below, but right now, it isn't being used:
# from sqlalchemy.orm.exc import MultipleResultsFound

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

class UserRegister(BaseModel):
    username : str
    password : str
    email : str

class UserLogin(BaseModel):
    username : str
    password : str

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
    
# AUTHENTICATION:

# Sign Up 
@app.post("/registerUser")
async def registerUser(userReg: UserRegister, db: Session = Depends(get_db)):
    register = Users()
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

# Change Username
# do stuff

# Change Password
# do stuff

# Delete User 
@app.post("/deleteUser")
async def deleteUser(userReg: UserRegister, db: Session = Depends(get_db)):
    # Not for functionality of website, just for deleting Users
    if (db.query(Users).filter(Users.username == userReg.username).delete()):
        db.commit()
        return {"user deleted": userReg.username}
    else: 
        return {"no user found": None}
