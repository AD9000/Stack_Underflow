from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None

@app.get("/")
async def root():
    return {"message": "Hello World"}
    
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"recieved item_id": item_id}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id, "pr": item.price}

@app.