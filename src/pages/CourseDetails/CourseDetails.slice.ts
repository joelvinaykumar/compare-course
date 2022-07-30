import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface courseDetailsSliceState {
  data: any;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: courseDetailsSliceState = {
  data: 0,
  status: 'idle',
  error: null
}
export const courseDetailsSlice = createSlice({
  name: 'courseDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
})

export const selectAuth = (state: RootState) => state.courseDetails;

export default courseDetailsSlice.reducer;
