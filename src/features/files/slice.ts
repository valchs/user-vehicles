import { createSlice } from '@reduxjs/toolkit';
import { getFilesAction } from 'features/files/actions';
import { File } from 'types/files';

const initialState: {
  files: File[];
  isLoading: boolean;
} = {
  files: [
    {
      fileName: '',
    },
  ],
  isLoading: false,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFilesAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getFilesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.files = action.payload;
    });
    builder.addCase(getFilesAction.rejected, () => initialState);
  },
});

export const { reducer } = filesSlice;
