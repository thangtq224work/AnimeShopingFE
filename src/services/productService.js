import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/product/get-all',{params:param});
}
const getAll2 = async ()=>{
    return axios.get('/product/get-all-');
}
const getById = (id)=>{
    return axios.get(`/product/${id}`);
}

const save = (obj)=>{
    return axios.post(`/product/new`,obj);
}
const update = (obj)=>{
    return axios.put(`/product/update`,obj);
}
export {getAll,getById,save,update,getAll2}
