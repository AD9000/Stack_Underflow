# Repository Structure - Backend
A tree diagram of the repository is as follows:
```
backend/
├── Images
│   └── 0.png
├── README.md
├── __pycache__
│   ├── auth.cpython-38.pyc
│   ├── database.cpython-38.pyc
│   ├── main.cpython-38.pyc
│   └── models.cpython-38.pyc
├── database.py
├── insert.sql
├── main.py
├── models.py
├── requirements.txt
└── users.db
```

## Details

We follow a standard FastAPI backend structure

### /image

- contains the images stored for saved tags

### __pycache__

- folder contains the bytecode-compiled and optimised bytecode-compiled versions of all python program files

### database.py

- contains SQLAlchemy parts that connects to a SQLite database (opening a file called [users.db](users.db) with the SQLite database)

### insert.sql

- contains dummy data for backend testing and demo

### main.py

- file

### models.py

- contains database models (tables) of the application
- currently only includes Users and Tags

### requirements.txt

- contains the requirements for installing modules used at frontend and backend

### users.db

- contains the actuall database model


