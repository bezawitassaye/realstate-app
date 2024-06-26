import usermodel from "../models/usermodels.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import Listingmodel from "../models/listingmodels.js";

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

const updateUser = async (req, res) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token not found" });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.scret_jwt);

        // Extract user ID from decoded token
        const userId = decoded.id;

        // Find user by ID in the database
        const user = await usermodel.findById(userId);

        // Handle case where user is not found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update user details if provided in request body
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            // Hash new password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        if (req.body.avatar) {
            user.avatar = req.body.avatar; // Assuming avatar URL is provided in request
        }

        // Save updated user object
        await user.save();

        // Respond with success message and updated user object
        res.json({ success: true, message: "User updated successfully", user });

    } catch (error) {
        // Handle errors
        console.error('Update User Error:', error.message);

        // Check for specific JWT errors
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        // Handle other errors
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token not found" });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.scret_jwt);

        // Extract user ID from decoded token
        const userId = decoded.id;

        // Find user by ID in the database
        const user = await usermodel.findById(userId);

        // Handle case where user is not found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Delete user from the database using Mongoose document instance method
        await user.deleteOne();

        // Respond with success message
        res.json({ success: true, message: "User deleted successfully" });

    } catch (error) {
        // Handle errors
        console.error('Delete User Error:', error.message);

        // Check for specific JWT errors
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        // Handle other errors
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const Signout= async(req,res)=>{
    res.clearCookie('access_token');
    res.json({ success: true, message: "User signed out successfully" });

}

const getuserlisting=async(req,res)=>{
    try {
        // Extract token from headers
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization header missing' });
        }

        // Verify the token
        jwt.verify(token, process.env.scret_jwt, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
            }

            // Token verified, fetch user listings
            const userId = decoded.id;
            const listings = await Listingmodel.find({ userRef: userId });

            res.status(200).json({ success: true, listings });
        });
    } catch (error) {
        console.error('Fetch user listings error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch user listings' });
    }
}

const getUser = async(req,res)=>{
    try {
        const userId = req.params.userId;
        console.log(userId)
        const user = await usermodel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Return user details
        res.status(200).json({ user });
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
      }
}
export { registeruser,loginuser,google ,updateUser,deleteUser,Signout,getuserlisting,getUser};
