<template>
    <p class="cart__infor my-10">
        Bạn đang có {{ props.cart?.length || 0 }} sản phẩm trong giỏ hàng
    </p>
    <v-divider></v-divider>
    <v-row class="mx-0 mb-10">
        <v-col cols="12" md="8">
            <p class="text-center cart__text__title">Giỏ hàng</p>
            <v-sheet>
                <v-form ref="form">
                    <v-table height="550">
                        <thead>
                            <tr>
                                <th class="text-center text__bold">Hình ảnh</th>
                                <th class="text-center text__bold">Sản phẩm</th>
                                <th class="text-center text__bold">Giá</th>
                                <th class="text-center text__bold">Só lượng</th>
                                <th class="text-center text__bold">Tổng tiền</th>
                                <th class="text-center text__bold">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr cols v-if="!props.cart || props.cart.length == 0" class="align__center">
                                <td colspan="100">No data</td>
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
                                    <!-- {{ item.quantity }} -->
                                    <v-text-field v-model="item.quantity" type="number" style="width: 100px;"
                                        @update:model-value="updateQuantity(item.id, item.quantity, index)" min="1" max="10"
                                        :rules="quantityValidation"></v-text-field>
                                    <!-- <input type="number" style="border: 1px solid; width: 80px;padding: 0.5rem;" v-model="item.quantity"> -->
                                </td>
                                <td class="text-center">{{ formatVND(item.quantity * item.priceSell) }}</td>
                                <td class="text-center">
                                    <v-btn prepend-icon="mdi-trash-can-outline" variant="text"
                                        @click="removeFromCart(item.id, index)"></v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-form>
            </v-sheet>
        </v-col>
        <v-col cols="12" md="4">
            <p class="text-center cart__text__title">Thông tin giỏ hàng</p>
            <v-list>
                <v-list-item class="cart__infor__product">Khổi lượng ước tính : {{ total_weight || 0 }}g</v-list-item>
                <v-list-item class="cart__infor__product">Tổng sản phẩm : {{ total_quantity || 0 }}</v-list-item>
                <v-list-item class="cart__infor__product">Tổng tiền hàng : {{ formatVND(total_price || 0)}}</v-list-item>
            </v-list>

            <v-btn color="success" variant="outlined" @click="perchar">Đặt hàng</v-btn>
        </v-col>
    </v-row>
</template>
<script setup>

import cartStore from '@/stores/cart';
import NoImage from '@/assets/noImage.png'
import { formatVND } from '@/util/formatVND';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { QUANTITY_SIZE } from '@/i18n/home'
import homeApp from '@/i18n/home';
import getcurrentLanguge from '@/util/locale';
const form = ref(null);
const store = cartStore();
const cart = ref(null);
const props = defineProps({
    cart: {
        type: Object,
        required: false,
        default: null
    }
});
const emits = defineEmits({
    removeFromCart: null,
    nextWindow: null,
});
const quantityValidation = [
    (value) => {
        if (value) return true;
        return homeApp[getcurrentLanguge()].quantityValidate.quantityNotNull;
    },
    (value) => {
        if (isNaN(value)) return homeApp[getcurrentLanguge()].quantityValidate.quantitySize;
        else if (value <= 0 || value > QUANTITY_SIZE) {
            return homeApp[getcurrentLanguge()].quantityValidate.quantitySize;
        }
        return true;
    },
]
const total_price = computed(() => {
    return props.cart?.reduce((initVal, value, index, array) => {
        if (value.quantity < 1 || value.quantity > 10) {
            return initVal + 0;
        }
        return initVal + (value.priceSell * value.quantity)
    }, 0);
});
const total_weight = computed(() => {
    return props.cart?.reduce((initVal, value, index, array) => {
        if (value.quantity < 1 || value.quantity > 10) {
            return initVal + 0;
        }
        return initVal + (value.weight * value.quantity)
    }, 0);
});
const total_quantity = computed(() => {
    return props.cart?.reduce((initVal, value, index, array) => {
        if (value.quantity < 1 || value.quantity > 10) {
            return initVal + 0;
        }
        return initVal + Number(value.quantity)
    }, 0);
});
const perchar = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    emits('nextWindow');
}
const removeFromCart = (id, index) => {
    store.removeFromCart(id);
    emits('removeFromCart', index);
}
const updateQuantity = (id, quantity, index) => {
    if (quantity <= 10 && quantity >= 1) {
        store.updateQuantity(id, quantity)
    }
}
onMounted(async () => {
    // await getCart(store.getCart).then(resp => {
    //     if (resp.status >= 200 || resp.status < 300) {
    //         cart.value = resp.data;
    //     }
    // });
})
</script>
<style>
.text__bold {
    font-weight: bold !important;
    font-size: 1.25rem;
}

.cart__infor {
    font-weight: bold !important;
    color: red !important;
    font-size: 1.25rem;
}

.align__center {
    font-weight: bold !important;
    font-size: 1.5rem;
    text-align: center;
}

.cart__text__title {
    color: red !important;
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
}

.cart__infor__product {
    font-weight: bold;
}

.cart__infor__name {
    font-weight: bolder;
}

.cart__infor__weight {
    color: #4CAF50;
}
</style>