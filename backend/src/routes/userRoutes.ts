import { Router } from "express";
import {

  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  toggleAccoountStatus,
} from "../controllers/usersControllers";
import { verifyToken } from "../middlewares/verifyTokens";

const user_router = Router();
user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/allUsers",verifyToken, getAllUsers);
user_router.get("/username",verifyToken, getUser);
// user_router.delete("/delete/:username",verifyToken, deactivate);
user_router.delete("/account/:username", verifyToken, toggleAccoountStatus);

// user_router.get("/checkCredentials", verifyToken, checkUserCredentials);
export default user_router;
