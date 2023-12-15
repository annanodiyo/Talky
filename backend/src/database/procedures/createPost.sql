CREATE OR ALTER PROCEDURE createPost
    @user_id VARCHAR(500),
    @post_id varchar(500),
    @post_text TEXT,
    @image_url VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @status BIT

    select @status  = is_deleted
    from users
    where is_Deleted = 0

    if @status = 0
    BEGIN
    INSERT INTO post (user_id,post_id, post_text, image_url)
    VALUES (@user_id,@post_id, @post_text, @image_url);
    END
    ELSE
    BEGIN
    print 'activate account to proceed'
    END
END
