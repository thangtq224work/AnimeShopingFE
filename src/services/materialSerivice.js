import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/material/get-all',{params:param});
}
const getAllMaterial = async ()=>{
    return axios.get('/material/get-all-');
}
const getById = (id)=>{
    return axios.get(`/material/${id}`);
}

const save = (obj)=>{
    return axios.post(`/material/new`,obj);
}
const update = (obj)=>{
    return axios.put(`/material/update`,obj);
}
export {getAll,getById,save,update,getAllMaterial}
