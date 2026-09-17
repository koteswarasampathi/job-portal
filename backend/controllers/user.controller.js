import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const JWT_SECRET = process.env.SECRET_KEY || "job-portal-dev-secret";

export const register = async (req, res) => {
    try {
        const {
            fullname,
            email,
            phoneNumber,
            password,
            role
        } = req.body

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ success: false, message: "Full name, email, phone number, password, and role are required   " });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        const hashedPassoword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassoword,
            role: role || 'student'
        });

        return res.status(201).json({
            success: true, message: "User registered successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const {
            email, password
        } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Full name, email, phone number, password, and role are required   " });

        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or Password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true, message: "Login Successfull",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", "", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            expires: new Date(0)
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const updateProfile = async (req, res) => {
    try {
        const {
            fullname,
            phoneNumber,
            bio,
            skills
        } = req.body;

        const user = await User.findById(req.userId);

        if (!user.profile) {
            user.profile = {};
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (fullname) {
            user.fullname = fullname;
        }

        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }

        if (bio) {
            user.profile.bio = bio;
        }

        if (skills) {
            user.profile.skills = skills;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required"
            });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.profile.resume = req.file.filename;
        user.profile.resumeOriginalName =
            req.file.originalname;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: req.file.filename
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const uploadProfilePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Profile photo is required"
            });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "job-portal/profile-photos"
        });

        fs.unlinkSync(req.file.path);

        // Save Cloudinary URL in MongoDB
        user.profile.profilePhoto = result.secure_url;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile photo uploaded successfully",
            profilePhoto: result.secure_url
        });

    } catch (error) {
        console.error("PROFILE PHOTO UPLOAD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};