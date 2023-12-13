CREATE OR ALTER PROCEDURE deactivateAccount(
    @username VARCHAR(100))
AS
BEGIN
    update users
     set is_Deleted = 1
      where username = @username
      and is_Deleted = 0
END
