import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { uploadMedia ,deleteMedia } from "../utils/cloudinary.js";


export const register = async (req, res) => {
   try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
         return res.status(400).json({
            success: false,
            message: "All fields are required."
         })
      }
      const user = await User.findOne({ email: email });
      if (user) {
         return res.status(400).json({
            success: false,
            message: "User already exists with this email."
         })
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
         name,
         email,
         password: hashedPassword
      })
      return res.status(201).json({
         success: true,
         message: "User created successfully."
      })

   } catch (e) {
      console.log(e);
      return res.status(500).json({
         success: false,
         message: "Internal server error."
      })
   }
}



export const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({
            success: false,
            message: "All fields are required."
         })
      }
      const user = await User.findOne({ email: email });
      if (!user) {
         return res.status(400).json({
            success: false,
            message: "Incorrect email or password."
         })
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
         return res.status(400).json({
            success: false,
            message: "Incorrect email or password."
         })
      }

      generateToken(res, user, `Welcome back ${user.name}`);


   } catch (e) {
      console.log(e);
      return res.status(500).json({
         success: false,
         message: "Internal server error."
      })
   }
}

export const logout = async (req, res) => {
   try {
      const token = req.header('x-auth-token');

      res.status(200).cookie('token', '', {
         maxAge: 0
      }).json({
         success: true,
         message: "Logged out successfully."
      })
   }
   catch (e) {
      console.log(e);
      return res.status(500).json({
         success: false,
         message: "Internal server error."
      })
   }
}

export const getUserProfile = async (req, res) => {
   try {
      const userId = req.id;
      const user = await User.findOne({ _id: userId }).select("-password");
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found."
         })
      }
      return res.status(200).json({
         success: true,
         user
      })
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         success: false,
         message: "Failed to get user profile."
      })
   }
}

export const updateProfile = async (req, res) => {
   try {
      const userId = req.id;
      const { name } = req.body;
      const profilePhoto = req.file?.path;

      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found."
         })
      }
      //public id extraction of old photo
      if (user.photoUrl) {
         const publicId = user.photoUrl.split("/").pop().split(".")[0]; 
         await deleteMedia(publicId);
      }
      //update user profile 
      const cloudResponse = await uploadMedia(profilePhoto);
      const photoUrl = cloudResponse.secure_url;

      const updatedData = { name, photoUrl };
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

      return res.status(200).json({
         success: true,
         message: "User profile updated successfully.",
         user: updatedUser
      })

   } catch (e) {
      console.log(e);
      return res.status(500).json({
         success: false,
         message: "Failed to update user profile."
      })
   }
}