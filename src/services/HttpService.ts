import axios, { AxiosInstance } from 'axios';

enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

const _axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const _axiosOSM = axios.create({
  baseURL: process.env.REACT_APP_OPENSTREETMAPS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const configure = () => {
  _axios.interceptors.request.use(request => {
    console.log('Sending request');
    return request;
  });

  _axiosOSM.interceptors.request.use(request => {
    console.log('Sending request to OpenStreetView');
    return request;
  });
};

const getAxiosClient = (): AxiosInstance => _axios;
const getAxiosOSMClient = (): AxiosInstance => _axiosOSM;

const HttpService = {
  HttpMethods,
  configure,
  getAxiosClient,
  getAxiosOSMClient,
};

export default HttpService;
