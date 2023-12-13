import { Router } from "express";
import { createPost } from "../controllers/postControllers";
import { verifyToken } from "../middlewares/verifyTokens";

const post_router = Router();

post_router.post("/create",createPost)

export default post_router
