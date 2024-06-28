import mongoose from "mongoose";

const listingschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    price:{
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
    beds:{
        type:Number,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    parking:{
        type:Boolean,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    offer:{
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