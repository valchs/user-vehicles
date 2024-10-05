import { useAppDispatch, useAppSelector } from 'store';
import {
  getVehicleLocationsAction,
  setSelectedVehicleIdAction,
} from 'features/vehicles/actions';

const useGetVehicleLocations = () => {
  const dispatch = useAppDispatch();
  const { vehicleLocations, selectedVehicleId } = useAppSelector(
    state => state.vehicles
  );

  const getVehicleLocations = (userId: number) => {
    dispatch(getVehicleLocationsAction(userId)).unwrap();
  };

  const setSelectedVehicleId = (vehicleId: number) => {
    dispatch(setSelectedVehicleIdAction(vehicleId));
  };

  return {
    getVehicleLocations,
    setSelectedVehicleId,
    vehicleLocations,
    selectedVehicleId,
  };
};

export default useGetVehicleLocations;
