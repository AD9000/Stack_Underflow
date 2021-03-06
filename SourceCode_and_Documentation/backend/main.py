from fastapi import FastAPI
import setup
import api

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/search")
async def search(query: str = None):
    return (
        {"response": api.search(query)} if query else {"response": "empty search query"}
    )


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"recieved item_id": item_id}
