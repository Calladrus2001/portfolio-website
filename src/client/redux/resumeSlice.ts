import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ResumeState {
  isDownloading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  isDownloading: false,
  error: null,
};

export const downloadResume = createAsyncThunk<void, void, { rejectValue: string }>(
  "resume/downloadResume",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/get-resume-url");
      if (!response.ok) {
        throw new Error("Failed to fetch resume download URL");
      }
      const data = await response.json();
      if (!data.url) {
        throw new Error("Unable to fetch resume at this moment.");
      }

      const link = document.createElement("a");
      link.href = data.url;
      link.download = "Vishesh_Resume.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error downloading resume.";
      return rejectWithValue(message);
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadResume.pending, (state) => {
        state.isDownloading = true;
        state.error = null;
      })
      .addCase(downloadResume.fulfilled, (state) => {
        state.isDownloading = false;
        state.error = null;
      })
      .addCase(downloadResume.rejected, (state, action) => {
        state.isDownloading = false;
        state.error = action.payload || "Error downloading resume.";
      });
  },
});

export default resumeSlice.reducer;
