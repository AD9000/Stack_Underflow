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

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally: 
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}
    
#@app.get("/items/{item_id}")
#async def read_item(item_id: int):
#    return {"recieved item_id": item_id}

#@app.put("/items/{item_id}")
#def update_item(item_id: int, item: Item):
#    return {"item_name": item.name, "item_id": item_id, "pr": item.price}

# Authentication Functions:

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

# Delete user (not needed to implement until after deliverable 3)
@app.post("/deleteUser")
async def deleteUser(userReg: UserRegister, db: Session = Depends(get_db)):
    register = Users()
    # no security checking etc (function to remove any users you implement into database)
    db.execute(f"DELETE FROM users WHERE username = \'{userReg.username}\'")
    db.commit()
    return {"user deleted": userReg.username}
