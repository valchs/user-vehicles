import { createAsyncThunk } from '@reduxjs/toolkit';
import { VehicleLocation } from 'types/vehicleLocation';
import { VehiclesClient } from 'api/clients';
import { Address } from 'types/address';

export const getVehicleLocationsAction = createAsyncThunk<
  VehicleLocation[],
  number
>('users/getVehicleLocations', async (userId: number) => {
  const response = await VehiclesClient.getVehicleLocations(userId);
  return response;
});

export const getAddressAction = createAsyncThunk<
  Address,
  { lat: number; lon: number }
>('users/getAddress', async ({ lat, lon }) => {
  const response = await VehiclesClient.getAddress(lat, lon);
  return response;
});
