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
  vehicleAddresses: Address[];
  isLoading: boolean;
  lastFetched: number | null;
}

const initialState: VehiclesState = {
  vehicleLocations: [],
  selectedVehicleId: 0,
  vehicleAddresses: [],
  isLoading: false,
  lastFetched: null,
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    resetVehicleAddresses: state => {
      state.vehicleAddresses = [];
    },
  },
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
        state.lastFetched = Date.now();
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
        if (!state.vehicleAddresses) {
          state.vehicleAddresses = [];
        }
        const index = state.vehicleAddresses?.findIndex(
          address => address.vehicleId === action.payload.vehicleId
        );
        if (index === -1) {
          state.vehicleAddresses.push(action.payload);
        } else {
          state.vehicleAddresses[index] = action.payload;
        }
      }
    );
    builder.addCase(getAddressAction.rejected, state => {
      state.isLoading = false;
      state.vehicleAddresses = [];
    });
    // Set selected vehicle id
    builder.addCase(setSelectedVehicleIdAction, (state, action) => {
      state.selectedVehicleId = action.payload;
    });
  },
});

export const { resetVehicleAddresses } = vehiclesSlice.actions;
export const vehiclesReducer = vehiclesSlice.reducer;
