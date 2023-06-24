<template>
    <v-sheet class="ma-5" elevation="4" :rounded="true">
        <!-- <p>Filter</p> -->
        <VRow class="ma-1 pt-3" elevation="4">
            <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                <v-text-field v-model.trim="filter.search" :label="app[getcurrentLanguge()].product.attribute.name"
                    clearable variant="outlined"></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                <v-select v-model="filter.status" item-title="name" item-value="value"
                    :label="app[getcurrentLanguge()].product.attribute.status" variant="outlined"></v-select>
            </v-col>
        </VRow>
        <VRow class="ma-1 pb-5 pt-5 justify-center">
            <!-- me-0 me-xs-5 me-sm-5 mb-sm-0 mb-5 -->
            <v-btn color="primary" class="me-5 mb-3" @click="filters" rounded="lg">
                {{ app[getcurrentLanguge()].btn.find }}
            </v-btn>
            <v-btn variant="outlined" color="primary" @click="reset" rounded="lg">
                {{ app[getcurrentLanguge()].btn.reset }}
            </v-btn>
        </VRow>
    </v-sheet>
    <VCard class="ma-5" elevation="12">
        <VRow class="ma-1 mb-0">
            <h2 class="v-col-12 text-center formTitle">
                {{ app[getcurrentLanguge()].product.title }}
            </h2>
        </VRow>
        <v-tabs class="ma-6" v-model="tab" @update:model-value="changeTab">
            <v-tab v-for="item in tabs" :value="item.value">{{ item.name }}</v-tab>

            <!-- <v-tab value="0">Tất cả</v-tab>
            <v-tab value="1">Chờ xác nhận</v-tab>
            <v-tab value="2">Đã xác nhận</v-tab>
            <v-tab value="3">Đang giao hàng</v-tab>
            <v-tab value="4">Thành công</v-tab>
            <v-tab value="5">Hủy đơn</v-tab> -->
        </v-tabs>
        <v-card-text>
            <!-- <v-window v-model="tab">
                <v-window-item>
                    One
                </v-window-item>
                <v-window-item value="1">
                    One
                </v-window-item>
                <v-window-item value="2">
                    One
                </v-window-item>
                <v-window-item value="3">
                    One
                </v-window-item>
                <v-window-item value="4">
                    Two
                </v-window-item>
                <v-window-item value="5">
                    Three
                </v-window-item>
            </v-window> -->
            <VRow class="ma-0">
                <VCol auto>
                    <v-table fixed-header hover density="comfortable" class="custom-table" loading
                        loading-text="Loading... Please wait">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    #
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].order.attribute.orderCode }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].order.attribute.orderDate }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].order.attribute.orderBy }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].order.attribute.total }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].order.attribute.customerMoney }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].order.attribute.status }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].order.attribute.action }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="orders == null || orders?.data?.length == 0">
                                <td colspan="20" class="text-center">
                                    {{ app[getcurrentLanguge()].noData }}
                                </td>
                            </tr>
                            <tr v-else v-for="( item, index ) in  orders?.data " :key="item.id">
                                <td class="text-center">{{ orders.beginIndex + 1 + index }}</td>
                                <td class="text-center">{{ item.orderCode }}</td>
                                <td class="text-center">{{ formatDate(item.createAt) }}</td>
                                <td class="text-center">{{ item.userId }}</td>
                                <td class="text-center">{{ formatVND(item.totalPrice + item.shippingFee) }}</td>
                                <td class="text-center">{{ formatVND(item.customerMoney | 0) }}</td>
                                <td class="text-center">{{ status.get(item.status) }} </td>
                                <td class="text-center">
                                    <v-btn v-if="item.status == orderstatus.WAITING"
                                        @click="confirmOrderHandler(item.id, index)">{{ app[getcurrentLanguge()].order.btn.confirm
                                        }}</v-btn>
                                    <v-btn v-if="item.status == orderstatus.CONFIRMED" @click="confor(item)">{{
                                        app[getcurrentLanguge()].order.btn.delivery }}</v-btn>
                                    <v-btn @click="detailHandler(item)">{{ app[getcurrentLanguge()].order.btn.detail
                                    }}</v-btn>
                                    <v-btn>{{ app[getcurrentLanguge()].order.btn.cancel }}</v-btn>
                                </td>
                                <!-- @click="confirmOrderHandler(item.id, index)" -->

                            </tr>
                        </tbody>
                    </v-table>
                </VCol>
            </VRow>
        </v-card-text>

    </VCard>
    <Detail :show="detailShow" @close="detailShow = false" :data="order"></Detail>
    <DeliveryOrder :xacnhan="xacnhan" @close="xacnhan = false" @delivery="deliveryOrderHandler" :order="order"></DeliveryOrder>
</template>
<script setup>
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
import { ref } from 'vue';
import { getOrder, confirmOrder, deliveryOrder } from '@/services/orderSerivce'
import { onMounted } from 'vue';
import { formatVND } from '@/util/formatVND';
import { formatDate } from '@/util/dateformat';
import DeliveryOrder from './DeliveryOrder.vue';
import orderstatus from '@/const/orderStatus';
import { useToast } from 'vue-toastification';
import { watch } from 'vue';
import Detail from './Detail.vue';
const toast = useToast();
const status = ref(new Map());
const orders = ref(null);
const tab = ref(-1);
const filter = ref({});
let tabs = app[getcurrentLanguge()].order.tabs;
const order = ref(null);
const xacnhan = ref(false);
const detailShow = ref(false);
const filters = () => {

};
const confor = (item) => {
    xacnhan.value = true;
    order.value = JSON.parse(JSON.stringify(item));
}

const detailHandler = (item) => {
    order.value = JSON.parse(JSON.stringify(item));
    detailShow.value = true;
}
const confirmOrderHandler = async (id, index) => {
    if (!confirm("Xác thực ")) {
        return;
    }
    await confirmOrder(id).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            if (tab.value == orderstatus.ALL) {
                orders.value.data[index].status = orderstatus.CONFIRMED;
            } else {
                orders.value.data.splice(index, 1);
            }

            toast.success("Xác nhận oke");
        }
    })
}
const deliveryOrderHandler = async (item) => {
    console.log(item);
    await deliveryOrder(item).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            let index = findIndex(item.orderId);
            if (tab.value == orderstatus.ALL) {
                orders.value.data[index].status = orderstatus.WAITING_SHIPPING;
            } else {
                orders.value.data.splice(index, 1);
            }
        } else {
            toast.error("Có lỗi xảy ra");
        }
    }).finally(() => {
        xacnhan.value = false;
    })
}
const findIndex = (id) => {
    return orders.value.data.findIndex(item => {
        return item.id == id;
    })
}
// const build = (item) => {
//     let [province, district, ward] = item.addressCode.split(",");
//     let total = (item.totalPrice + item.shippingFee);
//     let orderGhn = {
//         clientOrderCode: item.orderCode,
//         toName: item.clientName,
//         toPhone: item.phone,
//         toAddress: item.address,
//         toWardCode: ward,
//         districtId: district,
//         codAmount: total,
//         insuranceValue: total,
//         serviceTypeId: 2, // ghn test just accepted serviceTypeId = 2;
//         items: item.orderDetails.reduce((arr, i) => {
//             arr.push({
//                 name: i.name,
//                 quantity: i.quantity,
//                 price: i.sellPrice
//             });
//             return arr;
//         }, [])
//     }
//     console.log(orderGhn);
// }
const changeTab = async () => {
    await getOrder(tab.value).then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            orders.value = resp.data.data;
        }
    });
}
const reset = () => {

};
watch(() => order.value, (newV) => {
    if (!xacnhan.value && !detailShow.value) {
        order.value = null;
    }
})
onMounted(async () => {
    await getOrder().then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            orders.value = resp.data.data;
        }
    });
    await tabs.forEach(i => {
        status.value.set(i.value, i.status);
    });
})
</script>