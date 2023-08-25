<template>
    <p class="cart__infor my-10 text-center">
        Thông tin khách hàng
    </p>
    <v-divider></v-divider>
    <v-sheet class="mt-10">
        <v-row>
            <v-col cols="12" md="8">
                <v-form @submit.prevent ref="form">
                    <v-row class="mx-8">
                        <v-col cols="12">
                            <v-text-field variant="outlined" :label="homeApp[getcurrentLanguge()].cartPage.userInfor.name" v-model="orderData.name"
                                :rules="nameValidate"></v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field variant="outlined" :label="homeApp[getcurrentLanguge()].cartPage.userInfor.email" v-model="orderData.email"
                                :rules="emailValidate"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field variant="outlined" :label="homeApp[getcurrentLanguge()].cartPage.userInfor.phone" v-model="orderData.phone"
                                :rules="phoneValidate"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field variant="outlined"
                                :label="homeApp[getcurrentLanguge()].cartPage.userInfor.address" v-model="orderData.address1" :suffix="(!province?'':province.ProvinceName) + ', ' + (!district?'':district.DistrictName) + ', ' + (!ward?'':ward.WardName)"
                                :rules="addressValidate"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-select v-model="province" variant="outlined"
                                :label="homeApp[getcurrentLanguge()].cartPage.userInfor.province" :items="provinces" :no-data-text="homeApp[getcurrentLanguge()].noData"
                                item-title="ProvinceName" item-value="ProvinceID" @update:model-value="changeProvince"
                                :rules="provinceValidate" return-object></v-select>
                        </v-col>

                        <v-col cols="4">
                            <v-select v-model="district" variant="outlined" :items="districts" item-title="DistrictName" :no-data-text="homeApp[getcurrentLanguge()].noData"
                                :rules="districtValidate" item-value="DistrictID"
                                :label="homeApp[getcurrentLanguge()].cartPage.userInfor.district"
                                @update:model-value="changeDistrict" return-object></v-select>
                        </v-col>

                        <v-col cols="4">
                            <v-select v-model="ward" variant="outlined" :items="wards" item-title="WardName" :no-data-text="homeApp[getcurrentLanguge()].noData"
                                :rules="wardValidate" item-value="WardCode"
                                :label="homeApp[getcurrentLanguge()].cartPage.userInfor.ward" return-object></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea variant="outlined" rows="3" v-model="orderData.description"
                                :label="homeApp[getcurrentLanguge()].cartPage.userInfor.description"
                                :rules="descriptionValidate"></v-textarea>
                        </v-col>
                        <v-col>
                            <label style="font-weight: bold;">{{
                                homeApp[getcurrentLanguge()].cartPage.userInfor.shippingMethod }} : </label>
                            <v-radio-group v-model="service">
                                <!-- <v-radio label="Giao hàng tận nơi " value="1"></v-radio>
                                <v-label class="ms-10">Giao hàng tận nơi</v-label> -->
                                <v-radio v-for="ship in serviceShipping" :label="ship.short_name"
                                    :value="ship.service_type_id"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="12" md="4">
                <v-table height="370" class="mb-3">
                    <tbody>
                        <tr cols v-if="!props.cart || props.cart.length == 0" class="align__center">
                            <td colspan="100">{{ homeApp[getcurrentLanguge()].noData }}</td>
                        </tr>
                        <tr v-for="(item, index) in props.cart">
                            <td class="text-center py-1">
                                <v-img :src='item.images?.length != 0 ? item.images[0].url : NoImage' :title="item.name"
                                    style="height: 70px; width: 100%;">
                                    <v-badge top right :content="item.quantity" color="info" floating class="ms-10">
                                    </v-badge>
                                </v-img>
                            </td>
                            <td class="">{{ item.name }}</td>
                            <td class="text-center">{{ formatVND(item.priceSell) }}</td>
                        </tr>
                    </tbody>
                </v-table>
                <v-divider thickness="2"></v-divider>
                <v-list>
                    <v-list-item class="cart__infor__product">{{ homeApp[getcurrentLanguge()].cartPage.price }} : {{
                        formatVND(totalPrice || 0) }}</v-list-item>
                    <v-list-item class="cart__infor__product">{{ homeApp[getcurrentLanguge()].cartPage.discount }} : {{
                        formatVND(discount) }} </v-list-item>
                    <v-list-item class="cart__infor__product">{{ homeApp[getcurrentLanguge()].cartPage.shippingFee }} : {{
                        formatVND(shippingFee?.total || 0) }}</v-list-item>
                    <v-divider thickness="2"></v-divider>
                    <v-list-item class="cart__infor__product">{{ homeApp[getcurrentLanguge()].cartPage.totalPrice }} : {{
                        formatVND(totalPrice - discount +
                            (shippingFee?.total || 0))
                    }}</v-list-item>
                </v-list>
                <div class="d-flex ">
                    <v-btn color="success" variant="outlined" class="ms-4" @click="emits('back')">{{
                        homeApp[getcurrentLanguge()].cartPage.btn.back }}</v-btn>
                    <v-btn color="success" variant="outlined" class="ms-auto" @click="confirm">{{
                        homeApp[getcurrentLanguge()].cartPage.btn.confirm }}</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-sheet>
</template>
<script setup>
import { formatVND } from '@/util/formatVND';
import NoImage from '@/assets/noImage.png'
import { ref } from 'vue';
import { onMounted, computed } from 'vue';
import homeApp from '@/i18n/home';
import getcurrentLanguge from '@/util/locale';
import { getProvince, getDistrict, getWard, getService, calculateFee } from '@/services/address'
import { watch } from 'vue';
import { emailPattern, phonePattern } from '@/const/validate'
import { order } from '@/services/orderSerivce';
import { useToast } from 'vue-toastification';
import authStore from '@/stores/auth';
const toast = useToast();
const auth = authStore();
const form = ref(null);
let provinces = ref([]);
let districts = ref([]);
let wards = ref([]);
const province = ref(null);
const district = ref(null);
const ward = ref(null);
const discount = ref(0);
const shippingFee = ref(0);
const serviceShipping = ref([]);
const service = ref(null);
const description = ref(null);
const orderData = ref({});
const props = defineProps({
    cart: {
        type: Object,
        required: false,
        default: null
    }
})

const emits = defineEmits({
    back: null
})
const nameValidate = [
    (value) => {
        if (!value) {
            return homeApp[getcurrentLanguge()].cartPage.userValidate.name;
        } else if (value.length < 5 && value.length > 100) {
            return homeApp[getcurrentLanguge()].cartPage.userValidate.name;
        }
        return true;
    }
];
const emailValidate = [
    (value) => {
        if (value) return true;
        return homeApp[getcurrentLanguge()].cartPage.userValidate.email;
    },
    (value) => {
        if(value.match(emailPattern)){
            return true;
        }
        return homeApp[getcurrentLanguge()].cartPage.userValidate.email
    }
];
const phoneValidate = [
    (value) => {
        if (value) return true;
        return homeApp[getcurrentLanguge()].cartPage.userValidate.phone;
    },
    (value) => {
        
        if(value.match(phonePattern)){
            return true;
        }
        return homeApp[getcurrentLanguge()].cartPage.userValidate.phone
    }
];

const addressValidate = [
    (value) => {
        if (!value) return homeApp[getcurrentLanguge()].cartPage.userValidate.address;
        if (value?.length > 5 && value?.length < 50) {
            return true;
        }
        return homeApp[getcurrentLanguge()].cartPage.userValidate.address;
    }
];

const provinceValidate = [
    (value) => {
        if (value) return true;
        return homeApp[getcurrentLanguge()].cartPage.userValidate.province
    }
];

const districtValidate = [
    (value) => {
        if (value) return true;
        return homeApp[getcurrentLanguge()].cartPage.userValidate.district
    }
];

const wardValidate = [
    (value) => {
        if (value) return true;
        return homeApp[getcurrentLanguge()].cartPage.userValidate.ward
    }
];

const descriptionValidate = [
    (value) => {
        if (!value){
            return true
        };
        if (value.length > 500) {
            return homeApp[getcurrentLanguge()].cartPage.userValidate.description
        }
        return true;
    }
];
const totalPrice = computed(() => {
    return props.cart?.reduce((initVal, value, index, array) => {
        if (value.quantity < 1 || value.quantity > 10) {
            return initVal + 0;
        }
        return initVal + (value.priceSell * value.quantity)
    }, 0);
});

const totalWeight = computed(() => {
    return props.cart?.reduce((initVal, value, index, array) => {
        if (value.quantity < 1 || value.quantity > 10) {
            return initVal + 0;
        }
        return initVal + (value.weight * value.quantity)
    }, 0);
});
const changeProvince = async () => {
    if (province.value != null) {
        district.value = null;
        ward.value = null;
        service.value = null;
        serviceShipping.value = [];
        await getDistrictHandler();
        shippingFee.value = null;
    }
}
const calculateFeeHandler = async () => {

}

const changeDistrict = async () => {
    if (district.value != null) {
        ward.value = null;
        await getWardHandler();
        await getServiceShipping();
        shippingFee.value = null;

    }
}
const getProvinceHandler = async () => {
    await getProvince().then(resp => {
        if (resp.data.code >= 200 || resp.data.code < 300) {
            provinces.value = resp.data.data;
        }
    })
}

const getServiceShipping = async () => {
    await getService(district.value.DistrictID).then(resp => {
        if (resp.data.code >= 200 || resp.data.code < 300) {
            serviceShipping.value = resp.data.data;
            service.value = serviceShipping.value[0].service_type_id;
        }
    })
}

const getDistrictHandler = async () => {
    await getDistrict(province.value.ProvinceID).then(resp => {
        if (resp.data.code >= 200 || resp.data.code < 300) {
            districts.value = resp.data.data;
        }
    })
}

const getWardHandler = async () => {
    await getWard(district.value.DistrictID).then(resp => {
        if (resp.data.code >= 200 || resp.data.code < 300) {
            wards.value = resp.data.data;
        }
    })
}
const confirm = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    orderData.value.userId = await auth.getUser(); 
    orderData.value.shippingFee = shippingFee.value.total;
    orderData.value.address = `${orderData.value.address1} ,${province.value.ProvinceName} ,${district.value.DistrictName}, ${ward.value.WardName}`;
    orderData.value.product = JSON.parse(JSON.stringify(props.cart));
    orderData.value.addressCode = `${province.value.ProvinceID},${district.value.DistrictID},${ward.value.WardCode}`
    console.log(orderData.value);
    await order(orderData.value).then((resp)=>{
        if(resp.data.code >=200 && resp.data.code <300){
            toast.success(homeApp[getcurrentLanguge()].cartPage.orderAction.orderSuccess);
        }else{
            toast.warning(homeApp[getcurrentLanguge()].cartPage.orderAction.orderFaild);
        }
    }).catch(err=>{
        console.log(err);
        toast.error("");
    })
    
}
onMounted(async () => {
    await getProvinceHandler();
})
watch(() => ward.value, async (newV) => {
    if (newV && service.value) {
        await calculateFee({
            wardCode: ward.value.WardCode,
            districtId: district.value.DistrictID,
            weight: totalWeight.value,
            totalPrice: totalPrice.value,
            serviceType: service.value
        }).then(resp => {
            if (resp.data.code >= 200 && resp.data.code < 300) {
                shippingFee.value = resp.data.data;
            }
        })
    }
})

watch(() => service.value, async (newV) => {
    if (newV && ward.value) {
        await calculateFee({
            wardCode: ward.value.WardCode,
            districtId: district.value.DistrictID,
            weight: totalWeight.value,
            totalPrice: totalPrice.value,
            serviceType: newV
        }).then(resp => {
            if (resp.data.code >= 200 && resp.data.code < 300) {
                shippingFee.value = resp.data.data;
            }
        })
    }
})
</script>