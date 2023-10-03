import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

import { RootState } from "../../redux/store";
import API from "../../utils/axios";

export interface ReviewState {
  institutePublicData: any;
  coursePublicData: any;
  reviewsData: any;
  instituteDetails: any;
  password: string;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ReviewState = {
  coursePublicData: [],
  institutePublicData: [],
  reviewsData: [],
  instituteDetails: {},
  password: '',
  status: "idle",
  error: null,
};

export const getCompaniesLiteAsync = createAsyncThunk(
  "admin/getInstitutesLite",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/institute/lite", {
        
      });
      return res.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCoursesLiteAsync = createAsyncThunk(
  "admin/getCoursesLite",
  async (company: string, { rejectWithValue }) => {
    try {
      const res = await API.get("/course/lite", {
        params: { company },
      });
      return res.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addReviewAsync = createAsyncThunk(
  "user/addReview",
  async (input: any, { rejectWithValue }) => {
    try {
      const res = await API.post("/review", input);
      return res.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getReviewsAsync = createAsyncThunk(
  "user/getReviews",
  async (filters: any, { rejectWithValue }) => {
    try {
      const res = await API.get("/review", { params: filters });
      return res.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Review
    builder
    .addCase(addReviewAsync.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(addReviewAsync.fulfilled, (state, action: any) => {
      state.status = "idle";
      notification.error({ message: "We've received your review! " });
    })
    .addCase(addReviewAsync.rejected, (state, action: any) => {
      state.status = "failed";
      state.error = String(action?.payload?.message);
      notification.error({ message: action?.payload?.message });
    });
    // Get all Companies Lite
    builder
    .addCase(getCompaniesLiteAsync.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getCompaniesLiteAsync.fulfilled, (state, action: any) => {
      state.status = "idle";
      state.institutePublicData = action.payload;
    })
    .addCase(getCompaniesLiteAsync.rejected, (state, action: any) => {
      state.status = "failed";
      state.error = String(action?.payload?.message);
      notification.error({ message: action?.payload?.message });
    });

    // Get all Courses Lite
    builder
      .addCase(getCoursesLiteAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCoursesLiteAsync.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.coursePublicData = action.payload;
      })
      .addCase(getCoursesLiteAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Get all Reviews
    builder
    .addCase(getReviewsAsync.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getReviewsAsync.fulfilled, (state, action: any) => {
      state.status = "idle";
      state.reviewsData = action.payload;
    })
    .addCase(getReviewsAsync.rejected, (state, action: any) => {
      state.status = "failed";
      state.error = String(action?.payload?.message);
      notification.error({ message: action?.payload?.message });
    });
  },
});

export const selectReview = (state: RootState) => state.review;

export default reviewSlice.reducer;