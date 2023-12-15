CREATE OR ALTER PROCEDURE comments
    @comment_id VARCHAR(500),
    @user_id VARCHAR(500),
    @post_id VARCHAR(500),
    @comment_text TEXT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the comment already exists for the user and post
    IF EXISTS (SELECT 1 FROM post_comments WHERE comment_id = @comment_id)
    BEGIN
        -- Update the existing comment
        UPDATE post_comments
        SET comment_text = @comment_text
        WHERE comment_id = @comment_id;
    END
    ELSE
    BEGIN
        -- Insert a new comment
        INSERT INTO post_comments (comment_id, comment_text, user_id, post_id, created_at)
        VALUES (@comment_id, @comment_text, @user_id, @post_id, GETDATE());
    END
END
