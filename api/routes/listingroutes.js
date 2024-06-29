import express from "express"
import {createListing,deleteListing} from "../controllers/listingcontrollers.js"
const listingroute = express.Router()

listingroute.post("/create",createListing)
listingroute.delete("/delete/:id", deleteListing);





export default listingroute