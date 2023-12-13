CREATE OR ALTER PROCEDURE likePost
    @user_id VARCHAR(500),
    @post_id INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user has already liked the post
    IF NOT EXISTS (
        SELECT 1 FROM post_likes WHERE user_id = @user_id AND post_id = @post_id
    )
    BEGIN
        -- If the user has not liked the post yet, add a like
        INSERT INTO post_likes (user_id, post_id, like_count)
        VALUES (@user_id, @post_id, 1); -- Initialize like_count to 1 for the first like
    END
    ELSE
    BEGIN
        -- If the user has already liked the post, increment the like_count
        UPDATE post_likes SET like_count += 1 WHERE user_id = @user_id AND post_id = @post_id;
    END
END
