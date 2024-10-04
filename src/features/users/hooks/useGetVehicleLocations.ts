import { useAppDispatch, useAppSelector } from 'store';
import { getVehicleLocationsAction } from 'features/users/actions';

const useGetVehicleLocations = () => {
  const dispatch = useAppDispatch();
  const { vehicleLocations } = useAppSelector(state => state.users);

  const getVehicleLocations = (userId: number) => {
    dispatch(getVehicleLocationsAction(userId)).unwrap();
  };

  return { getVehicleLocations, vehicleLocations };
};

export default useGetVehicleLocations;
