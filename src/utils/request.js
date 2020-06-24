import axios from 'axios'
import { Message } from 'element-ui';

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

// 创建axios，赋给变量service
const service = axios.create({
    baseURL: BASEURL,
    timeout: 1000
});

// console.log(process.env.NODE_ENV);

// Add a request interceptor
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Tokey'] = '1111';
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
service.interceptors.response.use(function (response) {
    // Do something with response data
    var data = response.data;
    if (data.resCode != 0) {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response; 
    }
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default service;
