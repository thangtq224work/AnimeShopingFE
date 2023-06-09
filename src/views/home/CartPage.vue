<template>
    <v-container fluid="">
        <v-window v-model="step">
            <v-window-item :value="1">
                <CartComponent :cart="cartData" @remove-from-cart="removeFromCart" @next-window="nextWindow"/>
            </v-window-item>
            <v-window-item :value="2">
                aaaa
                <!-- <CartComponent :cart="cartData" @remove-from-cart="removeFromCart"/> -->
            </v-window-item>
        </v-window>
    </v-container>
</template>
<script setup>
import cartStore from '@/stores/cart';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getCart } from '@/services/homeService'
import homeApp from '@/i18n/home';
import getcurrentLanguge from '@/util/locale';
import CartComponent from './Cart.vue';
const step = ref(1);
const store = cartStore();
const cartData = ref(null);
const removeFromCart = (index) =>{
    cartData.value.splice(index,1);
}
const nextWindow = () =>{
    step.value = 2;
    console.log(cartData.value);
}
onMounted(async () => {
    await getCart(store.getCart).then(resp => {
        if (resp.status >= 200 || resp.status < 300) {
            cartData.value = resp.data;
        }
    });
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
}</style>