-- Dummy Data for Database
-- To insert do "cat insert.sql | sqlite3 users.db" in directory

INSERT INTO USERS (username, password, email, logged_in) VALUES ('john', 'p@ssword123', 'johnsmith@gmail.com', False);;
INSERT INTO USERS (username, password, email, logged_in) VALUES ('renz', 'r3nzP@55', 'renz@hotmail.com', False);;
INSERT INTO USERS (username, password, email, logged_in) VALUES ('flash', 'imSoFast5555', 'fastguy@gmail.com', False);;  
INSERT INTO USERS (username, password, email, logged_in) VALUES ('hello', 'goodbye', 'greetings@gmail.com', False);;
INSERT INTO USERS (username, password, email, logged_in) VALUES ('quarantine', 'p4ss100', 'stuckathome@gmail.com', False);
INSERT INTO USERS (username, password, email, logged_in) VALUES ('iphone', 'apple', 'stevejobs@gmail.com', False);
INSERT INTO USERS (username, password, email, logged_in) VALUES ('samsung', 'android', 'ihatemyphone@gmail.com', False);
INSERT INTO USERS (username, password, email, logged_in) VALUES ('banana', 'fruits', 'food@gmail.com', False);
INSERT INTO USERS (username, password, email, logged_in) VALUES ('eggs', 'scrambled4Life', 'protein@gmail.com', False);
INSERT INTO USERS (username, password, email, logged_in) VALUES ('traveller', 'ilovetotravel', 'travellingguy@yahoo.com', False);


INSERT INTO tags (id, title, region, location, image, n_likes, song_uri, caption, time_posted, time_edited, username) VALUES (0, 'Russia Is Amazing', 'Asia', '59.731770 119.699219', 0, 100, 'spotify:track:1nINIHobpPWexRP8ABH8bT', 'Russia is the greatest', '2021-04-21 14:51:59', NULL, 'john');
INSERT INTO tags (id, title, region, location, image, n_likes, song_uri, caption, time_posted, time_edited, username) VALUES (1, 'Apples', 'Oceania', '33.445735 150.539785', 2, 124, 'spotify:track:6scpNkWEmUxmKY7nYjVLsX', 'I love apples', '2021-04-22 14:51:59', NULL, 'john');
INSERT INTO tags (id, title, region, location, image, n_likes, song_uri, caption, time_posted, time_edited, username) VALUES (2, 'Zebra', 'Africa', '-20.626268 30.040970', 1, 100, 'spotify:track:0HU5JnVaKNTWf6GykV9Zn8', 'Hakuna Matata!!!!! I love lion king Lol!!!!', '2021-04-23 14:51:59', NULL, 'tina');
INSERT INTO tags (id, title, region, location, image, n_likes, song_uri, caption, time_posted, time_edited, username) VALUES (3, 'Protein Baby', 'North America', '30.243207 -96.863613', 3, 100, 'spotify:track:2IFFKj9orAsQOOS0JRhHAW', 'I am a proud American!', '2021-04-23 15:53:50', NULL, 'eggs');
INSERT INTO tags (id, title, region, location, image, n_likes, song_uri, caption, time_posted, time_edited, username) VALUES (4, 'Winter Is Cold', 'Asia', '35.92713891946346, 137.30176791902025', 4, 1030, 'spotify:track:3wvG6oGSZ6c7oskNDsI1CY', 'I love White Christmases! There is nothing more magical :)', '2021-04-23 20:46:50', NULL, 'flash');
INSERT INTO tags (id, title, region, location, image, n_likes, song_uri, caption, time_posted, time_edited, username) VALUES (5, 'Flowers', 'Asia', '37.84718331824792, 114.49381703071036', 5, 100, 'spotify:track:4x6g5OuktRJPVC80unBdQl', 'Toxic relationships... Stay away!', '2021-04-23 21:33:50', NULL, 'renz');