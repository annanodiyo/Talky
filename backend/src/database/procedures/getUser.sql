CREATE OR ALTER PROCEDURE getUserByusername(
    @username VARCHAR(300)
)
AS
BEGIN
    SELECT  user_id,
            username

    FROM users WHERE username=@username;
END

select * from users
