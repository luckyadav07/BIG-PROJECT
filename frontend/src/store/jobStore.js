import { create } from "zustand";
import {
  uploadResume,
  analyzeResume,
  getLatestAnalysis,
  deleteAnalysis,
} from "../services/resumeService.js";

const getErrorMessage = (err) =>
  err.response?.data?.message ||
  err.message ||
  "Something went wrong.";

const useResumeStore = create((set) => ({
  resume: null,
  analysis: null,

  uploading: false,
  analyzing: false,

  uploadProgress: 0,

  error: null,

  clearError: () => set({ error: null }),

  uploadResumeFile: async (formData) => {
    set({
      uploading: true,
      uploadProgress: 0,
      error: null,
    });

    try {
      const resume = await uploadResume(
        formData,
        (event) => {
          if (!event.total) return;

          set({
            uploadProgress: Math.round(
              (event.loaded * 100) / event.total
            ),
          });
        }
      );

      set({
        resume,
        uploading: false,
        uploadProgress: 100,
      });

      return resume;
    } catch (err) {
      set({
        uploading: false,
        uploadProgress: 0,
        error: getErrorMessage(err),
      });

      throw err;
    }
  },

  analyzeResumeFile: async (resumeData) => {
    set({
      analyzing: true,
      error: null,
    });

    try {
      const analysis = await analyzeResume(resumeData);

      set({
        analysis,
        analyzing: false,
      });

      return analysis;
    } catch (err) {
      set({
        analyzing: false,
        error: getErrorMessage(err),
      });

      throw err;
    }
  },

  fetchLatestAnalysis: async () => {
    set({
      analyzing: true,
      error: null,
    });

    try {
      const analysis = await getLatestAnalysis();

      set({
        analysis,
        analyzing: false,
      });
    } catch (err) {
      set({
        analysis: null,
        analyzing: false,
        error: getErrorMessage(err),
      });
    }
  },

  removeAnalysis: async (id) => {
    try {
      await deleteAnalysis(id);

      set({
        analysis: null,
      });
    } catch (err) {
      set({
        error: getErrorMessage(err),
      });
    }
  },
}));

export default useResumeStore;