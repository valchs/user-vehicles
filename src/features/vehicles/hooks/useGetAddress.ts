import { useAppDispatch, useAppSelector } from 'store';
import { getAddressAction } from 'features/vehicles/actions';
import { VehicleLocation } from 'types/vehicleLocation';

const useGetAddress = () => {
  const dispatch = useAppDispatch();
  const { vehicleAddresses } = useAppSelector(state => state.vehicles);

  const getAddress = async (vehicleLocation: VehicleLocation) => {
    if (!vehicleLocation.lat || !vehicleLocation.lon) {
      // NOTE: In real world, more user friendly notification should be displayed, e.g., Snackbar
      alert('Error: latitude and longitude cannot be null!');
      return;
    }
    await dispatch(getAddressAction(vehicleLocation)).unwrap();
  };

  return { getAddress, vehicleAddresses };
};

export default useGetAddress;
