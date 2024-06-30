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
export {createListing,deleteListing,fechlisting,updatelisting}

