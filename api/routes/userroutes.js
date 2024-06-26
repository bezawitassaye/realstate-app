import express from "express"
import { registeruser,loginuser,google } from "../controllers/usercontroller.js"

const userroute = express.Router()

userroute.post("/register",registeruser)
userroute.post("/login",loginuser)
userroute.post('/google', google);

export default userroute


