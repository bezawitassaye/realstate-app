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

const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the listing exists
        const listing = await Listingmodel.findById(id);
      
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        // Perform deletion
     
        await listing.deleteOne();

        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        console.error('Delete listing error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const fechlisting = async(req,res)=>{
    try {
        const { id } = req.params;
        const listing = await Listingmodel.findById(id);
        if (!listing) {
          return res.status(404).json({ success: false, message: 'Listing not found' });
        }
        res.status(200).json({ success: true, listing });
      } catch (error) {
        console.error('Fetch listing error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
      }
}

const updatelisting = async(req,res)=>{
    try {
        const { id } = req.params;
        const updatedListing = req.body;
    
        
    
        const listing = await Listingmodel.findByIdAndUpdate(id, updatedListing, {
          new: true,
        });
    
        if (!listing) {
          return res
            .status(404)
            .json({ success: false, message: "Listing not found" });
        }
    
        res.status(200).json({ success: true, listing });
      } catch (error) {
        console.error("Update listing error:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
}

  const getlisting = async(req,res)=>{
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let Offer = req.query.Offer
      if(Offer === undefined || Offer === "false"){
        Offer = {$in:[false,true]};
      }
      let Furnished = req.query.Furnished
      if(Furnished === undefined || Furnished === "false"){
        Furnished = {$in:[false,true]};
      }

      let Parking = req.query.Parking
      if(Parking === undefined || Parking === "false"){
        Parking = {$in:[false,true]};
      }
      
      let type = req.query.type
      if(type === undefined || type === "all"){
        type = {$in:["Sell","Rent"]};
      }

      const searchTerm = req.query.searchTerm || "";
      const sort = req.query.sort || "createdAt";
      const order = req.query.order || "desc";

      const listings = await Listingmodel.find({
        name:{$regex:searchTerm,$options:"i"},
        Offer,
        Furnished,
        Parking,
        type
      }).sort({
        [sort]:order
      }.limit(limit).skip(startIndex))
      return res.json(listings)
    } catch (error) {
      console.log(error)
      res.json(error)
      
    }
  }
export {createListing,deleteListing,fechlisting,updatelisting,getlisting}

