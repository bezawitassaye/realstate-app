import express from "express";
import Connectdb from "./config/db.js";
import "dotenv/config"
import userroute from "./routes/userroutes.js";
import listingroute from "./routes/listingroutes.js";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json())
Connectdb()

app.use("/api/user",userroute)
app.use("/api/list",listingroute)

const PORT = 5019;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
