import axios from "axios";
const BASE_URL = 'http://localhost:8080/anime-shop/api/';
const Axios = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});
const login = (login) => {
    return Axios.post('/auth/login', login);
}
const register = (register) => {
    return Axios.post('/auth/register', register);
}
const confirm = (token) => {
    return Axios.get('/auth/register/confirm', {
        params:{
            "token":token
        }
    });
}

const refresh = (token) => {
    return Axios.post('/auth/refresh', token);
}

const getUsername = (token) => {
    return Axios.post('/auth/get-user', token);
}

const getRole = (token) => {
    return Axios.post('/auth/get-role', token);
}
export { login, refresh, getUsername,getRole,register ,confirm };