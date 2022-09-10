import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

import { RootState } from "../../redux/store";
import API from "../../utils/axios";

export interface CompanyState {
  instituteData: any;
  instituteDetails: any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: CompanyState = {
  instituteData: [],
  instituteDetails: {},
  status: "idle",
  error: null,
};

export const createCompanyAsync = createAsyncThunk(
  "admin/createInstitute",
  async (input: any, { rejectWithValue }) => {
    try {
      return await API.post("/institute", input);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCompaniesAsync = createAsyncThunk(
  "admin/getInstitutes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/institute");
      return res.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCompanyByIdAsync = createAsyncThunk(
  "admin/getInstituteById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/institute/${id}`);
      return res.data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCompanyAsync = createAsyncThunk(
  "admin/updateInstitute",
  async ({ id, input }: { id: string; input: any }, { rejectWithValue }) => {
    try {
      return await API.patch(`/institute/${id}`, input);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCompanyAsync = createAsyncThunk(
  "admin/deleteInstitute",
  async (id: string, { rejectWithValue }) => {
    try {
      return await API.delete(`/institute/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const companySlice = createSlice({
  name: "institute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createCompanyAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createCompanyAsync.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.instituteData = [...state.instituteData, action.payload?.data];
      })
      .addCase(createCompanyAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Get all
    builder
      .addCase(getCompaniesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCompaniesAsync.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.instituteData = action.payload;
      })
      .addCase(getCompaniesAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Get details
    builder
      .addCase(getCompanyByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCompanyByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.instituteDetails = action.payload;
      })
      .addCase(getCompanyByIdAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Update
    builder
      .addCase(updateCompanyAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCompanyAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCompanyAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });

    // Delete
    builder
      .addCase(deleteCompanyAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCompanyAsync.fulfilled, (state, action) => {
        state.status = "idle";
        notification.success({ message: "Deleted successfully!" });
      })
      .addCase(deleteCompanyAsync.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = String(action?.payload?.message);
        notification.error({ message: action?.payload?.message });
      });
  },
});

export const selectCompany = (state: RootState) => state.company;

export default companySlice.reducer;
