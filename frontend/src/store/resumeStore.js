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

const useResumeStore = create((set, get) => ({
  file: null,
  resumeData: null,
  analysis: null,

  uploading: false,
  analyzing: false,
  uploadProgress: 0,

  error: null,

  setFile: (file) => set({ file }),

  clearError: () => set({ error: null }),

  clearResume: () =>
    set({
      file: null,
      resumeData: null,
      analysis: null,
      uploading: false,
      analyzing: false,
      uploadProgress: 0,
      error: null,
    }),

  uploadResumeFile: async () => {
    const { file, uploading } = get();

    if (!file || uploading) return null;

    set({
      uploading: true,
      uploadProgress: 0,
      error: null,
    });

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await uploadResume(
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

      const resumeData =
        response.resumeData ||
        response.parsedResume ||
        response;

      set({
        resumeData,
        uploading: false,
        uploadProgress: 100,
      });

      return resumeData;
    } catch (err) {
      set({
        uploading: false,
        uploadProgress: 0,
        error: getErrorMessage(err),
      });

      throw err;
    }
  },

  analyzeResumeFile: async () => {
  const { resumeData, analyzing } = get();

  if (!resumeData || analyzing) return null;

  set({
    analyzing: true,
    error: null,
  });

  try {
    const response = await analyzeResume(resumeData);

    const analysis = response.analysis || response;

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
    try {
      const response = await getLatestAnalysis();

      set({
        analysis: response.analysis || response,
        resumeData: response.resumeData || null,
      });
    } catch {
      // Ignore if no previous analysis exists
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