import Axios from "@/router/axios";
const order = (obj) => {
    return Axios.post("/v1/order/create", obj);
}
const getOrder = (obj) => {
    return Axios.get("/order/get-all", {
        params: {
            st: (obj || obj == 0) ? obj : ''
        },
    });
}
const confirmOrder = (id) => {
    return Axios.get("/order/confirm", {
        params: {
            orderId: id
        },
    });
}
const deliveryOrder = (obj) => {
    return Axios.post("/order/delivery", obj);
}
const preview = (obj) => {
    return Axios.post("/v1/preview", obj);
}
export { order, getOrder, confirmOrder, preview, deliveryOrder }