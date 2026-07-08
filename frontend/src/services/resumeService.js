import api from "./api.js";
import { RESUME } from "../api/endpoints.js";

export const uploadResume = async (formData, onUploadProgress) => {
  const response = await api.post(
    RESUME.UPLOAD,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }
  );

  return response.data.data;
};

export const analyzeResume = async (resumeData) => {
  const response = await api.post(
    RESUME.ANALYZE,
    { resumeData }
  );

  return response.data.data;
};

export const getLatestAnalysis = async () => {
  const response = await api.get(
    RESUME.LATEST
  );

  return response.data.data;
};

export const getAllAnalyses = async () => {
  const response = await api.get(
    RESUME.ALL
  );

  return response.data.data;
};

export const deleteAnalysis = async (id) => {
  const response = await api.delete(
    `${RESUME.DELETE}/${id}`
  );

  return response.data.data;
};