import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";
import API from "../../utils/axios";
import { STORAGE_KEY_CONSTANT } from "../../utils/constants";

export interface profileSliceState {
  data: any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: profileSliceState = {
  data: {},
  status: "idle",
  error: null,
};

export const fetchProfileAsync = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(STORAGE_KEY_CONSTANT);
      const res = await API.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchReviewsAsync = createAsyncThunk(
  "profile/reviews",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(STORAGE_KEY_CONSTANT);
      const res = await API.get("/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchProfileAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});


export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
