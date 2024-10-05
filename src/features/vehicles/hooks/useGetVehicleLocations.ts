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
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getVehicleLocations = async (userId: number) => {
    try {
      await await dispatch(getVehicleLocationsAction(userId)).unwrap();
    } catch (error) {
      // NOTE: Sometimes API doesn't return data. In that case, try again
      // In real world scenario, max retry attempt count should be set
      console.error(error);
      await delay(1000);
      getVehicleLocations(userId);
    }
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
