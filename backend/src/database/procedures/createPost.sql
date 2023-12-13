CREATE OR ALTER PROCEDURE createPost
    @user_id VARCHAR(500),
    @post_id varchar(500),
    @post_text TEXT,
    @image_url VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO post (user_id,post_id, post_text, image_url)
    VALUES (@user_id,@post_id, @post_text, @image_url);
END


