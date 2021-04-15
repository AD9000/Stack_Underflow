from sqlalchemy import Boolean, Column, ForeignKey, Numeric, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, unique=True, nullable=False)
    username = Column(String, primary_key=True, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    sportify_token = Column(String, unique=True)
    
    created_tags = relationship("Tag", back_populates="author")

class Tag(Base):
    __tablename__ = "tags"
    id = Column(String, primary_key=True, unique=True, nullable=False)
    title = Column(String, nullable=False)
    region = Column(String, nullable=False)
    location = Column(String, nullable=False)
    image = Column(String, nullable=False)
    n_likes = Column(Integer, nullable=False, default=0)
    song = Column(String)

    author = relationship("User", back_populates="created_tags")


