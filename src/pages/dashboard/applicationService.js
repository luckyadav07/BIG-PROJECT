import api from "./api.js";
import { APPLICATIONS } from "../api/endpoints.js";

/**
 * Apply for a job
 */
export const applyJob = async (jobId) => {
  const response = await api.post(APPLICATIONS.CREATE, {
    jobId,
  });

  return response.data.data;
};

/**
 * Get logged-in user's applications
 */
export const getApplications = async () => {
  const response = await api.get(APPLICATIONS.LIST);

  return response.data.data;
};

/**
 * Withdraw an application
 */
export const withdrawApplication = async (id) => {
  const response = await api.delete(
    APPLICATIONS.DELETE(id)
  );

  return response.data;
};