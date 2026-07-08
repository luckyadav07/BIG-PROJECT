import api from "./api";
import { ADMIN } from "../api/endpoints";

export const getReports = async () => {
    const response = await api.get(ADMIN.REPORTS);
    return response.data.data;
};