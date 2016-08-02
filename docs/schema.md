# Schema Information

## Schema

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
fname           | string    | not null, indexed
lname           | string    | not null, indexed
email           | string    | not null, indexed, unique
guest           | boolean   | not null

## rooms
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null, indexed, unique
channel     | boolean   | not null indexed

## room_users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
room_id     | integer   | not null, foreign key (references notes), indexed, unique [user_id]
user_id     | integer   | not null, foreign key (references notes), indexed, unique

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
user_id     | integer   | not null
room_id     | integer   | not null, indexed

## favorites
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, indexed
fav_message_id   | integer   | not null, indexed

![schema]

[schema]: ./schema/schema.jpg
