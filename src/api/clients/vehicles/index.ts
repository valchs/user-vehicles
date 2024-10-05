import httpService from 'services/HttpService';
import { Address } from 'types/address';
import { VehicleLocationData, VehicleLocation } from 'types/vehicleLocation';

export const getVehicleLocations = async (
  userId: number
): Promise<VehicleLocation[]> => {
  const response = await httpService
    .getAxiosClient()
    .get<VehicleLocationData>(`/?op=getlocations&userid=${userId}`);
  return response.data.data;
};

export const getAddress = async (
  lat: number,
  lon: number
): Promise<Address> => {
  const response = await httpService
    .getAxiosOSMClient()
    .get<Address>(`/reverse?lat=${lat}&lon=${lon}&format=json`);
  return response.data;
};
