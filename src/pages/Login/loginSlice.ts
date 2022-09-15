import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";
import API from "../../utils/axios";
import { STORAGE_KEY_CONSTANT, USER_KEY_CONSTANT } from "../../utils/constants";

export interface loginSliceState {
  data: any;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: loginSliceState = {
  data: 0,
  status: "idle",
  error: null,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string, onClose: any }, { rejectWithValue }) => {
    try {
      API.post("/user/login", data)
        .then(async (res) => {
          localStorage.setItem(STORAGE_KEY_CONSTANT, res.data.access_token);
          const user = await API.get("/me", {
            headers: { Authorization: `Bearer ${res.data.access_token}` },
          });
          localStorage.setItem(
            USER_KEY_CONSTANT,
            JSON.stringify(user.data)
          );
          window.location.href = "/"
        })
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logOutAsync: () => {
      localStorage.removeItem(STORAGE_KEY_CONSTANT)
      localStorage.removeItem(USER_KEY_CONSTANT)
      window.location.href = "/"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { logOutAsync } = loginSlice.actions

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
