import axios from 'axios'

// 创建axios，赋给变量service
const service = axios.create();

console.log(process.env.NODE_ENV);

// Add a request interceptor
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default service;