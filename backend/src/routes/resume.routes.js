import express from "express";

import {
  analyzeResume,
  getLatestAnalysis,
  getAllAnalyses,
  deleteAnalysis,
} from "../controllers/resume.controller.js";

import { uploadResume } from "../controllers/resumeUpload.controller.js";

import { upload } from "../middleware/multer.middleware.js";
import authMiddle from "../middleware/auth.middleware.js";

const router = express.Router();

// Upload & Parse Resume
router.post(
  "/upload",
  authMiddle,
  upload.single("resume"),
  uploadResume
);

// Analyze Parsed Resume
router.post(
  "/analyze",
  authMiddle,
  analyzeResume
);

// Latest Analysis
router.get(
  "/latest",
  authMiddle,
  getLatestAnalysis
);

// All Analyses
router.get(
  "/all",
  authMiddle,
  getAllAnalyses
);

// Delete Analysis
router.delete(
  "/:id",
  authMiddle,
  deleteAnalysis
);

export default router;