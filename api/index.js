import express from "express";
import Connectdb from "./config/db.js";
import "dotenv/config"
import userroute from "./routes/userroutes.js";

const app = express();
app.use(express.json())
Connectdb()

app.use("/api/user",userroute)

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
