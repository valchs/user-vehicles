import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { usersReducer } from 'features/users/slice';
import { vehiclesReducer } from 'features/vehicles/slice';

const rootReducer = combineReducers({
  users: usersReducer,
  vehicles: vehiclesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppDispatch, useAppSelector };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
