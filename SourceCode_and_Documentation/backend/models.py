import sqlalchemy
from sqlalchemy import Boolean, Column, ForeignKey, Numeric, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from database import Base

class Users(Base):
    __tablename__ = "users"
    username = Column(String, primary_key=True, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    logged_in = Column(Boolean, nullable=False, default=False)
    tags_owned = relationship("Tags")

class Tags(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True, unique=True, nullable=False)
    title = Column(String, nullable=False)
    region = Column(String, nullable=False)
    location = Column(String, nullable=False)
    image = Column(Integer, default=-1)
    n_likes = Column(Integer, nullable=False, default=0)
    song_uri = Column(String)
    caption = Column(String, nullable=False)
    time_posted = Column(DateTime(timezone=True), server_default=func.now())
    time_edited = Column(DateTime(timezone=True), onupdate=func.now())
    username = Column(String, ForeignKey('users.username'))
    comments = relationship("Comments")
