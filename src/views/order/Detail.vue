<template>
    <v-dialog v-model="props.show" width="1200" @click:outside="close" persistent no-click-animation>
        <v-card>
            <v-card-title>
                Bạn có muốn xác nhận đơn hàng này ?
            </v-card-title>
            <v-card-text>
                <div>
                    <v-list>
                        <v-list-item>Mã HD: {{ props.data?.orderCode }}</v-list-item>
                        <v-list-item>Tên KH: {{ props.data?.clientName }}</v-list-item>
                        <v-list-item>Ngày đặt: {{ formatDate(props.data?.createAt) }}</v-list-item>
                        <v-list-item>Địa chỉ : {{ props.data?.address }}</v-list-item>
                        <v-list-item>Điện thoại : {{ props.data?.phone }}</v-list-item>
                        <v-list-item>Tài khoản: {{ props.data?.userId }}</v-list-item>
                        <v-list-item>Mô tả: {{ props.data?.description }}</v-list-item>
                        <v-list-item>Khối lượng (ước tính): {{ maxWeight + ' ' + units.gram.name}}</v-list-item>
                        <v-list-item>Tổng đơn hàng: {{ formatVND(props.data?.totalPrice + props.data?.shippingFee)
                        }}</v-list-item>
                        <v-list-item>Doanh thu (Ước tính): {{ formatVND(props.data?.totalPrice - income)}}</v-list-item>
                    </v-list>
                </div>
                <v-form @submit.prevent ref="form">
                    <!-- <v-row class="mx-0">
                        <v-col cols="4" md="3">
                            <v-text-field variant="outlined" v-model="item.weight"
                                :label="app[getcurrentLanguge()].order.attribute.product.weight" :rules="nameValidate"
                                :suffix="units.gram.name"></v-text-field>
                        </v-col>

                        <v-col cols="4" md="3">
                            <v-text-field variant="outlined" v-model="item.length"
                                :label="app[getcurrentLanguge()].order.attribute.product.length" :rules="nameValidate"
                                :suffix="units.cm.name"></v-text-field>
                        </v-col>

                        <v-col cols="4" md="3">
                            <v-text-field variant="outlined" v-model="item.width"
                                :label="app[getcurrentLanguge()].order.attribute.product.width" :rules="nameValidate"
                                :suffix="units.cm.name"></v-text-field>
                        </v-col>

                        <v-col cols="4" md="3">
                            <v-text-field variant="outlined" v-model="item.height"
                                :label="app[getcurrentLanguge()].order.attribute.product.height" :rules="nameValidate"
                                :suffix="units.cm.name"></v-text-field>
                        </v-col>
                    </v-row> -->
                    <!-- <v-row class="mx-0">
                        <v-col cols="12">
                            <v-select variant="outlined" :items="requiredNote[getcurrentLanguge()]"
                                v-model="item.requiredNote"
                                :label="app[getcurrentLanguge()].order.attribute.product.requireNote" item-title="name"
                                item-value="value"></v-select>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea rows="2" variant="outlined"
                                :label="app[getcurrentLanguge()].order.attribute.product.note" v-model="item.note">
                            </v-textarea>
                        </v-col>
                    </v-row> -->
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
                                            {{ app[getcurrentLanguge()].order.attribute.product.name }}
                                        </th>
                                        <th class="text-center">
                                            {{ app[getcurrentLanguge()].order.attribute.product.quantity }}
                                        </th>
                                        <th class="text-center">
                                            {{ app[getcurrentLanguge()].order.attribute.product.quantityAvailable }}
                                        </th>
                                        <th class="text-center">
                                            {{ app[getcurrentLanguge()].order.attribute.product.price }}
                                        </th>
                                        <th class="text-center">
                                            {{ app[getcurrentLanguge()].order.attribute.product.priceSell }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="props.data.orderDetails?.length == 0">
                                        <td colspan="20" class="text-center">
                                            {{ app[getcurrentLanguge()].noData }}
                                        </td>
                                    </tr>
                                    <tr v-else v-for="( item, index ) in  props.data.orderDetails " :key="item.id">
                                        <td class="text-center">{{ index }}</td>
                                        <td class="text-center">{{ item.name }}</td>
                                        <!-- <td class="text-center">{{ formatDate(item.createAt) }}</td> -->
                                        <td class="text-center">{{ item.quantity }}</td>
                                        <td class="text-center">{{ item.quantityAvailable }}</td>
                                        <td class="text-center">{{ formatVND(item.originalPrice) }}</td>
                                        <td class="text-center">{{ formatVND(item.sellPrice) }}</td>
                                        <!-- <td class="text-center">
                                    <v-btn @click="detailHandler(item)">{{ app[getcurrentLanguge()].order.btn.detail }}</v-btn>
                                    <v-btn @click="confor(item)">{{ app[getcurrentLanguge()].order.btn.cancel }}</v-btn>
                                    <v-btn v-if="item.status == orderstatus.WAITING"
                                    @click="updd(item)"
                                    >{{
                                        app[getcurrentLanguge()].order.btn.confirm }}</v-btn>
                                </td> -->
                                    </tr>
                                </tbody>
                            </v-table>
                        </VCol>
                    </VRow>
                </v-form>
                <v-card-actions class="justify-end">
                    <v-btn @click="close">close</v-btn>
                </v-card-actions>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>
<script setup>
import { nextTick } from 'vue';
import { ref } from 'vue';
import units from '@/const/unit'
import { requiredNote } from '@/const/ghnConfig';
import getcurrentLanguge from '@/util/locale';
import app from '@/i18n/dashboard';
import { formatDate } from '@/util/dateformat';
import { formatVND } from '@/util/formatVND';
import { onMounted } from 'vue';
import { computed } from 'vue';
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    data: {
        type: Object,
        required: false
    }
})
const emits = defineEmits(
    {
        close: null
    }
);
const item = ref({
    width: 0,
    height: 0,
    length: 0,
    weight: 0,
    requiredNote: null,
    note: "",
})
const defaultItem = {
    width: 0,
    height: 0,
    length: 0,
    weight: 0,
    requiredNote: null,
    note: "",
};
const close = () => {
    item.value = Object.assign({}, defaultItem);
    nextTick(() => {
        emits('close');

    })
};
const maxWeight = computed(()=>{
    return props.data?.orderDetails.reduce((total, it) => {
        return total + (it.quantity * it.weight);
    }, 0);
});

const income = computed(()=>{
    return props.data?.orderDetails.reduce((total, it) => {
        return total + (it.quantity * it.originalPrice);
    }, 0);
});
const nameValidate = [];
onMounted(() => {
    console.log(props.data);
    // maxWeight.value = props.data?.orderDetails.reduce((total, it) => {
    //     return total + (it.quantity * it.weight);
    // }, 0);
    // console.log(maxWeight.value);
});
</script>