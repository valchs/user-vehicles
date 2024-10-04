import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersClient } from 'api/clients';
import { User } from 'types/user';
import { VehicleLocation } from 'types/vehicleLocation';

export const getUsersAction = createAsyncThunk<User[], void>(
  'users/getUsers',
  async () => {
    const response = await UsersClient.getUsers();
    console.log(response);
    return response;
  }
);

export const getVehicleLocationsAction = createAsyncThunk<
  VehicleLocation[],
  number
>('users/getVehicleLocations', async (userId: number) => {
  const response = await UsersClient.getVehicleLocations(userId);
  return response;
});
