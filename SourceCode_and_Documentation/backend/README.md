# Backend
Serving out the API goodness

## Tech Stack
- FastAPI (https://fastapi.tiangolo.com/)
- SQLite (https://docs.python.org/3/library/sqlite3.html)
- SQLAlchemy (https://www.sqlalchemy.org/)
- Python3.8
- pip

## Setup Steps

- Navigate to the backend folder 
```sh
cd ~/Stack_Underflow/SourceCode_and_Documentation/backend
```

- Set up your virtual environment
```sh
# install if you don't have one yet
python3 -m pip install virtualenv

# create the env
python3 -m virtualenv venv

# start up the venv
. venv/bin/activate
```

- Install requirements
```sh
pip install -r requirements.txt
```

- Run the server
```sh
uvicorn main:app --reload
```

Note, the reload flag makes it development only, might add in a deployment script at some point

## Backend Directory Structure
For a detailed repository structure check out [RepositoryStructure.md](RepositoryStructure.md)
