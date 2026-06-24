import { create } from "zustand";
import { getAllJobs, getRecommendedJobs } from "../services/jobService.js";
import { MOCK_JOBS } from "../utils/mockData.js";

const useJobStore = create((set) => ({
  jobs: [],
  recommendedJobs: [],
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAllJobs();
      set({ jobs: res.data || res, loading: false });
    } catch {
      set({ jobs: MOCK_JOBS, loading: false });
    }
  },

  fetchRecommended: async () => {
    set({ loading: true });
    try {
      const res = await getRecommendedJobs();
      set({ recommendedJobs: res.data || res, loading: false });
    } catch {
      set({ recommendedJobs: MOCK_JOBS.slice(0, 4), loading: false });
    }
  },
}));

export default useJobStore;
