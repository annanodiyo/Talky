import Connection from "../dbhelpers/dbhelpers";
import { Request, Response } from "express";

import { commentsSchema, postSchema } from "../validators/validators";
import { v4 } from "uuid";
import axios from "axios";

const dbhelper = new Connection();

export const createPost = async (req: Request, res: Response) => {
  try {
    let { post_text, image_url, user_id } = req.body;

    let { error } = postSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const post_id = v4();

    let result = await dbhelper.execute("createPost", {
      post_id,
      post_text,
      image_url,
      user_id,
    });
    console.log(result);
    if (result) {
      return res.status(200).json({ message: "Post created successfully" });
    } else {
      return res.status(500).json({ message: "failed to create post" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    let like_id = v4();

    const { user_id, post_id } = req.body;

    const result = await dbhelper.execute("likePost", {
      user_id,
      post_id,
      like_id,
    });

    console.log(result);
    return res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    let { user_id, post_id, comment_text } = req.body;

    let { error } = commentsSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }
    const comment_id = v4();

    let result = await dbhelper.execute("comments", {
      comment_id,
      user_id,
      post_id,
      comment_text,
    });
    console.log(result);
    if (result) {
      return res.status(200).json({ message: "you added a comment" });
    } else {
      return res.status(500).json({ message: "failed to add a comment" });
    }
  } catch (error) {
    console.error("error adding a comment", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editComment = async (req: Request, res: Response) => {
  try {
    let { comment_text, user_id, comment_id, post_id } = req.body;
    let { error } = commentsSchema.validate(req.body);

    const isOwnerResult = await dbhelper.query(
      `SELECT user_id FROM post_comments WHERE comment_id = '${comment_id}' AND is_deleted = 0`
    );

    const isOwner =
      isOwnerResult &&
      isOwnerResult.recordset.length > 0 &&
      isOwnerResult.recordset[0].user_id === user_id;

    if (!isOwner) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this comment." });
    }

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const updateResult = await dbhelper.query(
      `UPDATE post_comments SET comment_text = '${comment_text}' WHERE comment_id = '${comment_id}'`
    );

    if (updateResult) {
      return res.status(200).json({ message: "Comment updated successfully." });
    } else {
      return res.status(500).json({ message: "Failed to update comment." });
    }
  } catch (error) {
    console.error("Error editing comment", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { comment_id, user_id } = req.body;
    const { error } = commentsSchema.validate(req.body);

    const isOwnerResult = await dbhelper.query(
      `SELECT user_id FROM post_comments WHERE comment_id = '${comment_id}' AND is_deleted = 0`
    );

    console.log("isOwnerResult:", isOwnerResult);

    // Check if the query returned any rows to verify ownership
    const isOwner =
      isOwnerResult &&
      isOwnerResult.recordset.length > 0 &&
      isOwnerResult.recordset[0].user_id === user_id;

    console.log("isOwner:", isOwner);

    if (!isOwner) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment." });
    }

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const deleteResult = await dbhelper.execute("deleteComment", {
      comment_id,
      user_id,
    });

    console.log(deleteResult);

    if (deleteResult) {
      return res.status(200).json({ message: "Deleted comment successfully." });
    } else {
      return res.status(500).json({ message: "Could not delete comment." });
    }
  } catch (error) {
    console.error("Error deleting comment", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
