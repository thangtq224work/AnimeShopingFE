import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/product/get',{params:param});
}
const getAll2 = async ()=>{
    return axios.get('/product/get-all');
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
const uploadImage = (id,images) =>{
    console.log(id,images);
    let data = new FormData();
    images.map((value)=>{
        data.append("images",value);
    })
    return axios.post(`/product/image-upload/${id}`,data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });
}
export {getAll,getById,save,update,getAll2,uploadImage}
