import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { filesReducer } from 'features/files/slice';
import { usersReducer } from 'features/users/slice';

const rootReducer = combineReducers({
  files: filesReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppDispatch, useAppSelector };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
