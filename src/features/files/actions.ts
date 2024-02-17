import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilesClient } from 'api/clients';
import { File } from 'types/file';

export const getFilesAction = createAsyncThunk<File[], void>(
  'files/getFiles',
  async () => {
    const response = await FilesClient.getFiles();
    return response;
  }
);
