import api from "./api.js";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/admin/analytics");
  return response.data.data;
};

export const getStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data.data;
};

export const getRecentActivities = async () => {
  const response = await api.get("/admin/activities");
  return response.data.data;
};