import api from "./api";

export const getRecentActivities = async () => {
    const res = await api.get("/admin/activities");
    return res.data.data;
};