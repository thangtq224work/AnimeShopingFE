import Axios from '@/router/axios';
import { formatDateV2,formatDateV3 } from '@/util/dateformat';
import qs from 'qs'

const getAll = (filter, page, size) => {
    return Axios.get('/discount/get-all', {
        params: {
            search: filter.value.search,
            to: formatDateV3(filter.value.to),
            from: formatDateV2(filter.value.from),
            status: filter.value.status,
            page: page.value - 1,
            size: size.value
        }
    });
}
const getDiscountById = (id,filter, obj) => {
    return Axios.get(`/discount/${id}`, {
        params: {
            page: obj.page - 1,
            size: obj.size,
            name:filter.name,
            categories:filter.categories
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" })
        }
    });
}

const getAllCategory = () =>{
    return Axios.get('/category/get-all');
}
const getById = (id) => {
    return Axios.get(`/discount/get/${id}`);
}

const save = (obj) => {
    return Axios.post(`/discount/new`, obj);
}
const update = (obj) => {
    return Axios.put(`/discount/update`, obj);
}
const saveAll = (obj) => {
    return Axios.post("/discount/product/save-all", obj);
}
const removeAll = (obj) => {
    return Axios.post("/discount/product/remove-all", obj);
}
const saveProductDiscount = (obj) =>{
    return Axios.post("/discount/product/save", obj);
}
const removeProductDiscount = (obj) =>{
    return Axios.post("/discount/product/remove", obj);
}
export { getAll, getById, save, update, getDiscountById, saveAll, removeAll,saveProductDiscount,removeProductDiscount,getAllCategory }
