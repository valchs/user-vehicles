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

const configure = () => {
  _axios.interceptors.request.use(request => {
    console.log('Sending request');
    return request;
  });
};

const getAxiosClient = (): AxiosInstance => _axios;

const HttpService = {
  HttpMethods,
  configure,
  getAxiosClient,
};

export default HttpService;
