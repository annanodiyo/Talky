CREATE TABLE post (
    post_id varchar(500) PRIMARY KEY ,
    user_id VARCHAR(500) NOT NULL,
    post_text TEXT,
    image_url VARCHAR(255),
    post_date DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
drop table post

select * from post

select * from post_likes

drop table post_likes

CREATE TABLE post_likes (
    like_id VARCHAR(500),
    user_id VARCHAR(500) NOT NULL,
    post_id varchar(500) PRIMARY KEY ,
    like_count INT DEFAULT 0,
    like_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    UNIQUE(user_id, post_id) -- Ensures that a user can only like a post once
);

CREATE TABLE post_comments (
    comment_id VARCHAR(500) PRIMARY KEY,
    user_id VARCHAR(500) NOT NULL,
    post_id VARCHAR(500),
    comment_text TEXT,
    is_Deleted BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

select * from post_comments
select * from users
drop table post_comments
