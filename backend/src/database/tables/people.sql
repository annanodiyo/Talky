CREATE TABLE followers (
    follower_id VARCHAR(500),
    following_id VARCHAR(500),
    follow_id VARCHAR(500),
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES Users(user_id),
    FOREIGN KEY (following_id) REFERENCES Users(user_id)
);
