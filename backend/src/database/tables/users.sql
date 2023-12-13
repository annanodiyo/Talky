CREATE TABLE users (
    user_id VARCHAR(500) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_Deleted BIT DEFAULT 0
)

 drop table users

 select * from users
