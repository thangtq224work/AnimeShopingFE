import axios from "axios";

const BASE_URL = 'http://localhost:8080/anime-shop/api/';
const Axios= axios.create({
    baseURL:BASE_URL
});
export default Axios;