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
        <v-tabs class="ma-6" v-model="tab">
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
                                <td class="text-center">{{ formatVND(item.totalPrice) }}</td>
                                <td class="text-center">{{ formatVND(item.customerMoney | 0) }}</td>
                                <td class="text-center">{{ status.get(item.status) }}  </td>
                                <!-- <td class="text-center">{{ item.status == 1 ? app[getcurrentLanguge()].product.status.trueVal
                                : app[getcurrentLanguge()].product.status.falseVal }}</td> -->
                                <td class="text-center">
                                    <v-icon class="btn_icon" size="small" @click="editItem(item)" title="edit">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon class="btn_icon" size="small" @click="infor(item.id)">
                                        mdi-format-horizontal-align-right
                                    </v-icon>
                                </td>

                            </tr>
                        </tbody>
                    </v-table>
                </VCol>
            </VRow>
        </v-card-text>

    </VCard>
</template>
<script setup>
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
import { ref } from 'vue';
import { getOrder } from '@/services/orderSerivce'
import { onMounted } from 'vue';
import { formatVND } from '@/util/formatVND';
import { formatDate } from '@/util/dateformat';
const status = ref(new Map());
const orders = ref(null);
const tab = ref(-1);
const filter = ref({});
let tabs = app[getcurrentLanguge()].order.tabs;
const filters = () => {

};
const reset = () => {

};
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