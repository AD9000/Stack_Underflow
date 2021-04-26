from typing import List, Optional
from pydantic import BaseModel
import json

class UserBase(BaseModel):
    username: str
    email: str

# Model used for user registration
class UserRegister(UserBase):
    password: str

class User(UserBase):
    logged_in: bool
    # tags_owned: List[Tag] = []
    class Config:
        orm_mode = True

# Model used for user login
class UserLogin(BaseModel):
    username: str
    password: str

# Model used for posting a tag
class TagInfo(BaseModel):
    title: str
    region: str
    location: str
    caption: str
    song_uri: str  # url ?

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