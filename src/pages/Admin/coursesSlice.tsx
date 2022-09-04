import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

import { RootState } from "../../redux/store";
import API from "../../utils/axios";

export interface CourseState {
  courseData: any;
  courseDetails: any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  courseData: [],
  courseDetails: {},
  status: "idle",
  error: null,
};

export const createCourseAsync = createAsyncThunk(
  "admin/createCourse",
  async (input: any, { rejectWithValue }) => {
    try {
      return await API.post("/course", input);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCoursesAsync = createAsyncThunk(
  "admin/getCourses",
  async (_, { rejectWithValue }) => {
    try {
      return await API.get("/course");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCourseByIdAsync = createAsyncThunk(
  "admin/getCourseById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await API.get(`/course/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCourseAsync = createAsyncThunk(
  "admin/updateCourse",
  async ({ id, input }: { id: string; input: any }, { rejectWithValue }) => {
    try {
      return await API.patch(`/course/${id}`, input);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCourseAsync = createAsyncThunk(
  "admin/deleteCourse",
  async (id: string, { rejectWithValue }) => {
    try {
      return await API.delete(`/course/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createCourseAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createCourseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.courseData = [...state.courseData, action.payload];
        notification.success({ message: "Created Course successfully!" });
      })
      .addCase(createCourseAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Get all
    builder
      .addCase(getCoursesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCoursesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // @ts-ignore
        state.courseData = new Array(10).fill(...action.payload);
      })
      .addCase(getCoursesAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Get Details
    builder
      .addCase(getCourseByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCourseByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.courseDetails = action.payload;
        notification.success({ message: "Fetched Course details successfully!" });
      })
      .addCase(getCourseByIdAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Update
    builder
      .addCase(updateCourseAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        notification.success({ message: "Updated Course successfully!" });
      })
      .addCase(updateCourseAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Delete
    builder
      .addCase(deleteCourseAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        notification.success({ message: "Deleted successfully!" });
      })
      .addCase(deleteCourseAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });
  },
});

export const selectCourse = (state: RootState) => state.course;

export default courseSlice.reducer;
