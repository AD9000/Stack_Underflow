create table User (
	username text unique not null,
    password text not null,
    email text unique not null, -- need to check email regex 
    primary key (username)
);
-- Used this command in the database
-- c.execute("""CREATE TABLE User ( 
--            username text unique not null,
--           password text not null,
--            email text unique not null,
--           primary key (username)
--            ) """)
