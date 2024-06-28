import mongoose from "mongoose";

const listingschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    address:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    regularPrice:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    Furnished:{
        type:Boolean,
        required:true
    },
    Parking:{
        type:Boolean,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    Offer:{
        type:Boolean,
        required:true
    },
    imageUrls:{
        type:Array,
        required:true
    },
    userRef:{
        type:String,
        required:true
    },
},{timestamps:true})


const Listingmodel = mongoose.model("Listing",listingschema)

export default Listingmodel