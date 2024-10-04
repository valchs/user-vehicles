import httpService from 'services/HttpService';
import { VehicleLocationData, VehicleLocation } from 'types/vehicleLocation';

export const getVehicleLocations = async (
  userId: number
): Promise<VehicleLocation[]> => {
  const response = await httpService
    .getAxiosClient()
    .get<VehicleLocationData>(`/?op=getlocations&userid=${userId}`);
  return response.data.data;
};
