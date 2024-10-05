import { useAppDispatch, useAppSelector } from 'store';
import { getUsersAction } from 'features/users/actions';

const useGetUsers = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector(state => state.users);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getUsers = async () => {
    try {
      await dispatch(getUsersAction()).unwrap();
    } catch (error) {
      // NOTE: Sometimes API doesn't return user list. In that case, try again
      // In real world scenario, max retry attempt count should be set
      console.error(error);
      await delay(1000);
      getUsers();
    }
  };

  return { getUsers, users, isLoading };
};

export default useGetUsers;
