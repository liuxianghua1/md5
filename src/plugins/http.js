import axios from 'axios';

const http = axios.create({
    // baseURL: 'http://192.168.0.77:8080/xsl-decode'
    baseURL: 'http://192.168.99.91:8080/xsl-decode'
})

http.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default http;