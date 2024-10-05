import { useAppDispatch, useAppSelector } from 'store';
import { getAddressAction } from 'features/vehicles/actions';

const useGetAddress = () => {
  const dispatch = useAppDispatch();
  const { currentAddress } = useAppSelector(state => state.vehicles);

  const getAddress = (lat: number, lon: number) => {
    dispatch(getAddressAction({ lat, lon })).unwrap();
  };

  return { getAddress, currentAddress };
};

export default useGetAddress;
