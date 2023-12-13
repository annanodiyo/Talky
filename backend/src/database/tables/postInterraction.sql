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

drop table post_likes
CREATE TABLE post_likes (
    like_id INT PRIMARY KEY ,
    user_id VARCHAR(500) NOT NULL,
    post_id INT NOT NULL,
    like_count INT DEFAULT 0,
    like_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE,
    UNIQUE(user_id, post_id) -- Ensures that a user can only like a post once
);

-- CREATE TABLE post_comments (
--     comment_id INT PRIMARY KEY,
--     user_id VARCHAR(100) NOT NULL,
--     post_id INT NOT NULL,
--     comment_text TEXT,
--     comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE
-- );
