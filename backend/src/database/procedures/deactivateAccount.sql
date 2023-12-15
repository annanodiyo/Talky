CREATE OR ALTER PROCEDURE toggleAccountStatus
    @username VARCHAR(100)
AS
BEGIN
    DECLARE @currentStatus BIT

    SELECT @currentStatus = is_Deleted
    FROM users
    WHERE username = @username

    IF @currentStatus = 0
    BEGIN
        UPDATE users
        SET is_Deleted = 1
        WHERE username = @username
    END
    ELSE
    BEGIN
        UPDATE users
        SET is_Deleted = 0 
        WHERE username = @username
    END
END
