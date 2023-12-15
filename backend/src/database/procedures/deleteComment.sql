CREATE OR ALTER PROCEDURE deleteComment(
    @comment_id VARCHAR(100),
    @user_id varchar (500))
AS
BEGIN
    update post_comments
     set is_Deleted = 1
      where comment_id = @comment_id
      and user_id = @user_id
      and is_Deleted = 0
END
