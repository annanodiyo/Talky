import express, { Request, Response, json } from "express";
import cors from "cors";
import { testSqlConnection } from "./config/sqlConfig";
import user_router from "./routes/userRoutes";
import post_router from "./routes/postsRoutes";


const app = express();
app.use(json());
app.use(cors());

app.use("/user", user_router);
app.use("/post", post_router);


app.listen(3800, () => {
  console.log("server is running on 3800");
  testSqlConnection();
});
