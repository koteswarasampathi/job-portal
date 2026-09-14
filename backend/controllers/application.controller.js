import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: req.userId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        const application = await Application.create({
            job: jobId,
            applicant: req.userId
        });

        return res.status(201).json({
            success: true,
            message: "Job applied successfully",
            application
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            applicant: req.userId
        })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                    select: "name logo location"
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findOne({
            _id: jobId,
            createdBy: req.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found or you don't have permission"
            });
        }

        const applications = await Application.find({
            job: jobId
        })
            .populate(
                "applicant",
                "fullname email phoneNumber profile"
            )
            .populate(
                "job",
                "title location salary"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;

        const { status } = req.body;

        if (!["Pending", "Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status"
            });
        }

        const application = await Application.findById(
            applicationId
        ).populate("job");

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (
            application.job.createdBy.toString() !==
            req.userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission"
            });
        }

        application.status = status;

        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application status updated",
            application
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

