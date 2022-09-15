import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import company from '../pages/SuperAdmin/companySlice';
import course from '../pages/Admin/coursesSlice';
import courseDetails from '../pages/CourseDetails/CourseDetails.slice';
import login from '../pages/Login/loginSlice';

export const store = configureStore({
  reducer: {
    company,
    course,
    courseDetails,
    login,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
