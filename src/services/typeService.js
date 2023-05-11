import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/type-product/get-all',{params:param});
}
const getAllType = async ()=>{
    return axios.get('/type-product/get-all-');
}
const getById = (id)=>{
    return axios.get(`/type-product/${id}`);
}

const save = (obj)=>{
    return axios.post(`/type-product/new`,obj);
}
const update = (obj)=>{
    return axios.put(`/type-product/update`,obj);
}
export {getAll,getById,save,update,getAllType}
