import Axios from "@/router/axios";
const getTopSellProduct = async (top,from,to) =>{
    return Axios.get('/v1/statistical/get-top-sell-product',{params:{
        'top':top,
        'from':from,
        'to':to,
    }})
}

const getTopSellProductV2 = async (paramData) =>{
    return Axios.get('/v1/statistical/get-top-sell-product',{params:paramData})
}

const statistical = async (year) =>{
    return Axios.get('/v1/statistical/get-profit',{params:{
        'year':year
    }})
}
export {getTopSellProduct,getTopSellProductV2,statistical}
