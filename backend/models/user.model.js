import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter', 'admin'],
        default: 'student'
    },
    profile: {
        bio: {
            type: String,
        },
        skills: [
            {
                type: String
            }
        ],
        resume: {
            type: String,
        },
        resumeOriginalName: {
            type: String,
        },
        profilePhoto: {
            type: String,
        }
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;