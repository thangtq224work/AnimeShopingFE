import axios from "axios";
import { readCookie, setCookie } from "@/util/cookies";
import { refresh } from "@/services/authService";

const BASE_URL = 'http://localhost:8080/anime-shop/api/';
const Axios = axios.create({
    baseURL: BASE_URL,
    timeout:7000
});
Axios.interceptors.request.use(async function (config) {
    let access_token = readCookie('access_token');
    let refresh_token = readCookie('refresh_token');
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    else if (refresh_token) {
        await refresh({ 'refreshToken': refresh_token }).then(resp => {
            if (resp.data.code >= 200 && resp.data.code < 300) {
                setCookie('access_token', resp.data.data.access_token, resp.data.data.access_token_expired);
                config.headers.Authorization = `Bearer ${resp.data.data.access_token}`;
            }
        });
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default Axios;