import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import institute from '../pages/Admin/Institute.slice';
import course from '../pages/Admin/Courses.slice';
import courseDetails from '../pages/CourseDetails/CourseDetails.slice';

export const store = configureStore({
  reducer: {
    institute,
    course,
    courseDetails,
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
