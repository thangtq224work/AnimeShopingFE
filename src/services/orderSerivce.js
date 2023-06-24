import Axios from "@/router/axios";
const order = (obj) => {
    return Axios.post("/v1/order/create", obj);
}
const getOrder = (obj, p) => {
    return Axios.get("/order/get-all", {
        params: {
            st: (obj || obj == 0) ? obj : '',
            page: p.page,
            size: p.size,
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

const deliveringOrder = (id) => {
    return Axios.get("/order/delivering", {
        params: {
            orderId: id
        }
    });
}

const cancelOrder = (id) => {
    return Axios.get("/order/cancel", {
        params: {
            orderId: id
        }
    });
}

const successOrder = (id) => {
    return Axios.get("/order/success", {
        params: {
            orderId: id
        }
    });
}
const preview = (obj) => {
    return Axios.post("/v1/preview", obj);
}
export { order, getOrder, confirmOrder, preview, deliveryOrder, deliveringOrder, successOrder, cancelOrder }