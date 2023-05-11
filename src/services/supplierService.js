import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/supplier/get-all',{params:param});
}
const getAllSupplier = async ()=>{
    return axios.get('/supplier/get-all-');
}
const getById = (id)=>{
    return axios.get(`/supplier/${id}`);
}

const save = (obj)=>{
    return axios.post(`/supplier/new`,obj);
}
const update = (obj)=>{
    return axios.put(`/supplier/update`,obj);
}
export {getAll,getById,save,update,getAllSupplier}
