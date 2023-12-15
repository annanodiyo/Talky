CREATE OR ALTER PROCEDURE fetchAllUsers
AS
BEGIN
    SELECT * FROM users where is_deleted = 0
END
