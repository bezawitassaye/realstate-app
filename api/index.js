import express from "express";
import Connectdb from "./config/db.js";
import "dotenv/config"

const app = express();
Connectdb()

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
