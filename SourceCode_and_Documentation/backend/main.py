import models
from models import Users
from typing import Optional
from fastapi import FastAPI, Request, Depends
from pydantic import BaseModel
from database import SessionLocal, engine
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

class UserRegister(BaseModel):
    username : str
    password : str
    email : str

class UserLogin(Basemodel):
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
    # insert stuff here
    return {"message": "Hello World"}
    
# AUTHENTICATION:

# Sign Up 
@app.post("/register")
async def registerUser(userReg: UserRegister, db: Session = Depends(get_db)):
    register = Users()
    register.username = userReg.username
    register.password = userReg.password
    register.email = userReg.email
    db.add(register)
    db.commit()
    return {"user created": userReg.username}

# Log In
@app.post("/login")
async def loginUser(login: UserLogin, db: Session = Depends(get_db)):
    db.execute(f"SELECT FROM users WHERE username = \'{login.username}\' and password = \'{login.password}\'''")
    # not complete (check if it fetches empty)
    db.commit()
    return {"user created": userReg.username}

# Delete user (not needed to implement until after deliverable 3)
@app.post("/deleteUser")
async def deleteUser(userReg: UserRegister, db: Session = Depends(get_db)):
    # no security checking etc (function to remove any users you implement into database)
    db.execute(f"DELETE FROM users WHERE username = \'{userReg.username}\'")
    db.commit()
    return {"user deleted": userReg.username}
