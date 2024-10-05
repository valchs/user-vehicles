import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getVehicleLocationsAction,
  getAddressAction,
  setSelectedVehicleIdAction,
} from 'features/vehicles/actions';
import { Address } from 'types/address';
import { VehicleLocation } from 'types/vehicleLocation';

interface VehiclesState {
  vehicleLocations: VehicleLocation[];
  selectedVehicleId: number;
  currentAddress: Address;
  isLoading: boolean;
}

const initialState: VehiclesState = {
  vehicleLocations: [],
  selectedVehicleId: 0,
  currentAddress: {
    display_name: '',
  },
  isLoading: false,
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Get vehicle location
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
    // Get address
    builder.addCase(getAddressAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getAddressAction.fulfilled,
      (state, action: PayloadAction<Address>) => {
        state.isLoading = false;
        state.currentAddress = action.payload;
      }
    );
    builder.addCase(getAddressAction.rejected, state => {
      state.isLoading = false;
      state.currentAddress = initialState.currentAddress;
    });
    // Set selected vehicle id
    builder.addCase(setSelectedVehicleIdAction, (state, action) => {
      state.selectedVehicleId = action.payload;
    });
  },
});

export const vehiclesReducer = vehiclesSlice.reducer;
