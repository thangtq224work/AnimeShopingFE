import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/category/get-all',{params:param});
}
const getAllCategory = async ()=>{
    return axios.get('/category/get-all-');
}
const getById = (id)=>{
    return axios.get(`/category/${id}`);
}

const save = (obj)=>{
    return axios.post(`/category/new`,obj);
}
const update = (obj)=>{
    return axios.put(`/category/update`,obj);
}
export {getAll,getById,save,update,getAllCategory}
