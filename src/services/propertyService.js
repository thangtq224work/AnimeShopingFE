import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/property/get-all',{params:param});
}
const getAllProperty = async ()=>{
    return axios.get('/property/get-all-');
}
const getById = (id)=>{
    return axios.get(`/property/${id}`);
}

const save = (obj)=>{
    return axios.post(`/property/new`,obj);
}
const update = (obj)=>{
    return axios.put(`/property/update`,obj);
}
export {getAll,getById,save,update,getAllProperty}
