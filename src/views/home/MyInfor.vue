<template>
    <v-row class="mx-0 mb-10">
        <v-col cols="12" md="3">
            <v-form class="mt-10">
                <VueDatePicker :enable-time-picker="false" class="mt-4" v-model="filter.from" placeholder="from">
                </VueDatePicker>
                <VueDatePicker :enable-time-picker="false" class="mt-4" v-model="filter.to" placeholder="to">
                </VueDatePicker>
                <v-btn class="mt-4" color="primary" @click="getData">Apply</v-btn>
            </v-form>
        </v-col>
        <v-col cols="12" md="9">
            <p class="text-center cart__text__title">{{ homeApp[getcurrentLanguge()].order.name }}</p>
            <v-sheet>
                <v-form ref="form">
                    <v-table>
                        <thead>
                            <!-- <tr>
                                <th class="text-center text__bold">{{ homeApp[getcurrentLanguge()].cartPage.cartField.image }}</th>
                                <th class="text-center text__bold">{{ homeApp[getcurrentLanguge()].cartPage.cartField.figure }}</th>
                                <th class="text-center text__bold">{{ homeApp[getcurrentLanguge()].cartPage.cartField.price }}</th>
                                <th class="text-center text__bold">{{ homeApp[getcurrentLanguge()].cartPage.cartField.quantity }}</th>
                                <th class="text-center text__bold">{{ homeApp[getcurrentLanguge()].cartPage.cartField.totalPrice }}</th>
                                <th class="text-center text__bold">{{ homeApp[getcurrentLanguge()].cartPage.cartField.action }}</th>
                            </tr> -->
                            <tr>
                                <!-- <th width="30px" class="text-center text__bold">STT</th> -->
                                <th class="text-center text__bold">Mã HD</th>
                                <th class="text-center text__bold">Ngày Đặt</th>
                                <th class="text-center text__bold">Tống đơn hàng</th>
                                <th class="text-center text__bold">Tổng tiền thanh toán</th>
                                <th class="text-center text__bold">Trạng thái</th>
                                <th class="text-center text__bold">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="order.length == 0">
                                <td colspan="10">
                                    no-data
                                </td>
                            </tr>
                            <tr v-else v-for="(item, index) in order.data">
                                <!-- <td width="30px" class="text-center">{{ index }}</td> -->
                                <td class="text-center">{{ item.orderCode }}</td>
                                <td class="text-center">{{ formatDate(item.createAt) }}</td>
                                <td class="text-center">{{ formatVND(item.totalPrice + item.shippingFee | 0) }}</td>
                                <td class="text-center">{{ formatVND(item.customerMoney | 0) }}</td>
                                <td class="text-center">{{ status.get(item.status) }}</td>
                                <td class="text-center">
                                    <v-icon @click="paymentHandler(item.id)"
                                        v-if="item.totalPrice + item.shippingFee > item.customerMoney && (item.status == orderStatus.SHIPPING || item.status == orderStatus.WAITING_SHIPPING)"
                                        icon="mdi-credit-card-outline" variant="text"></v-icon>
                                    <v-btn @click="detail(item.id)" color="info">Chi tiết</v-btn>
                                    <v-btn v-if="item.status != orderStatus.CANCEL" @click="cancelOrder(item.id)"
                                        color="red">Hủy đơn </v-btn>
                                </td>
                            </tr>
                        </tbody>
                        <v-container v-if="order != null" class="ms-4">
                            <VRow class="mx-0 align-center" v-if="order?.length != 0">
                                <VCol cols="12" md="6" sm="12" xs="12">
                                    <vue-awesome-paginate class="d-flex justify-center" v-if="order != null"
                                        :total-items="order.totalRecords || 0" :items-per-page="order.pageSize || 1"
                                        :max-pages-shown="5" v-model="filter.page" :on-click="getData" />
                                </VCol>
                                <VCol cols="6" md="4" sm="6" class="d-flex justify-end">
                                    <span v-if="order != null" class="current_page_message">{{
                                        (order?.beginIndex + 1) + " - " + (order?.endIndex) + " / " +
                                        (order?.totalRecords) }}
                                    </span>
                                </VCol>
                                <!-- <VCol cols="6" md="2" sm="6">
                                    <VSelect outlined :items="[5, 10, 20, 30]" @update:model-value="logger"
                                        v-model="pageSize" />
                                </VCol> -->

                            </VRow>
                        </v-container>
                    </v-table>
                </v-form>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script setup>
import homeApp from '@/i18n/home';
import getcurrentLanguge from '@/util/locale';
import { formatVND } from '@/util/formatVND';
import { formatDate, formatDateV4 } from '@/util/dateformat';
import { ref } from 'vue';
import { getOrder, payment, refund } from '@/services/userService';
import { onMounted } from 'vue';
import app from '@/i18n/dashboard';
import { useRouter } from 'vue-router';
import orderStatus from '@/const/orderStatus'
const route = useRouter();
const filter = ref({
    from: null,
    to: null,
    page:1,
    size:3
});
let tabs = app[getcurrentLanguge()].order.tabs;
const status = ref(new Map());
const order = ref([]);
const paymentHandler = async (oid) => {
    let url = "";
    await payment(oid).then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            if (resp.data.data.code == "00") {
                url = resp.data.data.data;
            }
        }
    })
    window.location.href = url;
}
const detail = (id) => {
    route.push({ name: "contactId", params: { "id": id } });
}
const cancelOrder = async (id) => {
    await refund(id).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            if (resp.data.data.code == "00") {
                url = resp.data.data.data;
            }
        }
    }).catch(err => {
        console.log(err);
    })
}
const getData = async () => {
    filter.value.from = formatDateV4(filter.value.from || null);
    filter.value.to = formatDateV4(filter.value.to || null);

    await getOrder(filter.value).then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            order.value = resp.data.data;
        } else {
            console.log("have error");
        }
    }).catch((err) => {
        console.log(err);
    })
}
onMounted(async () => {
    await tabs.forEach(i => {
        status.value.set(i.value, i.status);
    });
    await getData();
})
</script>