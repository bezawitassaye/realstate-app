import express from "express"
import { registeruser } from "../controllers/usercontroller.js"

const userroute = express.Router()

userroute.post("/register",registeruser)


export default userroute


