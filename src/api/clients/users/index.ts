import httpService from 'services/HttpService';
import { UserData, User } from 'types/user';
import { VehicleLocationData, VehicleLocation } from 'types/vehicleLocation';

export const getUsers = async (): Promise<User[]> => {
  const response = await httpService
    .getAxiosClient()
    .get<UserData>('/?op=list');
  return response.data.data;
};

export const getVehicleLocations = async (
  userId: number
): Promise<VehicleLocation[]> => {
  const response = await httpService
    .getAxiosClient()
    .get<VehicleLocationData>(`/?op=getlocations&userid=${userId}`);
  return response.data.data;
};
