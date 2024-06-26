import usermodel from "../models/usermodels.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const Createuser=(id)=>{
    return jwt.sign({id},process.env.scret_jwt)

}

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
        const token = Createuser(user._id)
        res.json({success:true,token,user})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Login Faild"})
        
    }
}
const google = async (req, res) => {
    try {
        let user = await usermodel.findOne({ email: req.body.email });
       
        if (user) {
            // User found, generate token and respond
            const token = Createuser(user._id);

            res.cookie('access_token', token, { httpOnly: true })
               .status(200)
               .json({ success: true, token, user });
        } else {
            // User not found, create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new usermodel({
                username: req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            await newUser.save();

            // Generate token for the new user
            const token = Createuser(newUser._id);

            res.cookie('access_token', token, { httpOnly: true })
               .status(200)
               .json({ success: true, token, user: newUser });
        }
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        res.status(500).json({ success: false, message: 'Google Sign-In Failed' });
    }
};


export { registeruser,loginuser,google };
