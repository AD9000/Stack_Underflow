import sqlalchemy
from sqlalchemy import Boolean, Column, ForeignKey, Numeric, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Users(Base):
    __tablename__ = "users"
    #id = Column(String, primary_key=True, unique=True, nullable=False)
    username = Column(String, primary_key=True, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    #spotify_token = Column(String, unique=True)
    tags_owned = relationship("Tags")

class Tags(Base):
    __tablename__ = "tags"
    id = Column(String, primary_key=True, unique=True, nullable=False)
    title = Column(String, nullable=False)
    region = Column(String, nullable=False)
    location = Column(String, nullable=False)
    image = Column(Integer, nullable=False)
    n_likes = Column(Integer, nullable=False, default=0)
    song = Column(String, nullable=False)
    caption = Column(String, nullable=False)
    username = Column(String, ForeignKey('users.username'))


class Song(Base):
    __tablename__ = "songs"

    link = Column(String, primary_key = True, nullable=False)
    title = Column(String, nullable=False)
    artist = Column(String, nullable=False)


