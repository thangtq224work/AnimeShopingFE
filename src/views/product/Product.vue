<template>
    <v-sheet class="ma-5 css_cua_thang" elevation="4" :rounded="true">
        <!-- <p>Filter</p> -->
        <VRow class="ma-1 pt-3" elevation="4">
            <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                <v-text-field v-model.trim="filter.search" :label="app[getcurrentLanguge()].product.attribute.name"
                    clearable variant="outlined"></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                <v-select v-model="filter.status" :items="opFilter" item-title="name" item-value="value"
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
    <v-row class="ma-1">
        <VCol class="d-flex">
            <v-btn class="ms-auto" color="primary" prepend-icon="mdi-plus-box-outline" @click="newHandler" rounded="lg">
                {{ app[getcurrentLanguge()].btn.new }}
            </v-btn>
        </VCol>
    </v-row>
    <VCard class="ma-5" elevation="12">
        <VRow class="ma-1 mb-0">
            <h2 class="v-col-12 text-center formTitle">
                {{ app[getcurrentLanguge()].product.title }}
            </h2>
        </VRow>
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
                                {{ app[getcurrentLanguge()].product.attribute.name }}
                            </th>
                            <th class="text-center">
                                {{ app[getcurrentLanguge()].product.attribute.category }}
                            </th>
                            <th class="text-center">
                                {{ app[getcurrentLanguge()].product.attribute.material }}
                            </th>
                            <th class="text-center">
                                {{ app[getcurrentLanguge()].product.attribute.typeProduct }}
                            </th>
                            <th class="text-center">
                                {{ app[getcurrentLanguge()].product.attribute.supplier }}
                            </th>
                            <th class="text-center">
                                {{ app[getcurrentLanguge()].product.attribute.price }}
                            </th>
                            <th class="text-center">
                                {{ app[getcurrentLanguge()].product.attribute.priceSell }}
                            </th>
                            <th class="text-center">
                                {{ app[getcurrentLanguge()].product.attribute.status }}
                            </th>
                            <th class="text-center">
                                {{ app[getcurrentLanguge()].product.attribute.action }}
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="properties == null || properties?.data?.length == 0">
                            <td colspan="20" class="text-center">
                                {{ app[getcurrentLanguge()].noData }}
                            </td>
                        </tr>
                        <tr v-else v-for="( item, index ) in  properties?.data " :key="item.id">
                            <td class="text-center">{{ properties.beginIndex + 1 + index }}</td>
                            <td class="text-center">{{ item.name }}</td>
                            <td class="text-center">{{ item.category?.name }}</td>
                            <td class="text-center">{{ item.material?.name }}</td>
                            <td class="text-center">{{ item.typeProduct?.name }}</td>
                            <td class="text-center">{{ item.supplier?.name }}</td>
                            <td class="text-center">{{ formatVND(item.price) }}</td>
                            <td class="text-center">{{ formatVND(item.priceSell) }}</td>
                            <td class="text-center">{{ item.status == 1 ? app[getcurrentLanguge()].product.status.trueVal
                                : app[getcurrentLanguge()].product.status.falseVal }}</td>
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
    </VCard>
    <v-container v-if="properties != null">
        <VRow class="mx-0 align-center" v-if="properties?.data?.length != 0">
            <VCol cols="12" md="6" sm="12" xs="12">
                <vue-awesome-paginate class="d-flex justify-center" v-if="properties != null"
                    :total-items="properties.totalRecords || 0" :items-per-page="properties.pageSize || 1"
                    :max-pages-shown="5" v-model="page" :on-click="onClickHandler" />
            </VCol>
            <VCol cols="6" md="4" sm="6" class="d-flex justify-end">
                <span v-if="properties != null" class="current_page_message">{{
                    (properties?.beginIndex + 1) + "-" + (properties?.endIndex) + " / " +
                    (properties?.totalRecords) }}
                </span>
            </VCol>
            <VCol cols="6" md="2" sm="6">
                <VSelect outlined :items="[5, 10, 20, 30]" @update:model-value="logger" v-model="pageSize" />
            </VCol>

        </VRow>
    </v-container>
    <v-card>
        <VRow>
            <ProductForm :show="dialog" @close-dialog="dialog = false" @open-dialog="open" @submit-form="saveToDb"
                :edit-item="currentItem" />
        </VRow>
    </v-card>
</template>
<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { getAll, save, update, uploadImage } from '@/services/productService'
import { nextTick } from 'vue';
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
import ProductForm from './ProductForm.vue';
import userStore from '@/stores/auth'
import { formatVND } from '@/util/formatVND'
const stores = userStore();
const page = ref(1);
const dialog = ref(false);
const toast = useToast();
const router = useRouter();
const pageSize = ref(5);
let properties = ref(null);
let currentItem = ref(null)
let filter = ref({
    search: null,
    status: '',
    from: null,
    to: null
});
const opFilter = [
    {
        name: "Tất cả",
        value: ''
    },
    {
        name: "Áp dụng",
        value: 1
    },
    {
        name: "Tạm ngưng",
        value: 0
    }
];
const reset = () => {
    filter.value = Object.assign({}, {
        search: null,
        status: '',
        from: null,
        to: null
    });
    getData(page.value - 1, pageSize.value)
}
const filters = () => {
    getData(page.value - 1, pageSize.value)
}
const onClickHandler = (p) => {
    getData(page.value - 1, pageSize.value)
};
const initialize = () => {
    getData(0, pageSize.value);
}
const getData = (p, ps) => {
    getAll({ 'page': p, 'size': ps }).then((resp) => {
        if (resp.status >= 200 && resp.status < 300) {
            properties.value = resp.data;
        } else {
            toast.error(app[getcurrentLanguge()].networkFaild);
        }
    }).catch((err) => {
        toast.error(app[getcurrentLanguge()].networkFaild);
    })
}
const editItem = (i) => {
    console.log(i);
    currentItem.value = Object.assign({}, JSON.parse(JSON.stringify(i)));
    dialog.value = true;
}
const infor = (id) => {
    router.push({ name: 'product-detail', params: { 'id': id } })
    console.log(id);
}
const newHandler = () => {
    currentItem.value = {};
    dialog.value = true;
}

const saveToDb = async (item, images) => {
    castObject(item)
    item.status = item.status ? 1 : 0;
    if (item.id) {
        console.log(item);
        await update(item).then(resp => {
            if (resp.status >= 200 && resp.status < 300) {

                const index = properties.value.data.findIndex(i => {
                    return i.id == currentItem.value.id;
                })
                properties.value.data[index] = Object.assign({}, resp.data);
                if (images.length > 0) {
                    return uploadImage(resp.data.id, images).then((resp) => {
                        if (resp.status >= 200 && resp.status < 300) {
                            properties.value.data[index].images = resp.data;
                            toast.info(app[getcurrentLanguge()].product.action.updateSuccess);
                            close();
                        } else {
                            toast.error(app[getcurrentLanguge()].product.action.newfaild);
                        }
                    });
                }
                properties.value.data[index] = Object.assign({}, resp.data);
                toast.info(app[getcurrentLanguge()].product.action.updateSuccess);
                close();
            } else {
                toast.error(app[getcurrentLanguge()].product.action.updatefaild);
            }

        }).catch((err) => {
            toast.error(app[getcurrentLanguge()].networkFaild);
        })
    } else {
        await save(item).then((resp) => {
            console.log(resp);
            if (resp.status >= 200 && resp.status < 300) {
                if (images.length > 0) {
                    return uploadImage(resp.data.id, images).then((resp) => {
                        if (resp.status >= 200 && resp.status < 300) {
                            getData(page.value - 1, pageSize.value);
                            toast.info(app[getcurrentLanguge()].product.action.newSuccess);
                            close();
                        } else {
                            toast.error(app[getcurrentLanguge()].product.action.newfaild);
                        }
                    });
                }
                toast.info(app[getcurrentLanguge()].product.action.newSuccess);
                close();
            } else {
                toast.error(app[getcurrentLanguge()].product.action.newfaild);
            }
        }).catch((err) => {
            console.log(err);
            toast.error(app[getcurrentLanguge()].networkFaild);
        })
    }
}
const castObject = (obj) => {
    if (obj.category.id != undefined) {
        obj.category = obj.category.id;
    }
    if (obj.material.id != undefined) {
        obj.material = obj.material.id;
    }
    if (obj.supplier.id != undefined) {
        obj.supplier = obj.supplier.id;
    }
    if (obj.typeProduct.id != undefined) {
        obj.typeProduct = obj.typeProduct.id;
    }
}
const logger = () => {
    nextTick(() => {
        page.value = 1;
        getData(0, pageSize.value)
    })
}
const close = () => {
    console.log(stores.getUser);
    dialog.value = false;
}
const open = () => {
    dialog.value = true;
}
onMounted(() => {
    initialize();
})
</script>
  
  
<style>
.custom-table {
    border-collapse: separate;
    border-spacing: 0 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}

.custom_select {
    min-width: 90px;
    border: 1px solid;
    border-radius: 4px;
}

.btn_icon {
    /* margin-left: 1.5rem; */
    padding: 1.5rem;
}

.btn_icon:hover {
    background-color: lightblue;
}
</style>