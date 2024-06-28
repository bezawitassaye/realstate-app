import express from "express"
import {createListing} from "../controllers/listingcontrollers.js"
const listingroute = express.Router()

listingroute.post("/create",createListing)





export default listingroute