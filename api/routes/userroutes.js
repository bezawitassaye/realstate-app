import express from "express"
import { registeruser,loginuser,google,updateUser,deleteUser } from "../controllers/usercontroller.js"

const userroute = express.Router()

userroute.post("/register",registeruser)
userroute.post("/login",loginuser)
userroute.post('/google', google);
userroute.put("/update", updateUser); 
userroute.delete("/delete", deleteUser);

export default userroute


