import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/userInterface";
import Connection from "../dbhelpers/dbhelpers";

const dbhelper = new Connection();
dotenv.config();

export interface ExtendedUser extends Request {
  info?: User;
}

export const verifyToken = (
  req: ExtendedUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["token"] as string;

    if (!token) {
      return res.status(404).json({
        message: "You need to Login to proceed",
      });
    }

    const data = jwt.verify(token, process.env.SECRET as string) as User;

    req.info = data;
  } catch (error) {
    return res.json({
      message: error,
    });
  }

  next();
};


export const checkAccountStatus = async (
  req: ExtendedUser,
  res: Response,
  next: NextFunction
) => {
 try {
    const userInfo = req.info as User | undefined;

    if (!userInfo || !userInfo.user_id) {
      return res.status(400).json({
        message: "Invalid user information",
      });
    }

    const { user_id } = userInfo;

    const user = await (await dbhelper.query(`SELECT is_Deleted FROM users WHERE user_id = '${user_id}'`)).recordset
    if (user[0].is_Deleted === true) {
      return res.status(403).json({
        message: "Activate  your Account",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
};


next();
}
