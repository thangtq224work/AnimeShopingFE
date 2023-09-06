<template>
    <v-container fluid class="css_cua_thang_body">
        <v-row class="justify-space-between">
            <v-col cols="6" md="3">
                <h3>
                    {{ homeApp[getcurrentLanguge()].allProduct }}
                </h3>
            </v-col>
            <v-col cols="6" md="4">
                <v-select width="200" v-model="filter.sortBy" :items="homeApp[getcurrentLanguge()].sortBy" item-title="name"
                    item-value="id" return-object @update:model-value="onClickHandler"
                    :no-data-text="homeApp[getcurrentLanguge()].noData" clearable :label="homeApp[getcurrentLanguge()].sort"
                    variant="outlined"></v-select>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="align-center my-2">
            <v-col class="pb-0" cols="12" sm="12" md="2">
                <h3 class="mb-3 d-flex align-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="#909097" class="bi bi-funnel me-4"
                        viewBox="0 0 16 16">
                        <path
                            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                    </svg>
                    {{ homeApp[getcurrentLanguge()].filterDes }}
                </h3>
            </v-col>
            <v-col class="pb-0" cols="6" sm="4" md="3">
                <div class="px-md-6 px-lg-10">
                    <v-select v-model="filter.categories" :items="filterData?.categories" item-title="name" item-value="id"
                        multiple :no-data-text="homeApp[getcurrentLanguge()].noData" clearable
                        @update:model-value="onClickHandler" :label="homeApp[getcurrentLanguge()].filter.category"
                        variant="outlined"></v-select>
                </div>
            </v-col>
            <v-col class="pb-0" cols="6" sm="4" md="3">
                <div class="px-md-6 px-lg-10">
                    <v-select v-model="filter.typeProducts" :items="filterData?.typeProducts" item-title="name"
                        item-value="id" multiple :no-data-text="homeApp[getcurrentLanguge()].noData" clearable
                        @update:model-value="onClickHandler" :label="homeApp[getcurrentLanguge()].filter.type"
                        variant="outlined"></v-select>
                </div>
            </v-col> <v-col class="pb-0" cols="6" sm="4" md="3">
                <div class="px-md-6 px-lg-10">
                    <v-select v-model="filter.materials" :items="filterData?.materials" item-title="name" item-value="id"
                        multiple :no-data-text="homeApp[getcurrentLanguge()].noData" clearable
                        @update:model-value="onClickHandler" :label="homeApp[getcurrentLanguge()].filter.material"
                        variant="outlined"></v-select>
                </div>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mx-10 mt-3">
            <v-col cols="12" md="4" sm="6" lg="3" class="px-7" v-for="(item) in productData?.data">
                <Product :product="item" @add-to-cart="addToCart" @detail="detail" />
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col cols="12">
                <v-sheet>
                    <v-slide-group class="pa-4 row" center-active show-arrows>
                        <v-slide-group-item  v-slot="{ isSelected, toggle }">
                            <v-card class="fill-height me-2" v-for="(item) in productData?.data">
                                <v-card-title class="pa-0">
                                    <router-link :to="{
                                        name: 'productDetail', params: {
                                            id: item.id
                                        }
                                    }">
                                        <v-img :src='item.images.length != 0 ? item.images[0].url : NoImage'
                                            :title="item.name" style="height: 430px; width: 100%;" cover=""></v-img>
                                    </router-link>
                                </v-card-title>
                                <v-card-text>
                                    <div class="product_name">
                                        {{ item.name }}
                                    </div>
                                    <div class="product_price">
                                        <span
                                            :class="{ 'price': !equals(item.price, item.priceSell), 'price__sell': equals(item.price, item.priceSell) }">{{
                                                formatVND(item.price) }}</span>
                                        <span class="price__sell" style="margin-left: 1rem;"
                                            v-if="!equals(item.price, item.priceSell)">{{ formatVND(item.priceSell)
                                            }}</span>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="justify-center flex-wrap">
                                    <v-btn>Thêm vào giỏ hàng</v-btn>
                                    <v-btn>Chi tiết</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-sheet>
            </v-col>
        </v-row> -->
        <v-row class="mx-10 mt-3">
            <v-col cols="12" md="12" sm="12" xs="12">
                <vue-awesome-paginate class="d-flex justify-center" v-if="productData != null && productData?.data.length > 0"
                    :total-items="productData.totalRecords || 0" :items-per-page="productData.pageSize || 1"
                    :max-pages-shown="5" v-model="page" :on-click="onClickHandler" />
            </v-col>
        </v-row>
        <ProductDialog :item="item" :dialog="dialog" @close-dialog="close" />
    </v-container>
</template>
<script setup>
// resolve : https://stackoverflow.com/questions/66419471/vue-3-vite-dynamic-image-src
// v1
import homeApp from '@/i18n/home';
import getcurrentLanguge from '@/util/locale';
import { getFilter, getProduct } from '@/services/homeService';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { onMounted } from 'vue';
import Product from '@/views/home/Product.vue';
import cartStore from '@/stores/cart';
import ProductDialog from '@/views/home/ProductDialog.vue';
import authStore from '@/stores/auth';
import { QUANTITY_SIZE } from '@/const/validate';
// v2 : 
// const imageUrl = new URL('@/assets/noImage.png', import.meta.url).href;
const auth = authStore();
const filterData = ref(null);
const productData = ref(null);
const cart = cartStore();
const toast = useToast();
const dialog = ref(false);
const page = ref(1);
const size = ref(8);
const item = ref(null);
const filter = ref({
    categories: null,
    typeProducts: null,
    materials: null
});
const close = (val) => {
    dialog.value = false;
    item.value = Object.assign({}, null);
}
const getFilterData = async () => {
    await getFilter().then(resp => {
        filterData.value = resp.data;
    }).catch((err) => {
    })
}
const getProductData = async () => {
    await getProduct(filter.value, page.value, size.value).then(resp => {
        productData.value = resp.data;
        if (productData.value.totalPages < 2) {
            page.value = 1;
        }
    }).catch((err) => {
    })
}
const onClickHandler = async () => {
    await getProductData();
}
const addToCart = (it) => {
    // console.log(it);
    const index = cart.getIndexOfProductInCart(it.id);
    if (index >= 0) {
        // let quantity = cart.getCart[index].quantity;
        if (cart.getCart[index].quantity >= QUANTITY_SIZE) {
            toast.warning(homeApp[getcurrentLanguge()].cartAlert.addToCartFaild);
            return;
        }
    }
    cart.addToCart(it, 1);
    toast.success(homeApp[getcurrentLanguge()].cartAlert.addToCartSuccess);
}
const detail = (id) => {
    item.value = id;
    dialog.value = true;
}
onMounted(async () => {
    await getFilterData();
    await getProductData();
})
</script>
<style>
.css_cua_thang_body .product_name {
    text-align: center;
    margin-top: 1rem;
    /* color: red; */
    font-family: 'Roboto', sans-serif;
    font-size: 1.4rem;
}

.css_cua_thang_body .product_price {
    text-align: center;
    margin-top: 1rem;
}

.css_cua_thang_body .price {
    text-decoration: line-through;
}

.css_cua_thang_body .price__sell {
    overflow-wrap: normal;
    color: red;
    font-weight: bold;
}
</style>