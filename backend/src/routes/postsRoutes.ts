import { Router } from "express";
import { createComment, createPost, likePost } from "../controllers/postControllers";
import { verifyToken } from "../middlewares/verifyTokens";

const post_router = Router();

post_router.post("/create",createPost)
post_router.post("/like", likePost)
post_router.post("/comment", createComment);

export default post_router
