import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from './auth-slice';
import { ProjectReducer } from './project-slice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    project: ProjectReducer,
  },
});

export default store;
