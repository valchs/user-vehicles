import { useAppDispatch, useAppSelector } from 'store';
import { getUsersAction } from 'features/users/actions';

const useGetUsers = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);

  const getUsers = () => {
    dispatch(getUsersAction()).unwrap();
  };

  return { getUsers, users };
};

export default useGetUsers;
