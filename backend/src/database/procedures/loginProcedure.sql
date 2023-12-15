
CREATE OR ALTER PROCEDURE loginUser(
    @username VARCHAR(200),
    @password VARCHAR(200))
AS
BEGIN

    SELECT * FROM users WHERE username= @username

END
