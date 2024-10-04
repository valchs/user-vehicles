import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersClient } from 'api/clients';
import { User } from 'types/user';

export const getUsersAction = createAsyncThunk<User[], void>(
  'users/getUsers',
  async () => {
    const response = await UsersClient.getUsers();
    console.log(response);
    return response;
  }
);
