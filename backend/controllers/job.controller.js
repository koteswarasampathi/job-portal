import Job from "../models/job.model.js";
import Company from "../models/company.model.js";

export const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            experienceLevel,
            location,
            jobType,
            position,
            companyId
        } = req.body;

        if (
            !title ||
            !description ||
            !salary ||
            !location ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        const company = await Company.findOne({
            _id: companyId,
            userId: req.userId
        });

        if (!company) {
            return res.status(403).json({
                success: false,
                message: "You can only create jobs for your own company"
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            experienceLevel,
            location,
            jobType,
            position,
            company: companyId,
            createdBy: req.userId
        });

        return res.status(201).json({
            success: true,
            message: "Job created successfully",
            job
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";

        const query = {
            $and: [
                {
                    $or: [
                        {
                            title: {
                                $regex: keyword,
                                $options: "i"
                            }
                        },
                        {
                            description: {
                                $regex: keyword,
                                $options: "i"
                            }
                        }
                    ]
                },
                {
                    location: {
                        $regex: location,
                        $options: "i"
                    }
                }
            ]
        };

        const jobs = await Job.find(query)
            .populate("company", "name logo location")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("company", "name description website location logo");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            createdBy: req.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found or you don't have permission"
            });
        }

        const {
            title,
            description,
            requirements,
            salary,
            experienceLevel,
            location,
            jobType,
            position
        } = req.body;

        if (title) job.title = title;
        if (description) job.description = description;
        if (requirements) job.requirements = requirements;
        if (salary) job.salary = salary;
        if (experienceLevel !== undefined) {
            job.experienceLevel = experienceLevel;
        }
        if (location) job.location = location;
        if (jobType) job.jobType = jobType;
        if (position) job.position = position;

        await job.save();

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            createdBy: req.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found or you don't have permission"
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            createdBy: req.userId
        })
            .populate("company", "name logo location")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

