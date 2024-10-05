import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersClient } from 'api/clients';
import { User } from 'types/user';

export const getUsersAction = createAsyncThunk<User[], void>(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    const response = await UsersClient.getUsers();
    if (response === undefined) {
      console.log('User data is undefined, retrying...');
      return rejectWithValue('Data is undefined');
    }
    return response;
  }
);
