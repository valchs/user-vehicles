import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFilesAction } from 'features/files/actions';
import { File } from 'types/file';

interface FilesState {
  files: File[];
  isLoading: boolean;
}

const initialState: FilesState = {
  files: [],
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
    builder.addCase(
      getFilesAction.fulfilled,
      (state, action: PayloadAction<File[]>) => {
        state.isLoading = false;
        state.files = action.payload;
      }
    );
    builder.addCase(getFilesAction.rejected, state => {
      state.isLoading = false;
      state.files = [];
    });
  },
});

export const filesReducer = filesSlice.reducer;
