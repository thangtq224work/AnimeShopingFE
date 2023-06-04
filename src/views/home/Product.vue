<template>
    <v-card class="fill-height">
        <v-card-title class="pa-0">
            <router-link :to="{
                name: 'productDetail', params: {
                    id: props.product.id
                }
            }">
                <v-img :src='props.product.images.length != 0 ? props.product.images[0].url : NoImage' :title="props.product.name"
                    style="height: 430px; width: 100%;" cover=""></v-img>
            </router-link>
        </v-card-title>
        <v-card-text>
            <div class="product_name">
                {{ props.product.name }}
            </div>
            <div class="product_price">
                <span
                    :class="{ 'price': !equals(props.product.price, props.product.priceSell), 'price__sell': equals(props.product.price, props.product.priceSell) }">{{
                        formatVND(props.product.price) }}</span>
                <span class="price__sell" style="margin-left: 1rem;" v-if="!equals(props.product.price, props.product.priceSell)">{{
                    formatVND(props.product.priceSell)
                }}</span>
            </div>
        </v-card-text>
        <v-card-actions class="justify-center flex-wrap">
            <v-btn v-if="props.product.quantity > 0" @click="emits('addToCart',props.product)">{{ homeApp[getcurrentLanguge()].addToCart.name }}</v-btn>
            <p class="homePage__quantity" v-else>{{ homeApp[getcurrentLanguge()].outOfStock }}</p>
            <v-btn @click="emits('detail',props.product)">{{ homeApp[getcurrentLanguge()].detail }}</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
import NoImage from '@/assets/noImage.png'
import { formatVND } from '@/util/formatVND';
import homeApp from '@/i18n/home';
import getcurrentLanguge from '@/util/locale';
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});
const emits = defineEmits({
    addToCart:null,
    detail:null
})

const equals = (pa1, pa2) => {
    return pa1 == pa2
}

</script>
<style>
.homePage__quantity{
    font-weight: bold;
}
</style>