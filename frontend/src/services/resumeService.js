import api from "./api.js";
import { RESUME } from "../api/endpoints.js";

export const uploadResume = async (formData) => {
    const response = await api.post(
        RESUME.UPLOAD,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.data;
};