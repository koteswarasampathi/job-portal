import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        requirements: [
            {
                type: String
            }
        ],

        salary: {
            type: Number,
            required: true
        },

        experienceLevel: {
            type: Number,
            default: 0
        },

        location: {
            type: String,
            required: true
        },

        jobType: {
            type: String,
            enum: [
                "Full Time",
                "Part Time",
                "Internship",
                "Remote"
            ],
            default: "Full Time"
        },

        position: {
            type: Number,
            required: true
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;