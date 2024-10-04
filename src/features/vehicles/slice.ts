import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getVehicleLocationsAction } from 'features/vehicles/actions';
import { VehicleLocation } from 'types/vehicleLocation';

interface UsersState {
  vehicleLocations: VehicleLocation[];
  isLoading: boolean;
}

const initialState: UsersState = {
  vehicleLocations: [],
  isLoading: false,
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getVehicleLocationsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getVehicleLocationsAction.fulfilled,
      (state, action: PayloadAction<VehicleLocation[]>) => {
        state.isLoading = false;
        state.vehicleLocations = action.payload;
      }
    );
    builder.addCase(getVehicleLocationsAction.rejected, state => {
      state.isLoading = false;
      state.vehicleLocations = [];
    });
  },
});

export const vehiclesReducer = vehiclesSlice.reducer;
