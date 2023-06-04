<template>
    <div>
        <v-dialog v-model="props.dialog" width="1200" @click:outside="close" persistent class="shrink">
            <v-expand-transition>
                <v-card>
                    <v-card-title class="product__title">
                        Thông tin sản phẩm
                    </v-card-title>
                    <v-card-text>

                        <v-row class="ma-0">
                            <v-col cols="12" sm="6">
                                <div class="primary__image">
                                    <v-img :src="image?.url || NoImage" alt="image" height="300"></v-img>
                                </div>
                                <div class="second__image d-flex flex-wrap">
                                    <v-card v-for="img in props.item.images" width="100" @click="image = img">
                                        <v-card-text class="pa-1">
                                            <v-img :src="img.url" height="90"></v-img>
                                        </v-card-text>
                                    </v-card>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">

                                <!-- <div class="product__dialog__name">
                                    {{ props.item }}
                                </div> -->
                                <v-list>
                                    <v-list-item>
                                        <div class="product__dialog__name">{{ props.item.name }}</div>
                                    </v-list-item>
                                    <v-list-item>
                                        <div class="product_price">
                                            <span
                                                :class="{ 'price': !equals(props.item.price, props.item.priceSell), 'price__sell': equals(props.item.price, props.item.priceSell) }">{{
                                                    formatVND(props.item.price) }}</span>
                                            <span class="price__sell" style="margin-left: 1rem;"
                                                v-if="!equals(props.item.price, props.item.priceSell)">{{
                                                    formatVND(props.item.priceSell)
                                                }}</span>
                                        </div>
                                    </v-list-item>
                                    <v-list-item>{{ homeApp[getcurrentLanguge()].detailDialog.dimension }} : {{ `${props.item.length} x ${props.item.width} x ${props.item.height} cm` }}</v-list-item>
                                    <v-list-item>{{ homeApp[getcurrentLanguge()].detailDialog.weight }} : {{ `${props.item.weight} gram` }}</v-list-item>
                                    <v-list-item>{{ homeApp[getcurrentLanguge()].detailDialog.description }} : {{ `${props.item.description} ` }}</v-list-item>
                                    <v-list-item></v-list-item>
                                </v-list>
                            </v-col>

                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click.prevent="close">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-expand-transition>
            <!-- <v-card>
                <v-card-title>
                    <p class="text-h5 text-center my-5 text-info font-weight-bold">{{ action }}</p>
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field readonly v-model="props.item.figure" label="Tên mô hình"
                                variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.height" label="Chiều cao" item-title="name"
                                item-value="value" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.weight" label="Chiều rộng"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.material" label="Chất liệu" item-title="name"
                                item-value="value" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.ratio" label="Tỉ lệ"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.recommendedAge" label="Độ tuổi yêu cầu"
                                item-title="name" item-value="value" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.accessoriesIncluded" label="Phụ kiện đi kèm"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.categoryName" label="Danh mục" item-title="name"
                                item-value="value" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.manufacturerName" label="Nhà cung cấp"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.seriesName" label="Seri" item-title="name"
                                item-value="value" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-carousel hide-delimiter-background show-arrows="hover">
                                <v-carousel-item v-for="(i, ind) in props.item.listImage"
                                    :src="`${BASE_URL}products/show?url=${i.url}`" :placeholder="props.item.figure"
                                    style="height: auto;" cover></v-carousel-item>
                               
                            </v-carousel>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-textarea readonly v-model="props.item.description" label="Mô tả" variant="outlined">
                                <template v-slot:prepend>
                                    <span>Mô tả</span>
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click.prevent="close">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card> -->
        </v-dialog>
    </div>
</template>
<script setup>
import NoImage from '@/assets/noImage.png'
import { watch } from 'vue';
import { nextTick, ref } from 'vue'
import { formatVND } from '@/util/formatVND';
import homeApp from '@/i18n/home'
import getcurrentLanguge from '@/util/locale';
const image = ref(null);
const props = defineProps({
    item: {
        type: Object,
        default: {}
    },
    dialog: {
        type: Boolean,
        default: false
    }
});


const equals = (pa1, pa2) => {
    return pa1 == pa2
}
const BASE_URL = '';
const emits = defineEmits({
    closeDialog: null,
});
const close = () => {
    nextTick(() => {
        emits('closeDialog', false);
        // item.value = Object.assign({}, defaultItem.value);

    })

}
watch(() => props.item, (newV) => {
    if (newV.id) {
        image.value = newV.images[0];

    }

})
</script>
<style>
.product__title {
    background-color: rgb(20, 19, 19, 0.8);
    color: aliceblue;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
}

.price {
    text-decoration: line-through;
}

.price__sell {
    overflow-wrap: normal;
    color: red;
    font-weight: bold;
}

.product__dialog__name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
</style>