CREATE OR ALTER PROCEDURE likePost
    @like_id VARCHAR(500),
    @user_id VARCHAR(500),
    @post_id varchar(500)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @existing_likes INT;

    SELECT @existing_likes = like_count
    FROM post_likes
    WHERE user_id = @user_id AND post_id = @post_id;

    IF @existing_likes IS NULL
    BEGIN
        INSERT INTO post_likes (like_id, user_id, post_id, like_count)
        VALUES (@like_id, @user_id, @post_id, 1);
    END
    ELSE
    BEGIN
        IF @existing_likes = 1
        BEGIN
            DELETE FROM post_likes WHERE user_id = @user_id AND post_id = @post_id;
        END
        ELSE
        BEGIN
            UPDATE post_likes SET like_count = like_count - 1 WHERE user_id = @user_id AND post_id = @post_id;
        END
    END
END
