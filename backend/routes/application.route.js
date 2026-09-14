import express from "express";

import {
    applyJob,
    getMyApplications,
    getApplicants,
    updateApplicationStatus
} from "../controllers/application.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/:jobId",
    isAuthenticated,
    applyJob
);

router.get(
    "/my",
    isAuthenticated,
    getMyApplications
);

router.get(
    "/:jobId/applicants",
    isAuthenticated,
    getApplicants
);

router.put(
    "/:id/status",
    isAuthenticated,
    updateApplicationStatus
);

export default router;