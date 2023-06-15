import Axios from "@/router/axios"

const getProvince = () => {
    return Axios.get('/v1/get-province');
}

const getDistrict = (pid) => {
    return Axios.get('/v1/get-district', {
        params: {
            provideId: pid
        }
    });
}

const getWard = (dId) => {
    return Axios.get('/v1/get-ward', {
        params: {
            districtId: dId
        }
    });
}


const calculateFee = (data) => {
    return Axios.post('/v1/calculate-fee', data);
}
const getService = (dId) => {
    return Axios.get('/v1/get-service', {
        params: {
            districtId: dId
        }
    });
}
export { getProvince, getDistrict, getWard, getService, calculateFee }