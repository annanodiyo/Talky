import Connection from "../dbhelpers/dbhelpers";
import { Request, Response } from "express";

import { postSchema } from "../validators/validators";
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
      user_id

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
    const { user_id, post_id } = req.body;

    // Perform any necessary validation on user_id and post_id

    const result = await axios.post('post', {
      user_id,
      post_id,
    });

    console.log(result.data);

    if (result.data && result.data.message === 'Post liked successfully') {
      return res.status(200).json({ message: 'Post liked successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to like post' });
    }
  } catch (error) {
    console.error('Error liking post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

}
