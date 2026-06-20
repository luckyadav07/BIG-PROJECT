import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createRequire } from "module";

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

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    text: pdfData.text,
                    pages: pdfData.numpages,
                },
                "Resume parsed successfully"
            )
        );
    } catch (error) {
        throw new ApiError(
            500,
            `Failed to parse PDF: ${error.message}`
        );
    }
});