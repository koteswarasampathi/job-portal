import express from "express";

import {
    registerCompany,
    getCompanies,
    getCompanyById,
    updateCompany
} from "../controllers/company.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/register",
    isAuthenticated,
    registerCompany
);

router.get(
    "/",
    isAuthenticated,
    getCompanies
);

router.get(
    "/:id",
    isAuthenticated,
    getCompanyById
);

router.put(
    "/:id",
    isAuthenticated,
    updateCompany
);

export default router;