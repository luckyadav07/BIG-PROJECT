import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createRequire } from "module";
import { analyzeResume } from "../utils/resumeAnalyzer.js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const uploadResume = asyncHandler(async (req, res) => {
    // Check if file exists
    if (!req.file) {
        throw new ApiError(400, "Resume file is required");
    }

    try {
        // Parse PDF
        const pdfData = await pdfParse(req.file.buffer);

        const analysis = analyzeResume(pdfData.text);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    text: pdfData.text,
                    pages: pdfData.numpages,
                    analysis,
                },
                "Resume parsed successfully"
            )
        );
    } catch (error) {
        console.error("PDF ERROR:", error);
        throw new ApiError(
            500,
            `Failed to parse PDF: ${error.message}`
        );
    }
});