import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getUsersAction,
  getVehicleLocationsAction,
} from 'features/users/actions';
import { User } from 'types/user';
import { VehicleLocation } from 'types/vehicleLocation';

interface UsersState {
  users: User[];
  vehicleLocations: VehicleLocation[];
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  vehicleLocations: [],
  isLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getUsersAction.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      }
    );
    builder.addCase(getUsersAction.rejected, state => {
      state.isLoading = false;
      state.users = [];
    });

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

export const usersReducer = usersSlice.reducer;
