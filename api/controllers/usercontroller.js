import usermodel from "../models/usermodels.js";
import validator from "validator";
import bcrypt from "bcrypt";

const registeruser = async (req, res) => {
    try {
        const existingUser = await usermodel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({ success: false, message: "User Already exists" });
        }

        if (!validator.isEmail(req.body.email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        
        if (req.body.password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new usermodel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.json({ success: true, message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const loginuser = async (req,res)=>{
    try {
        const user = await usermodel.findOne({email:req.body.email})
        if(!user){
            return res.json({success:false,message:"User Does Not Exist"})
        }
        const ismatch = await bcrypt.compare(req.body.password,user.password)
        if(!ismatch){
            return res.json({success:false,message:"Incorrect Password"})
        }
        return res.json({success:true,message:"User login Successfully"})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Login Faild"})
        
    }
}

export { registeruser,loginuser };
