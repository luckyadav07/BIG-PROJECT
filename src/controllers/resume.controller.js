import asyncHandler  from "../utils/asyncHandler.js";
import ApiError  from "../utils/ApiError.js";
import  ApiResponse  from "../utils/ApiResponse.js";
import * as pdfParseModule from "pdf-parse";
const pdfParse = pdfParseModule.default;

export const uploadResume = asyncHandler(async (req, res) => {
    // 1. Validation
    if (!req.file) {
        throw new ApiError(400, "Resume file is required");
    }

    // 2. Parsing the Buffer
    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text;

    // 3. Sending the Response
    return res.status(200).json(
        new ApiResponse(200, { text: extractedText }, "Resume parsed successfully")
    );
});