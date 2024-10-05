import { useAppDispatch, useAppSelector } from 'store';
import { getAddressAction } from 'features/vehicles/actions';

const useGetAddress = () => {
  const dispatch = useAppDispatch();
  const { currentAddress } = useAppSelector(state => state.vehicles);

  const getAddress = async (lat: number, lon: number) => {
    if (!lat || !lon) {
      alert('Error: latitude and longitude cannot be null!');
      return;
    }
    await dispatch(getAddressAction({ lat, lon })).unwrap();
  };

  return { getAddress, currentAddress };
};

export default useGetAddress;
