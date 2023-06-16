import Axios from "@/router/axios";
const order = (obj) => {
    return Axios.post("/v1/order/create", obj);
}
const getOrder = (obj) => {
    return Axios.get("/order/get-all");
}
export { order, getOrder }