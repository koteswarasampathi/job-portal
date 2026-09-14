import express from "express";

import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getRecruiterJobs
} from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/",
    isAuthenticated,
    createJob
);

router.get(
    "/",
    isAuthenticated,
    getAllJobs
);

router.get("/recruiter/my-jobs",isAuthenticated,getRecruiterJobs);

router.get(
    "/:id",
    isAuthenticated,
    getJobById
);

router.put(
    "/:id",
    isAuthenticated,
    updateJob
);

router.delete(
    "/:id",
    isAuthenticated,
    deleteJob
);



export default router;