<template>
    <v-container>
        <v-btn @click="back">Back</v-btn>
        <p class="text-center cart__text__title">{{ homeApp[lang].cartPage.cart }}</p>
        <v-sheet class="mt-4">
            <v-row>
                <v-col cols="12" md="6">
                    <v-list>
                        <v-list-item class="order__i">
                            <span class="text__bold">Mã HD : </span>{{ order.orderCode }}
                        </v-list-item>
                        <v-list-item class="order__i">
                            <span class="text__bold">Tên KH : </span> {{ order.clientName }}
                        </v-list-item>
                        <v-list-item class="order__i">
                            <span class="text__bold">Địa chỉ : </span> {{ order.address }}
                        </v-list-item>
                        <v-list-item class="order__i">
                            <span class="text__bold">Liên hệ : </span>{{ order.phone }}
                        </v-list-item>
                        <v-list-item class="order__i">
                            <span class="text__bold">Phí ship : </span> {{ formatVND(order.shippingFee) }}
                        </v-list-item>
                        <v-list-item class="order__i">
                            <span class="text__bold">Giá trị đơn hàng : </span> {{ formatVND(order.totalPrice) }}
                        </v-list-item>
                        <v-list-item class="order__i">
                            <span class="text__bold">Tổng tiền cần thành toán :</span> {{ formatVND(order.totalPrice +
                                order.shippingFee | 0)
                            }}
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="12" md="6">
                    <v-table height="550">
                        <thead>
                            <tr>
                                <th class="text-center text__bold">{{ homeApp[lang].cartPage.cartField.image }}</th>
                                <th class="text-center text__bold">{{ homeApp[lang].cartPage.cartField.figure }}</th>
                                <th class="text-center text__bold">{{ homeApp[lang].cartPage.cartField.price }}</th>
                                <th class="text-center text__bold">{{ homeApp[lang].cartPage.cartField.quantity }}</th>
                                <th class="text-center text__bold">{{ homeApp[lang].cartPage.cartField.totalPrice }}</th>
                                <!-- <th class="text-center text__bold">{{ homeApp[lang].cartPage.cartField.action }}</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in order.orderDetails">
                                <td class="text-center py-1">
                                    <v-img :src='item.images?.length != 0 ? item.images[0].url : NoImage'
                                        style="height: 100px; width: 100%;">
                                    </v-img>
                                </td>
                                <td class="">
                                    <div>
                                        <v-list>
                                            <v-list-item class="cart__infor__name">{{ item.name }}</v-list-item>
                                            <v-list-item class="cart__infor__weight">{{ item.weight }}g</v-list-item>
                                            <v-list-item class="order__i">{{ item.categoryName }}</v-list-item>
                                        </v-list>
                                    </div>
                                </td>
                                <td class="text-center">{{ formatVND(item.sellPrice) }}</td>
                                <td class="text-center">
                                    {{ item.quantity }}
                                </td>
                                <td class="text-center">{{ formatVND(item.quantity * item.sellPrice) }}</td>
                                <td class="text-center">
                                    <!-- <v-btn prepend-icon="mdi-trash-can-outline" variant="text"
                                        @click="removeFromCart(item.id, index)"></v-btn> -->
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>
<script setup>
import homeApp from '@/i18n/home';
import getcurrentLanguge from '@/util/locale';
import { formatVND } from '@/util/formatVND';
import NoImage from '@/assets/noImage.png'
import { ref } from 'vue';
import { getOrderById, confirm } from '@/services/userService';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isObjectEmpty } from "@/util/uitl"
import orderStatus from '@/stores/orderStatus';
const route = useRoute();
let router = useRouter();
// let tabs = app[getcurrentLanguge()].order.tabs;
const order = ref({});
const lang = ref('en');
const back = () => {
    if (window.history.state.back == null) {
        router.push({ name: "contact" });
        return;
    }
    router.go(-1);
}

onMounted(async () => {
    let id = route.params.id;
    // await tabs.forEach(i => {
    //     status.value.set(i.value, i.status);
    // });

    const url = route.query;
    if (!isObjectEmpty(url)) {
        // console.log(qs.stringify(url)+"aa");
        await confirm(url).then(resp => {
            if (resp.data.code >= 200 && resp.data.code < 300) {
                console.log(resp.data);

            }
        })
    }
    await getOrderById(id).then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            order.value = resp.data.data;
        } else {
            console.log("have error");
        }
    }).catch((err) => {
        console.log(err);
    });
    lang.value = getcurrentLanguge();
})
</script>