import express from "express";

import{register,login,logout,getCurrentUser,updateProfile,uploadResume,uploadProfilePhoto} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me", isAuthenticated,getCurrentUser);
router.put("/profile/update",isAuthenticated,updateProfile);
router.post("/resume",isAuthenticated,upload.single("resume"),uploadResume);
router.post("/profile-photo",isAuthenticated,upload.single("profilePhoto"),uploadProfilePhoto);



export default router;