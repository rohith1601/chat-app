import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
         return res.status(400).json({ message: "All fields are required" });
      }
      if (password.length < 6) {
         return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      const user = await User.findOne({ email });
      if (user) {
         return res.status(400).json({ message: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
         name,
         email,
         password: hash
      });

      try {
         await newUser.save();
         generateToken(newUser._id, res); 
         res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilePic: newUser.profilePic
         });
      } catch (err) {
         res.status(500).json({ message: "Error saving user to the database" });
      }
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
   }
};

export const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
         return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      generateToken(user._id, res); 
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         profilePic: user.profilePic
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
   }
}

export const logout = async (req, res) => {
   try {
      res.clearCookie('jwt');
      res.status(200).json({ message: "Logged out successfully" });
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
   }
}

export const updateProfile = async (req, res) => {
   try{
      const {profilePic} = req.body;
      const userId = req.user._id;

      if(!profilePic) {
         return res.status(400).json({ message: "Profile picture is required" });
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePic)
      const updatedUser = await User.findByIdAndUpdate(userId, {
         profilePic: uploadResponse.secure_url
      }, { new: true });
      res.status(200).json(updatedUser);

   }catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
   }
}

export const checkAuth = async (req, res) => {
   try {
      const user = await User.findById(req.user._id);
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
   }
}