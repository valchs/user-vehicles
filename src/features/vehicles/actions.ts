import { createAsyncThunk } from '@reduxjs/toolkit';
import { VehicleLocation } from 'types/vehicleLocation';
import { VehiclesClient } from 'api/clients';

export const getVehicleLocationsAction = createAsyncThunk<
  VehicleLocation[],
  number
>('users/getVehicleLocations', async (userId: number) => {
  const response = await VehiclesClient.getVehicleLocations(userId);
  return response;
});
