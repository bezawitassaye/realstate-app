import Listingmodel from "../models/listingmodels.js";

const createListing=async(req,res)=>{
    try {
        const listing = await Listingmodel.create(req.body)
        res.json({listing,success:true,message:"listing created successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"listing create faild"})
        
    }
}
export {createListing}

