DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_type VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    user_name VARCHAR NOT NULL,
    hashed_pw VARCHAR NOT NULL,
    age INTEGER,
    country VARCHAR,
    city VARCHAR,
    school VARCHAR,
    teacher VARCHAR,
    profile_pic_url VARCHAR,
    profile_color VARCHAR,
    favourite_kick VARCHAR,
    favourite_punch VARCHAR,
    favourite_kata VARCHAR,
    favourite_woman VARCHAR
);

CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    achievement INTEGER NOT NULL
);
