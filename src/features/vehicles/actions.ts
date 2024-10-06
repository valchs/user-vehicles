import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { VehicleLocation } from 'types/vehicleLocation';
import { VehiclesClient } from 'api/clients';
import { Address } from 'types/address';

export const getVehicleLocationsAction = createAsyncThunk<
  VehicleLocation[],
  number
>('users/getVehicleLocations', async (userId: number, { rejectWithValue }) => {
  const response = await VehiclesClient.getVehicleLocations(userId);
  if (response === undefined) {
    console.log('Vehicle location data is undefined, retrying...');
    return rejectWithValue('Data is undefined');
  }
  response.map(vl => (vl.userid = userId));
  return response;
});

export const getAddressAction = createAsyncThunk<Address, VehicleLocation>(
  'users/getAddress',
  async vehicleLocation => {
    const response = await VehiclesClient.getAddress(
      vehicleLocation.lat,
      vehicleLocation.lon
    );
    response.vehicleId = vehicleLocation.vehicleid;
    return response;
  }
);

export const setSelectedVehicleIdAction = createAction<number>(
  'setSelectedVehicleId'
);
