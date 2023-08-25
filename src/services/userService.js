import axios from '@/router/axios.js'
const getOrder = async () => {
    return axios.post('/user/order');
}

const getOrderById = async (id) => {
    return axios.get(`/user/order/${id}`);
}
const payment = async (oid) => {
    return axios.get('/user/create-order', {
        params: {
            "oid": oid
        }
    });
}

const refund = async (oid) => {
    return axios.get('/user/refund', {
        params: {
            "oid": oid
        }
    });
}
const confirm = async (obj) => {
    return axios.get('/user/payment', {
        params: obj
    });
}
export { getOrder, payment, getOrderById,confirm,refund }
