CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(100),
    @full_name VARCHAR(200),
    @email VARCHAR(300),
    @username VARCHAR(300),
    @password VARCHAR(200)
)
AS
BEGIN
    INSERT INTO users(user_id, full_name, username, email,password)
    VALUES(@user_id, @full_name, @username,@email, @password)
END

 delete from users
