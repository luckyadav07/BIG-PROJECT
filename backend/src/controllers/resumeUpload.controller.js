import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import { parseResume } from "../services/resumeParser.service.js";

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Resume file is required.");
  }

  try {
    const parsedResume = await parseResume(req.file);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          parsedResume,
        },
        "Resume parsed successfully."
      )
    );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Failed to parse resume."
    );
  }
});