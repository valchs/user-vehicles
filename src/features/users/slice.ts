import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUsersAction } from 'features/users/actions';
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
      state.isLoading = true;
      state.users = [];
    });
  },
});

export const usersReducer = usersSlice.reducer;
