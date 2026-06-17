import express from "express"
import { uploadResume } from "../controllers/resume.controller.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()

router.post("/upload", upload.single("resume"), uploadResume)

export default router