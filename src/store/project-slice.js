import { createSlice } from '@reduxjs/toolkit';

const ProjectSlice = createSlice({
  name: 'project',
  initialState: {
    data: {},
  },
  reducers: {
    getProjectDetails(state, action) {
      state.data = action.payload.content;
    },
  },
});

export const ProjectReducer = ProjectSlice.reducer;

export const ProjectActions = ProjectSlice.actions;
