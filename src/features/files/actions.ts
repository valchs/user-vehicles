import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilesClient } from 'api/clients';

export const getFilesAction = createAsyncThunk('getFiles', async () => {
  const response = await FilesClient.getFiles();
  return response;
});
