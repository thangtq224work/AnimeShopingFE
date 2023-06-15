<template>
    <v-container fluid>
        <v-btn color="success" class="ma-5 my-3" @click="router.go(-1)">Quay lại</v-btn>
        <v-card class="ma-5" elevation="4">
            <v-card-title>
                <p class="text-center my-5 text-info font-weight-bold text-h5">
                    {{ app[getcurrentLanguge()].discount.name }}
                </p>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field :model-value="discount.name" readonly :label="app[getcurrentLanguge()].discount.attribute.name"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field
                            :model-value="discount?.discountType == 0 ? discount?.discountAmount + '%' : discount?.discountAmount + ' VND'"
                            readonly :label="app[getcurrentLanguge()].discount.attribute.amount" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field :model-value="formatDate(discount.discountStart)" readonly :label="app[getcurrentLanguge()].discount.attribute.from"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field :model-value="formatDate(discount.discountEnd)" readonly :label="app[getcurrentLanguge()].discount.attribute.to"
                            variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field :model-value="discount.status == 1 && new Date(discount.discountEnd) > new Date() ? app[getcurrentLanguge()].discount.status.trueVal :
                                        (discount.status == 0 ? app[getcurrentLanguge()].discount.status.falseVal : app[getcurrentLanguge()].discount.status.experied)" readonly :label="app[getcurrentLanguge()].discount.attribute.status"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" md="6" sm="12">
                        <v-text-field  readonly label="Tên giảm giá" variant="outlined"></v-text-field>
                    </v-col> -->
                </v-row>
            </v-card-text>
        </v-card>
        <v-card class="ma-5">
            <v-card-title>
                <v-row>
                    <v-col cols="12" md="5">
                        <v-text-field :label="app[getcurrentLanguge()].product.attribute.name" v-model="filter.name" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-select v-model="filter.categories" :label="app[getcurrentLanguge()].property.category.title" :items="categories" item-title="name"
                                    multiple item-value="id" clearable variant="outlined"></v-select>
                    </v-col>
                    <v-col cols="12" md="2" class="d-flex justify-space-evenly align-center ">
                        <v-btn class="align-self-stretch" color="primary" @click="filterHandler" >
                            {{ app[getcurrentLanguge()].btn.find }}
                        </v-btn>
                        <v-btn class="align-self-stretch" color="primary" @click="clear">
                            {{ app[getcurrentLanguge()].btn.reset }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-table fixed-header hover density="comfortable" class="custom-table " loading
                loading-text="Loading... Please wait">
                <thead>
                    <tr>
                        <th class="text-center">
                            {{ app[getcurrentLanguge()].discount.attribute.id }}
                        </th>
                        <th class="text-center">
                            <v-checkbox class="d-inline-flex" @change="checkingAll" v-model="active_check"></v-checkbox>
                        </th>
                        <th class="text-center">
                            {{ app[getcurrentLanguge()].discount.attribute.name }}
                        </th>
                        <th class="text-center">
                            {{ app[getcurrentLanguge()].discount.attribute.id }}
                        </th>
                        <th class="text-center">
                            Nhà cung cấp
                        </th>
                        <th class="text-center">
                            Series
                        </th>
                        <th class="text-center">
                            {{ app[getcurrentLanguge()].discount.attribute.orginalPrice }}
                        </th>
                        <th class="text-center">
                            {{ app[getcurrentLanguge()].discount.attribute.priceSell }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="properties == null || properties?.data?.length == 0">
                        <td colspan="20" class="text-center">
                            {{ app[getcurrentLanguge()].noData }}
                        </td>
                    </tr>
                    <tr v-else v-for="(item, index) in properties?.data" :key="item.name">
                        <td class="text-center">{{ properties.beginIndex + 1 + index }}</td>
                        <td class="text-center" style="text-align: center;">
                            <v-checkbox class="d-inline-flex" @change="checking(item, index)"
                                v-model="item.status"></v-checkbox>
                        </td>
                        <td class="text-center">
                            {{ item.product.figure }}
                        </td>
                        <td class="text-center">
                            {{ item.product.categoryId?.name }}
                        </td>
                        <td class="text-center">
                            {{ item.product.manufacturerID?.username }}
                        </td>
                        <td class="text-center">
                            {{ item.product.seriesID?.name }}
                        </td>
                        <td class="text-center">
                            {{ formatVND(item.product.price) }}
                        </td>
                        <td class="text-center">
                            {{ formatVND(item.product.priceSale) }}
                        </td>
                    </tr>
                </tbody>
            </v-table>
            </v-card-text>
        </v-card>
        <v-sheet v-if="properties != null">
            <VRow class="mx-0 align-center" v-if="properties?.data?.length != 0">
                <VCol md="6" sm="12" xs="12">
                    <vue-awesome-paginate v-if="properties != null" :total-items="properties.totalRecords || 0"
                        :items-per-page="properties.pageSize || 1" :max-pages-shown="5" v-model="page"
                        :on-click="onClickHandler" />
                </VCol>
                <VCol md="4" sm="12" xs="12" class="d-flex align-end align-md-center">
                    <span v-if="properties != null" class="current_page_message">{{
                        (properties?.beginIndex + 1) + "-" + (properties?.endIndex) + " of " +
                        (properties?.totalRecords) }}
                    </span>
                </VCol>
                <VCol md="2" sm="12" xs="12">
                    <!-- <select class="ms-3 custom_select" >
                    <option v-for="item in [10,20,30,50]" :value="item">{{ item }}</option>
              </select> -->
                    <VSelect outlined :items="[5, 10, 20, 30]" @update:model-value="logger" v-model="pageSize" />
                </VCol>

            </VRow>
        </v-sheet>
    </v-container>
</template>
<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { formatDate } from '@/util/dateformat';
import { formatVND } from '@/util/formatVND';
import { nextTick } from 'vue';
import { getDiscountById,getById,removeAll,saveAll,saveProductDiscount,removeProductDiscount,getAllCategory } from '@/services/discountService';
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
const route = useRoute();
const router = useRouter();
const discount = ref({});
const properties = ref(null);
const toast = useToast();
let active_check = ref(false);
let pageSize = ref(5);
let page = ref(1);
const filter = ref({});
const categories = ref([]);
const init = async () => {
    await getById(route.params.id).then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            // console.log(resp.data.data);
            discount.value = resp.data.data;
        } else {
            toast.warning("Có lỗi xảy ra")
        }
    }).catch((err) => {

    })
    await getData();
    await getCategory();
}

const getCategory = async () => {
    await getAllCategory().then((resp) => {
        categories.value = resp.data;
    }).catch((err) => {

    })
}
const getData = async () => {
    // console.log("get data");

    await getDiscountById(route.params.id,filter.value, {
            page: page.value,
            size: pageSize.value
    }).then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            // console.log(resp.data);
            properties.value = resp.data.data;
            getState();
        } else {
        console.log(resp.data);
            toast.warning("Có lỗi xảy ra");
        }

    }).catch((err) => {
        toast.error(`Error : ${err.message}`)
    })
}
const filterHandler = () =>{
    getData();
}
const clear = () =>{
    filter.value = {};
    getData();
}

const checking = async (item, index) => {
    // console.log("checkin");

    // console.log(item, index);
    if (item.status == false || item.status == null) {
        await removeProductDiscount(item).then(
            (resp) => {
                if (resp.data.code >= 200 && resp.data.code < 300) {
                    // console.log(resp.data.data);
                    properties.value.data[index] = resp.data.data;
                    // properties.value.data.splice(index, 1, resp.data.data);
                }
                else {
                    toast.warning("Có lỗi xảy ra")
                }
            }
        ).catch(
            (err) => {
                toast.error("error", err.message);
            }).finally(() => {
                getState();
            });
    }
    else {
        await saveProductDiscount(item).then(
            (resp) => {
                if (resp.data.code >= 200 && resp.data.code < 300) {
                    // console.log();
                    properties.value.data[index] = resp.data.data;
                }
                else {
                    toast.warning("Có lỗi xảy ra")
                }
            }
        ).catch(
            (err) => {
                toast.error("error", err.message);
            }).finally(() => {
                getState();
            });
    }

}
const checkingAll = async () => {
    // console.log("checkingall");
    if (active_check.value) {
        if (confirm("Thêm tất cả sản phẩm vào chương trình giảm giá")) {
            active_check.value = !active_check.value
            await saveAll(properties.value.data).then(
                (resp) => {
                    if (resp.data.code >= 200 && resp.data.code < 300) {
                        properties.value.data = resp.data.data;
                        active_check.value = true;
                    }
                    else {
                        toast.warning("Có lỗi xảy ra")
                    }
                }
            ).catch(
                (err) => {
                    toast.error("error", err.message);
                }).finally(() => {
                    getData();
                });
        }
        else {
            active_check.value = false
        }

    }
    else {
        if (confirm("Loại bỏ tất cả sản phẩm vào chương trình giảm giá")) {
            await removeAll(properties.value.data).then(
                (resp) => {
                    if (resp.data.code >= 200 && resp.data.code < 300) {
                        properties.value.data = resp.data.data;
                        active_check.value = false;
                    }
                    else {
                        toast.warning("Có lỗi xảy ra")
                    }
                }
            ).catch(
                (err) => {
                    toast.error("error", err.message);
                }).finally(() => {
                    getData();
                });;
        }
        else {
            active_check.value = true
        }
    }
}

const onClickHandler = () => {
    getData();
}
const logger = () => {
    nextTick(() => {
        page.value = 1;
        getData();
    })
}
const getState = () => {
    // console.log("get state");

    active_check.value = properties.value.data.every((item, index) => {
        return item.status == true;
    });
}
onMounted(() => {
    init();
})
</script>