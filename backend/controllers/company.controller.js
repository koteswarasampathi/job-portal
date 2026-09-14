import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const {
            name,
            description,
            website,
            location
        } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Company name is required"
            });
        }

        const existingCompany = await Company.findOne({
            name,
            userId: req.userId
        });

        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "You already created this company"
            });
        }

        const company = await Company.create({
            name,
            description,
            website,
            location,
            userId: req.userId
        });

        return res.status(201).json({
            success: true,
            message: "Company registered successfully",
            company
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();

        return res.status(200).json({
            success: true,
            companies
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            company
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const {
            name,
            description,
            website,
            location
        } = req.body;

        const company = await Company.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found or you don't have permission"
            });
        }

        if (name) company.name = name;
        if (description) company.description = description;
        if (website) company.website = website;
        if (location) company.location = location;

        await company.save();

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};