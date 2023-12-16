import { NextFunction, Request, Response, request } from "express";
import mssql from "mssql";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { sqlConfig } from "../config/sqlConfig";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../interfaces/userInterface";
import Connection from "../dbhelpers/dbhelpers";
import { UsersSchema, registerUserSchema } from "../validators/validators";
import { isEmpty } from "lodash";
import { ExtendedUser } from "../middlewares/verifyTokens";

const dbhelper = new Connection();
//register
export const registerUser = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.headers);
  try {
    let { full_name, email, username, password } = req.body;

    let { error } = registerUserSchema.validate(req.body);

    if (error) {
      return res.status(404).json({
        message: error.message,
      });
    }

    const emailTaken = (
      await dbhelper.query(`SELECT * FROM users WHERE email = '${email}'`)
    ).recordset;

    if (emailTaken.length > 0) {
      return res.json({ error: "This email is already in use" });
    }
   const usernameTaken = (
     await dbhelper.query(`SELECT * FROM users WHERE username = '${username}'`)
   ).recordset;

   if (usernameTaken.length>0) {
     return res.json({ error: "This username exists" });
   }

    let user_id = v4();

    const hashedPwd = await bcrypt.hash(password, 10);

    let result = dbhelper.execute("registerUser", {
      user_id,
      full_name,
      email,
      username,
      password: hashedPwd,
    });

    console.log(result);

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
//logIn
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // console.log(req.body)

    const pool = await mssql.connect(sqlConfig);
    let user = await pool
      .request()
      .input("username", username)
      .input("password", password)
      .execute("loginUser");

    if (!user.recordset.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const { password: storedPassword, ...rest } = user.recordset[0];
    const correctPwd = await bcrypt.compare(password, storedPassword);
    if (!correctPwd) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(rest, process.env.secret as string, {
      expiresIn: "3600s",
    });
    console.log(token);

    return res.status(200).json({ message: "LogIn successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
};
// all users
export const getAllUsers = async (req: ExtendedUser, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let users = (await pool.request().execute("fetchAllUsers")).recordset;

    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};
//one user
export const getUser = async (req: ExtendedUser, res: Response) => {
  try {
    const {username}= req.body
    const pool = await mssql.connect(sqlConfig);
    let user = (await pool.request()
    .input("username",mssql.VarChar,username)

    .execute("getUserByusername")).recordset;
    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const toggleAccoountStatus = async (req:Request, res:Response)=>{
  try {
    let { username } = req.params;
    let { error } = UsersSchema.validate(req.params);
    let result = await dbhelper.execute("toggleAccountStatus", { username });
    const rowsAffected = result.rowsAffected[0];
        if (rowsAffected > 0) {
          const current_user = (await dbhelper.query(`SELECT * FROM users WHERE username = '${username}'`)).recordset;
          console.log(current_user);
          if(current_user[0].is_Deleted == true){
  return res
    .status(200)
    .json({ message: "Account deactivated successfully", rowsAffected });
          }


            return res
              .status(200)
              .json({
                message: "Account activated successfully",
                rowsAffected,
              });


        } else {
          return res.status(404).json({ error: "No user found to delete" });
        }
      } catch (error) {
        console.error(error);
        return res.status(202).json({ error: "request failed" });
      }
    }
