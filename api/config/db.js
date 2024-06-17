import mongoose from "mongoose";

const Connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Db Connected")
    } catch (error) {
        console.log("Db connection faild")
        
    }
}

export default Connectdb