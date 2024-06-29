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

export {createListing,deleteListing}

