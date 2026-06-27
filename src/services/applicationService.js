import api from "./api.js";
import { APPLICATIONS } from "../api/endpoints.js";

export const getApplications = async () => {
    console.log("Calling GET /applications");

    const response = await api.get(APPLICATIONS.LIST);

    console.log(response);

    return response.data.data;
};

export const applyJob = async (jobId) => {
    const response = await api.post(APPLICATIONS.CREATE, { jobId });
    return response.data.data;
};

export const withdrawApplication = async (id) => {
    const response = await api.delete(APPLICATIONS.DELETE(id));
    return response.data;
};