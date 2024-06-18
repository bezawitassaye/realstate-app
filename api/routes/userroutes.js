import express from "express"
import { registeruser,loginuser } from "../controllers/usercontroller.js"

const userroute = express.Router()

userroute.post("/register",registeruser)
userroute.post("/login",loginuser)

export default userroute


