import httpService from 'services/HttpService';
import { File } from 'types/file';

export const getFiles = async (): Promise<File[]> => {
  const response = await httpService.getAxiosClient().get<File[]>('/Files');
  return response.data;
};
