import { Request } from "express";

export interface User {
  user_id: string;
  full_name: string;
  email: string;
  username: string;
  password: string;
}
export interface LoginUser extends Request {
  email: string;
  password: string;
}
