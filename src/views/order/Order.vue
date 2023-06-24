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
                {{ app[getcurrentLanguge()].order.title }}
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
                                    <v-btn v-if="item.status == orderstatus.WAITING" color="cyan-lighten-1"
                                        @click="confirmOrderHandler(item.id, index)">{{
                                            app[getcurrentLanguge()].order.btn.confirm
                                        }}</v-btn>
                                    <v-btn v-if="item.status == orderstatus.CONFIRMED" color="yellow-lighten-4"
                                        @click="confor(item)">{{
                                            app[getcurrentLanguge()].order.btn.delivery }}</v-btn>
                                    <v-btn v-if="item.status == orderstatus.WAITING_SHIPPING" color="teal-accent-2"
                                        @click="delivering(item.id, index)">{{
                                            app[getcurrentLanguge()].order.btn.shipping }}</v-btn>
                                    <v-btn v-if="item.status == orderstatus.SHIPPING" color="green-accent-3"
                                        @click="success(item.id, index)">{{
                                            app[getcurrentLanguge()].order.btn.success }}</v-btn>
                                    <v-btn @click="detailHandler(item)" color="blue-grey-lighten-4">{{
                                        app[getcurrentLanguge()].order.btn.detail
                                    }}</v-btn>
                                    <v-btn color="deep-orange-accent-3" @click="cancelHandler(item.id,index)"
                                        v-if="item.status == orderstatus.CONFIRMED || item.status == orderstatus.WAITING">{{
                                            app[getcurrentLanguge()].order.btn.cancel }}</v-btn>
                                </td>
                                <!-- @click="confirmOrderHandler(item.id, index)" -->

                            </tr>
                        </tbody>
                    </v-table>
                </VCol>
                <v-container v-if="orders != null">
                    <VRow class="mx-0 align-center" v-if="orders?.data?.length != 0">
                        <VCol cols="12" md="6" sm="12" xs="12">
                            <vue-awesome-paginate class="d-flex justify-center" v-if="orders != null"
                                :total-items="orders.totalRecords || 0" :items-per-page="orders.pageSize || 1"
                                :max-pages-shown="5" v-model="page" :on-click="onClickHandler" />
                        </VCol>
                        <VCol cols="6" md="4" sm="6" class="d-flex justify-end">
                            <span v-if="orders != null" class="current_page_message">{{
                                (orders?.beginIndex + 1) + "-" + (orders?.endIndex) + " / " +
                                (orders?.totalRecords) }}
                            </span>
                        </VCol>
                        <VCol cols="6" md="2" sm="6">
                            <VSelect outlined :items="[5, 10, 20, 30]" @update:model-value="logger" v-model="pageSize" />
                        </VCol>

                    </VRow>
                </v-container>
            </VRow>
        </v-card-text>

    </VCard>
    <Detail :show="detailShow" @close="detailShow = false" :data="order"></Detail>
    <DeliveryOrder :xacnhan="xacnhan" @close="xacnhan = false" @delivery="deliveryOrderHandler" :order="order">
    </DeliveryOrder>
</template>
<script setup>
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
import { nextTick, ref } from 'vue';
import { getOrder, confirmOrder, deliveryOrder, deliveringOrder, successOrder, cancelOrder } from '@/services/orderSerivce'
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
const pageSize = ref(5);
const page = ref(1);
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

const onClickHandler = (p) => {
    getData(page.value - 1, pageSize.value)
};

const logger = () => {
    nextTick(() => {
        page.value = 1;
        getData(0, pageSize.value)
    })
}
const confirmOrderHandler = async (id, index) => {
    if (!confirm(app[getcurrentLanguge()].order.confirm)) {
        return;
    }
    await confirmOrder(id).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            if (tab.value == orderstatus.ALL) {
                orders.value.data[index].status = orderstatus.CONFIRMED;
            } else {
                orders.value.data.splice(index, 1);
            }

            // toast.success("Xác nhận oke");
        }
        else{
            toast.warning(app[getcurrentLanguge()].order.outOfStock);
        }
    })
}
const deliveryOrderHandler = async (item) => {
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

const cancelHandler = async (id,index) => {
    if (!confirm(app[getcurrentLanguge()].order.confirm)) {
        return;
    }
    await cancelOrder(id).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            if (tab.value == orderstatus.ALL) {
                orders.value.data[index].status = orderstatus.CANCEL;
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

const delivering = async (id, index) => {
    if (!confirm(app[getcurrentLanguge()].order.confirm)) {
        return;
    }
    await deliveringOrder(id).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            if (tab.value == orderstatus.ALL) {
                orders.value.data[index].status = orderstatus.SHIPPING;
            } else {
                orders.value.data.splice(index, 1);
            }

        }
    })
}
const success = async (id, index) => {
    if (!confirm(app[getcurrentLanguge()].order.confirm)) {
        return;
    }
    await successOrder(id).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            if (tab.value == orderstatus.ALL) {
                orders.value.data[index].status = orderstatus.SUCCESS;
            } else {
                orders.value.data.splice(index, 1);
            }

        }
    })
}
const findIndex = (id) => {
    return orders.value.data.findIndex(item => {
        return item.id == id;
    })
}
const changeTab = async () => {
    page.value = 1;
    await getData(0, pageSize.value);
}
const getData = async (p, ps) => {
    await getOrder(tab.value, { 'page': p, 'size': ps }).then((resp) => {
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
    await getData(0, pageSize.value);
    await tabs.forEach(i => {
        status.value.set(i.value, i.status);
    });
})
</script>
<style>
.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}</style>