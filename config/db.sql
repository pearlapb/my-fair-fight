DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS student_feed;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_type VARCHAR NOT NULL,
    account_status VARCHAR NOT NULL,
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
    favourite_woman VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    achievement_type VARCHAR NOT NULL,
    achievement_name VARCHAR NOT NULL,
    badge_image VARCHAR,
    sender_id INTEGER,
    comment VARCHAR,
    created_at BIGSERIAL
);

CREATE TABLE student_feed (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    message VARCHAR,
    photo VARCHAR,
    sender_id INTEGER,
    created_at BIGSERIAL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    country VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    school VARCHAR NOT NULL,
    teacher VARCHAR,
    status VARCHAR
);
