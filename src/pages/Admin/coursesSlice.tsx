import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

import { RootState } from "../../redux/store";
import API from "../../utils/axios";
import { USER_KEY_CONSTANT } from "../../utils/constants";

export interface CourseState {
  courseData: any[];
  homeCoursesData: any[];
  courseDetails: any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  courseData: [],
  homeCoursesData: [],
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

export const getPublicCoursesAsync = createAsyncThunk(
  "admin/getPublicCourses",
  async (filters: any, { rejectWithValue }) => {
    try {
      return (await API.get("/course/public", { params: { ...filters } })).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHomeCoursesAsync = createAsyncThunk(
  "admin/getHomeCourses",
  async (_, { rejectWithValue }) => {
    try {
      return (await API.get("/course/home")).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCourseByIdAsync = createAsyncThunk(
  "admin/getCourseById",
  async (id: string, { rejectWithValue }) => {
    try {
      return (await API.get(`/course/${id}`)).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCourseAsync = createAsyncThunk(
  "admin/updateCourse",
  async ({ id, input }: { id: string; input: any }, { rejectWithValue }) => {
    try {
      return (await API.patch(`/course/${id}`, input)).data;
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
      .addCase(getPublicCoursesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPublicCoursesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // @ts-ignore
        state.courseData = action.payload;
      })
      .addCase(getPublicCoursesAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

      // Get all
    builder
    .addCase(getHomeCoursesAsync.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getHomeCoursesAsync.fulfilled, (state, action) => {
      state.status = "idle";
      // @ts-ignore
      state.homeCoursesData = action.payload;
    })
    .addCase(getHomeCoursesAsync.rejected, (state, action: any) => {
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
        state.courseDetails = action.payload
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
