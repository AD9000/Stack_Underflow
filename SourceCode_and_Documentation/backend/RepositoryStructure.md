# Repository Structure - Backend
A tree diagram of the repository is as follows:
```
backend/
├── Images
│   └── 0.png
├── README.md
├── database.py
├── insert.sql
├── main.py
├── models.py
├── requirements.txt
└── users.db
```

## Details

We follow a standard FastAPI backend structure

### Images/

- contains the images stored for saved tags

### database.py

- contains SQLAlchemy models that connect to a SQLite database (opening a file called [users.db](users.db) with the SQLite database)

### insert.sql

- contains dummy data for backend testing and demo

### main.py

- file (oof)

### models.py

- contains database models (tables) of the application
- currently only includes Users and Tags

### requirements.txt

- It is a standard file for pip package management
  - contains the exact names and versions of the packages used by the backend
  - For more information, check out the official site (https://pip.pypa.io/en/stable/cli/pip_install/#requirement-specifiers)

### users.db

- The actual sqlite3 database used by the backend


