<template>
    <v-container fluid>
        <v-sheet class="ma-5 css_cua_thang" elevation="4" :rounded="true">
            <!-- <p>Filter</p> -->
            <VRow class="ma-1 pt-3" elevation="4">
                <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                    <v-text-field v-model.trim="filter.search" :label="app[getcurrentLanguge()].discount.attribute.name"
                        clearable variant="outlined"></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                    <!-- <v-text-field v-model.trim="filter.status" label="Trạng thái" clearable variant="outlined"></v-text-field> -->
                    <v-select v-model="filter.status" :items="opFilter" item-title="name" item-value="value"
                        :label="app[getcurrentLanguge()].discount.attribute.status" variant="outlined"></v-select>
                </v-col>
                <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                    <VueDatePicker v-model="filter.from" locale="vi" :enable-time-picker="false" :teleport="true"
                        :placeholder="app[getcurrentLanguge()].discount.attribute.from"></VueDatePicker>
                </v-col>
                <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                    <VueDatePicker v-model="filter.to" locale="vi" :enable-time-picker="false" :teleport="true"
                        :placeholder="app[getcurrentLanguge()].discount.attribute.to"></VueDatePicker>
                </v-col>
            </VRow>
            <VRow class="ma-1 pb-5 pt-5 justify-center">
                <v-btn color="primary" class="me-5" @click="filters">
                    {{ app[getcurrentLanguge()].btn.find }}
                </v-btn>
                <v-btn variant="outlined" color="primary" @click="reset">
                    {{ app[getcurrentLanguge()].btn.reset }}
                </v-btn>
            </VRow>
        </v-sheet>
        <v-sheet>
            <VRow>
                <v-dialog v-model="dialog" width="1200" persistent>
                    <v-card>
                        <v-card-title>
                            <p class="text-h5 text-center my-5 text-info font-weight-bold">{{ action }}</p>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-form @submit.prevent ref="form" class="form_cua_thang">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="item.name"
                                                :label="app[getcurrentLanguge()].discount.attribute.name"
                                                :rules="nameValidate" variant="outlined"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <VueDatePicker v-model="item.discountStart"
                                                :placeholder="app[getcurrentLanguge()].discount.attribute.from"
                                                :class="{ 'date_start_': cssDate.start }"
                                                @update:model-value="changeStart()">
                                            </VueDatePicker>
                                            <div class="start_message err_ms"> </div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <VueDatePicker v-model="item.discountEnd"
                                                :placeholder="app[getcurrentLanguge()].discount.attribute.to"
                                                :class="{ 'date_start_': cssDate.end }" @update:model-value="changeEnd()">
                                            </VueDatePicker>
                                            <div class="end_message err_ms"></div>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-select v-model="item.discountType"
                                                :label="app[getcurrentLanguge()].discount.attribute.name" :items="op"
                                                :rules="typeValidate" item-title="name" item-value="value"
                                                variant="outlined"></v-select>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="item.discountAmount"
                                                :label="app[getcurrentLanguge()].discount.attribute.amount"
                                                :rules="amountValidate" variant="outlined"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea v-model="item.description"
                                                :label="app[getcurrentLanguge()].discount.attribute.description"
                                                variant="outlined"></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-radio-group v-model="item.status" inline>
                                            <v-radio :label="app[getcurrentLanguge()].discount.status.trueVal"
                                                :value="true"></v-radio>
                                            <v-radio :label="app[getcurrentLanguge()].discount.status.falseVal"
                                                :value="false"></v-radio>
                                        </v-radio-group>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                {{ app[getcurrentLanguge()].btn.cancel }}
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="saveToDb">
                                {{ app[getcurrentLanguge()].btn.confirm }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </VRow>
        </v-sheet>
        <VCard class="ma-5" elevation="4">
            <VRow class="ma-1 mb-0">
                <!-- <h2 class="v-col-12 text-center">Product</h2> -->

                <VCol class="d-flex">
                    <v-btn class="me-auto" color="success" @click="newHandler">{{ app[getcurrentLanguge()].btn.new }}</v-btn>
                </VCol>
            </VRow>
            <VRow class="ma-0">
                <VCol auto>
                    <v-table fixed-header hover density="comfortable" class="custom-table" loading
                        loading-text="Loading... Please wait">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].discount.attribute.id }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].discount.attribute.name }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].discount.attribute.from }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].discount.attribute.to }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].discount.attribute.amount }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].discount.attribute.status }}
                                </th>
                                <th class="text-center">
                                    {{ app[getcurrentLanguge()].discount.attribute.action }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="properties == null || properties?.data?.length == 0">
                                <td colspan="20" class="text-center">
                                    {{ app[getcurrentLanguge()].noData }}
                                </td>
                            </tr>
                            <tr v-else v-for="(item, index) in properties?.data" :key="item.id">
                                <td class="text-center">{{ properties.beginIndex + 1 + index }}</td>
                                <td class="text-center">{{ item.name }}</td>
                                <td class="text-center">{{ formatDate(item.discountStart) }}</td>
                                <td class="text-center">{{ formatDate(item.discountEnd) }}</td>
                                <td class="text-center">
                                    {{ item.discountType == 1 ? Number(item.discountAmount) + " VND" :
                                        Number(item.discountAmount) + " %" }}
                                </td>
                                <td class="text-center">
                                    {{ item.status == 1 && new Date(item.discountEnd) > new Date() ?
                                        app[getcurrentLanguge()].discount.status.trueVal :
                                        (item.status == 0 ? app[getcurrentLanguge()].discount.status.falseVal :
                                            app[getcurrentLanguge()].discount.status.experied) }}
                                </td>
                                <td class="text-center">
                                    <v-btn prepend-icon="mdi-pencil" @click="editItem(item)" color="deep-purple accent-2">
                                        {{ app[getcurrentLanguge()].discount.action.updateBtn }}
                                    </v-btn>
                                    <!-- <v-icon class="btn_icon" size="small" @click="deleteItem(item.id)">
                    mdi-delete
                  </v-icon> -->
                                    <v-btn class="ms-4" prepend-icon="mdi-format-horizontal-align-right"
                                        @click="infor(item.id)" color="info">
                                        {{ app[getcurrentLanguge()].discount.action.detailBtn }}
                                    </v-btn>
                                </td>

                            </tr>
                        </tbody>
                    </v-table>
                </VCol>
            </VRow>
        </VCard>
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
import { ref } from 'vue';
import { getAll, save, update } from '@/services/discountService';
import { onMounted } from 'vue';
import { formatDate } from '@/util/dateformat'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { nextTick } from 'vue';
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
// variable
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

const op = [
    {
        name: "VND",
        value: 1
    },
    {
        name: "%",
        value: 0
    }
];
const cssDate = ref({
    start: false,
    end: false
})
const action = ref(app[getcurrentLanguge()].discount.action.new)
const dialog = ref(false);
const router = useRouter();
const toast = useToast();
const form = ref(null);
let properties = ref(null);
let pageSize = ref(5);
let page = ref(1);
let item = ref({
    name: null,
    description: null,
    discountStart: null,
    discountEnd: null,
    discountType: null,
    discountAmount: null,
    status: false,
});
let defaultItem = ref({
    id: null,
    name: null,
    description: null,
    discountStart: new Date(),
    discountEnd: null,
    discountType: null,
    discountAmount: 0,
    status: false,
})
// validate
const nameValidate = [
    (val) => {
        if (val == null) {
            return app[getcurrentLanguge()].validate.discount.discountNameSize;
        }
        else if (val.length > 1 && val.length < 200) {
            return true;
        }
        else {
            return app[getcurrentLanguge()].validate.discount.discountNameSize;
        }
    }
];

const typeValidate = [
    (val) => {
        if (val || val == 0) return true;
        return app[getcurrentLanguge()].validate.discount.discountTypeNotNull;
    }
];

const amountValidate = [
    (val) => {
        // if (val) return true;
        if (item.value.discountType == null) {
            return app[getcurrentLanguge()].validate.discount.discountAmountNotNull;
        } else {
            if (item.value.discountType == 0) {
                if (val > 0 && val < 100) return true;
                return app[getcurrentLanguge()].validate.discount.discountAmountSize;
            }
            else {
                if (val > 0) return true;
                return app[getcurrentLanguge()].validate.discount.discountAmountSize2;

            }
        }
    }
];
// function
const reset = () => {
    filter.value = {
        search: null,
        status: '',
        from: null,
        to: null,
    };
    getData();
}
const newHandler = () => {
    action.value = app[getcurrentLanguge()].discount.action.new;

    dialog.value = true;
    item.value = Object.assign({}, defaultItem.value);
}
const getData = async () => {
    await getAll(filter, page, pageSize).then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            properties.value = resp.data.data;
            // console.log(properties.value);
        }
    }).catch((err) => {

    });
}
const validate = async () => {
    const { valid } = await form.value.validate()
    return valid;

}

const validateDate = async () => {
    changeEnd();
    changeStart();

}
const changeEnd = () => {
    if (item.value.discountEnd == null) {
        cssDate.value.end = true;
        document.querySelector(".form_cua_thang .end_message").innerHTML = app[getcurrentLanguge()].validate.discount.discountEndNotNull
    } else {
        cssDate.value.end = false;
        document.querySelector(".form_cua_thang .end_message").innerHTML = ''
    }
}

const changeStart = () => {
    if (item.value.discountStart == null) {
        cssDate.value.start = true;
        document.querySelector(".form_cua_thang .start_message").innerHTML = app[getcurrentLanguge()].validate.discount.discountStartNotNull
    } else {
        cssDate.value.start = false;
        document.querySelector(".form_cua_thang .start_message").innerHTML = ''
    }
}
const saveToDb = async () => {
    validateDate();
    const rs = await validate();
    if (!rs || cssDate.value.end || cssDate.value.start) {
        return;
    }
    if (!item.value.id) {
        save(item.value).then((resp) => {
            toast.success(app[getcurrentLanguge()].discount.action.newSuccess);
            getData();
            dialog.value = false;
            item.value = Object.assign({}, defaultItem.value);
        }).catch((err) => {
            console.log(err);
        })
    } else {

        update(item.value).then((resp) => {
            toast.success(app[getcurrentLanguge()].discount.action.updateSuccess);
            getData();
            dialog.value = false;
            item.value = Object.assign({}, defaultItem.value);
        }).catch((err) => {
            console.log(err);
        })
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
const filters = () => {
    getData();
}
const close = () => {
    dialog.value = false;
    item.value = Object.assign({}, item.defaultItem);
}
const editItem = (i) => {
    action.value = app[getcurrentLanguge()].discount.action.update;
    item.value = Object.assign({}, i);
    item.value.discountStart = new Date(i.discountStart);
    item.value.discountEnd = new Date(i.discountEnd);
    item.value.status = i.status;
    dialog.value = true;
    console.log(item.value);
}

const infor = (i) => {
    router.push({ name: 'discount-detail', params: { id: i } })
}
onMounted(() => {
    getData();
})
</script>
<style>
/* btn action */

.btn_icon {
    /* margin-left: 1.5rem; */
    padding: 1.5rem;
}

.btn_icon:hover {
    background-color: lightblue;
}

/* paginate */

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

/*  */
.css_cua_thang .v-input__control {
    height: 38px !important;
}

/* .css_cua_thang .v-field{
    border: 0.5px solid rgb(221,221,221) !important;
} */
/* .css_cua_thang .v-field__outline{
    border: 0.5px solid rgb(221,221,221) !important;

} */
.css_cua_thang .v-field-label {
    top: 16px !important;
}

.css_cua_thang .v-field__field {
    top: -6px;
}

.css_cua_thang .v-field__clearable {
    margin-top: -6px;
}

/* .css_cua_thang .dp__pointer {
    text-align: center;
    border: 0.5px solid rgb(221, 221, 221) !important;
}

.css_cua_thang .dp__pointer:active {
    border: 0.5px solid rgb(175, 58, 58) !important;
} */
.date_start_,
.date_end_ {
    border: 1px solid rgb(176, 0, 32);
    border-radius: 5px;
}

.err_ms {
    line-height: 12px;
    padding: 0px 12px;
    padding-top: 6px;
    font-size: 12px;
    /* color: rgb(176,0,32); */
    transition-duration: 150ms;
    color: #B00020;
}
</style>