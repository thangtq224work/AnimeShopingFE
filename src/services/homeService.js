import axios from '@/router/axios.js'
import qs from 'qs'
const getFilter = () => {
    return axios.get('v1/get-filter');
}
const getCart = (list) => {
    return axios.post('v1/get-cart',list);
}
const getProduct = (filter, page, size) => {
    return axios.get('v1/get-product', {
        params: {
            page: page -1,
            size: size,
            sortBy: filter?.sortBy?.sort,
            dir: filter?.sortBy?.direction,
            categories: filter?.categories,
            materials: filter?.materials,
            typeProducts: filter?.typeProducts,
        },
        paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: "repeat" })
        }
    })
}
export { getFilter, getProduct,getCart }
