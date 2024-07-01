import express from "express"
import {createListing,deleteListing,fechlisting,updatelisting,getlisting} from "../controllers/listingcontrollers.js"
const listingroute = express.Router()

listingroute.post("/create",createListing)
listingroute.delete("/delete/:id", deleteListing);
listingroute.get("/fech/:id", fechlisting);
listingroute.put("/update/:id", updatelisting);
listingroute.get("/get",getlisting)


export default listingroute