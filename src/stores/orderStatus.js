import { defineStore } from "pinia";
import app from "@/i18n/dashboard";
import getcurrentLanguge from "@/util/locale";
let tabs = app[getcurrentLanguge()].order.tabs;

const orderStatus = defineStore("orderSt", () => {
    const status = new Map();
    const getStatus = () =>{
        // console.log();
        if(status.size === 0){
            tabs.forEach(i => {
                status.set(i.value, i.status);
            });
        }
        return status;
    }
    return {getStatus} 
});
export default orderStatus;