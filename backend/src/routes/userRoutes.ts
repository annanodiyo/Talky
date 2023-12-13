import { Router } from "express";
import {
  deactivate,
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/usersControllers";
import { verifyToken } from "../middlewares/verifyTokens";

const user_router = Router();
user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/allUsers", getAllUsers);
user_router.get("/username", getUser);
user_router.delete("/delete/:username", deactivate);

// user_router.get("/checkCredentials", verifyToken, checkUserCredentials);
export default user_router;
