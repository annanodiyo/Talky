import { Router } from "express";
import { createComment, createPost, deleteComment, editComment, likePost } from "../controllers/postControllers";
import { verifyToken } from "../middlewares/verifyTokens";

const post_router = Router();

post_router.post("/create",verifyToken,createPost)
post_router.post("/like",verifyToken, likePost)
post_router.post("/comment",verifyToken, createComment);
post_router.post("/comment/editComment",verifyToken, editComment);
post_router.post("/comment/deleteComment", verifyToken, deleteComment);


export default post_router
