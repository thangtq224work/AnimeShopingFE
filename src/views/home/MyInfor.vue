<template>
    <v-row class="mx-0 mb-10">
        <v-col cols="12" md="9">
            <p class="text-center cart__text__title">{{ homeApp[getcurrentLanguge()].cartPage.cart }}</p>
            <v-sheet>
                <v-form ref="form">
                    <v-table height="550">
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
                                <th class="text-center text__bold">STT</th>
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
                            <tr v-else v-for="(item, index) in order">
                                <td class="text-center">{{ index }}</td>
                                <td class="text-center">{{ item.orderCode }}</td>
                                <td class="text-center">{{ formatDate(item.createAt) }}</td>
                                <td class="text-center">{{ formatVND(item.totalPrice + item.shippingFee | 0) }}</td>
                                <td class="text-center">{{ formatVND(item.customerMoney | 0) }}</td>
                                <td class="text-center">{{ status.get(item.status) }}</td>
                                <td class="text-center">
                                    <v-icon @click="paymentHandler(item.id)"
                                        v-if="item.totalPrice + item.shippingFee > item.customerMoney"
                                        icon="mdi-credit-card-outline" variant="text"></v-icon>
                                    <v-btn @click="detail(item.id)" color="info">Chi tiết</v-btn>
                                    <v-btn @click="cancelOrder(item.id)" color="red">Hủy đơn </v-btn>
                                </td>
                            </tr>

                            <!-- <tr cols v-if="!props.cart || props.cart.length == 0" class="align__center">
                                <td colspan="100">{{ homeApp[getcurrentLanguge()].noData }}</td>
                            </tr>
                            <tr v-for="(item, index) in props.cart">
                                <td class="text-center py-1">
                                    <v-img :src='item.images?.length != 0 ? item.images[0].url : NoImage' :title="item.name"
                                        style="height: 100px; width: 100%;">
                                    </v-img>
                                </td>
                                <td class="">
                                    <div>
                                        <v-list>
                                            <v-list-item class="cart__infor__name">{{ item.name }}</v-list-item>
                                            <v-list-item class="cart__infor__weight">{{ item.weight }}g</v-list-item>
                                            <v-list-item>{{ item.category.name }}</v-list-item>
                                        </v-list>
                                    </div>
                                </td>
                                <td class="text-center">{{ formatVND(item.priceSell) }}</td>
                                <td class="text-center">
                                    <v-text-field v-model="item.quantity" type="number" style="width: 100px;"
                                        @update:model-value="updateQuantity(item.id, item.quantity, index)" min="1" max="10"
                                        :rules="quantityValidation"></v-text-field>
                                </td>
                                <td class="text-center">{{ formatVND(item.quantity * item.priceSell) }}</td>
                                <td class="text-center">
                                    <v-btn prepend-icon="mdi-trash-can-outline" variant="text"
                                        @click="removeFromCart(item.id, index)"></v-btn>
                                </td>
                            </tr> -->
                        </tbody>
                    </v-table>
                </v-form>
            </v-sheet>
        </v-col>
        <!-- <v-col cols="12" md="4">
            <p class="text-center cart__text__title">{{ homeApp[getcurrentLanguge()].cartPage.cartInfor }}</p>
            <v-list>
                <v-list-item class="cart__infor__product">{{ homeApp[getcurrentLanguge()].cartPage.totalWeight }} : {{ total_weight || 0 }}g</v-list-item>
                <v-list-item class="cart__infor__product">{{ homeApp[getcurrentLanguge()].cartPage.totalQuantity }} : {{ total_quantity || 0 }}</v-list-item>
                <v-list-item class="cart__infor__product">{{ homeApp[getcurrentLanguge()].cartPage.totalPrice }} : {{ formatVND(total_price || 0)}}</v-list-item>
            </v-list>

            <v-btn color="success" variant="outlined" @click="perchar">{{ homeApp[getcurrentLanguge()].cartPage.btn.perchar }}</v-btn>
        </v-col> -->
    </v-row>
</template>
<script setup>
import homeApp from '@/i18n/home';
import getcurrentLanguge from '@/util/locale';
import { formatVND } from '@/util/formatVND';
import { formatDate } from '@/util/dateformat';
import { ref } from 'vue';
import { getOrder, payment ,refund } from '@/services/userService';
import { onMounted } from 'vue';
import app from '@/i18n/dashboard';
import { useRouter } from 'vue-router';
const route = useRouter();
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
    await refund(id).then(resp=>{
        if (resp.data.code >= 200 && resp.data.code < 300) {
            if (resp.data.data.code == "00") {
                url = resp.data.data.data;
            }
        }
    }).catch(err=>{
        console.log(err);
    })
}
onMounted(async () => {
    await tabs.forEach(i => {
        status.value.set(i.value, i.status);
    });
    await getOrder().then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            order.value = resp.data.data;
        } else {
            console.log("have error");
        }
    }).catch((err) => {
        console.log(err);
    })
})
</script>