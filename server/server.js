import express from "express";
import router from "./routes/taskRoutes.js";
import connectDB from "./database/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(5000, () => {
  console.log("Server is running on PORT 5000");
});
