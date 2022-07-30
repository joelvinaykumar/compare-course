import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

import { RootState } from "../../redux/store";
import API from "../../utils/axios";

export interface InstituteState {
  instituteData: any;
  instituteDetails: any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: InstituteState = {
  instituteData: [],
  instituteDetails: {},
  status: "idle",
  error: null,
};

export const createInstituteAsync = createAsyncThunk(
  "admin/createInstitute",
  async (input: any, { rejectWithValue }) => {
    try {
      return await API.post("/institute", input);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getInstitutesAsync = createAsyncThunk(
  "admin/getInstitutes",
  async (_, { rejectWithValue }) => {
    try {
      return await API.get("/institute");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getInstituteByIdAsync = createAsyncThunk(
  "admin/getInstituteById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await API.get(`/institute/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateInstituteAsync = createAsyncThunk(
  "admin/updateInstitute",
  async ({ id, input }: { id: string; input: any }, { rejectWithValue }) => {
    try {
      return await API.patch(`/institute/${id}`, input);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteInstitutesAsync = createAsyncThunk(
  "admin/deleteInstitute",
  async (id: string, { rejectWithValue }) => {
    try {
      return await API.delete(`/institute/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createInstituteAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createInstituteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.instituteData = [...state.instituteData, action.payload];
        notification.success({ message: "Created Institute successfully!" });
      })
      .addCase(createInstituteAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Get all
    builder
      .addCase(getInstitutesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInstitutesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.instituteData = action.payload;
        notification.success({ message: "Fetched Institutes successfully!" });
      })
      .addCase(getInstitutesAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Get details
    builder
      .addCase(getInstituteByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInstituteByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.instituteDetails = action.payload;
        notification.success({ message: "Fetched Institutes successfully!" });
      })
      .addCase(getInstituteByIdAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Update
    builder
      .addCase(updateInstituteAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateInstituteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        notification.success({ message: "Updated Institute successfully!" });
      })
      .addCase(updateInstituteAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Delete
    builder
      .addCase(deleteInstitutesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteInstitutesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        notification.success({ message: "Deleted successfully!" });
      })
      .addCase(deleteInstitutesAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });
  },
});

export const selectInstitute = (state: RootState) => state.institute;

export default instituteSlice.reducer;
