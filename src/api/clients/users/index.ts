import httpService from 'services/HttpService';
import { UserData, User } from 'types/user';

export const getUsers = async (): Promise<User[]> => {
  const response = await httpService
    .getAxiosClient()
    .get<UserData>('/?op=list');
  return response.data.data;
};
