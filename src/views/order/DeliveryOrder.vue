<template>
    <v-dialog v-model="props.xacnhan" width="1200" @click:outside="close" persistent no-click-animation>
        <v-card>
            <v-card-title class="order__page__title">
                {{ app[getcurrentLanguge()].order.detailMessage }}
            </v-card-title>
            <v-card-text>
                <div>
                    <v-list>
                        {{ props.order }}
                        <v-list-item>{{ app[getcurrentLanguge()].order.attribute.orderCode }}: {{ props.order.orderCode
                        }}</v-list-item>
                        <v-list-item>{{ app[getcurrentLanguge()].order.attribute.orderBy }}: {{ props.order.clientName
                        }}</v-list-item>
                        <v-list-item>{{ app[getcurrentLanguge()].order.attribute.orderDate }}: {{
                            formatDate(props.order.createAt) }}</v-list-item>
                        <v-list-item>{{ app[getcurrentLanguge()].order.attribute.address }}: {{ props.order.address
                        }}</v-list-item>
                        <v-list-item>{{ app[getcurrentLanguge()].order.attribute.phone }} : {{ props.order.phone
                        }}</v-list-item>
                        <v-list-item>{{ app[getcurrentLanguge()].order.attribute.user }}: {{ props.order.userId
                        }}</v-list-item>
                        <v-list-item>{{ app[getcurrentLanguge()].order.attribute.description }}: {{ props.order.description
                        }}</v-list-item>
                        <v-list-item class="order__money__data">{{ app[getcurrentLanguge()].order.attribute.total }}: {{
                            formatVND(props.order.totalPrice +
                                props.order.shippingFee) }}</v-list-item>
                        <v-list-item class="order__money__data">{{ app[getcurrentLanguge()].order.attribute.serviceFee }}:
                            {{ formatVND(serviceFee
                                | 0) }}</v-list-item>
                    </v-list>
                </div>
                <v-form @submit.prevent ref="form">
                    <v-row class="mx-0">
                        <v-col cols="4" md="3">
                            <v-text-field variant="outlined" v-model.lazy="item.weight" @input="onInput"
                                :label="app[getcurrentLanguge()].order.attribute.product.weight" :rules="weightValidate"
                                :suffix="units.gram.name"></v-text-field>
                        </v-col>

                        <v-col cols="4" md="3">
                            <v-text-field variant="outlined" v-model.lazy="item.length"
                                :label="app[getcurrentLanguge()].order.attribute.product.length" :rules="lengthValidate"
                                :suffix="units.cm.name"></v-text-field>
                        </v-col>

                        <v-col cols="4" md="3">
                            <v-text-field variant="outlined" v-model.lazy="item.width"
                                :label="app[getcurrentLanguge()].order.attribute.product.width" :rules="widthValidate"
                                :suffix="units.cm.name"></v-text-field>
                        </v-col>

                        <v-col cols="4" md="3">
                            <v-text-field variant="outlined" v-model.lazy="item.height"
                                :label="app[getcurrentLanguge()].order.attribute.product.height" :rules="heightValidate"
                                :suffix="units.cm.name"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mx-0">
                        <v-col cols="12">
                            <v-select variant="outlined" :items="requiredNote[getcurrentLanguge()]"
                                v-model="item.requiredNote" :rules="requiredNoteValidate"
                                :label="app[getcurrentLanguge()].order.attribute.product.requireNote" item-title="name"
                                item-value="value"></v-select>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea rows="2" variant="outlined"
                                :label="app[getcurrentLanguge()].order.attribute.product.note" v-model="item.note"
                                :rules="noteValidate">
                            </v-textarea>
                        </v-col>
                        <v-btn class="ms-0" @click="loadServiceFee" color="grey-lighten-1">{{
                            app[getcurrentLanguge()].order.btn.check }}</v-btn>
                    </v-row>
                    <v-card-actions class="justify-end">
                        <v-btn @click="close">
                            {{ app[getcurrentLanguge()].btn.cancel }}
                        </v-btn>
                        <v-btn @click="delivery">
                            {{ app[getcurrentLanguge()].btn.confirm }}
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>
<script setup>
import { nextTick } from 'vue';
import { ref } from 'vue';
import units from '@/const/unit'
import { requiredNote } from '@/const/ghnConfig';
import getcurrentLanguge from '@/util/locale';
import app from '@/i18n/dashboard';
import { formatDate } from '@/util/dateformat';
import { formatVND } from '@/util/formatVND';
import { onMounted } from 'vue';
import { ghnSize } from '@/const/ghnConfig';
import { watch } from 'vue';
import { preview } from '@/services/orderSerivce'
import { computed } from 'vue';
import { watchEffect } from 'vue';
import debounce from '@/util/debounce'
const serviceFee = ref(0);
const form = ref(null);
const props = defineProps({
    xacnhan: {
        type: Boolean,
        required: true
    },
    order: {
        type: Object,
        required: false
    },
    index: {
        type: Number,
        required: false
    }
})
const emits = defineEmits(
    {
        close: null,
        delivery: null
    }
);
const onInput = () => {
    debounce(() => {
        console.log('debug')
    }, 500)
}
const maxWeight = computed(() => {
    return props.order?.orderDetails.reduce((total, it) => {
        return total + (it.quantity * it.weight);
    }, 0)
});
const weightValidate = [
    (value) => {
        if (value) return true
        return app[getcurrentLanguge()].validate.order.weightNotNull
    },
    (value) => {
        if (isNaN(value)) {
            return app[getcurrentLanguge()].validate.order.weightSize(maxWeight.value, ghnSize.weightSize)
        } else if (value > ghnSize.weightSize || value < maxWeight.value) {
            return app[getcurrentLanguge()].validate.order.weightSize(maxWeight.value, ghnSize.weightSize)
        }
        return true
    }
];

const heightValidate = [
    (value) => {
        if (value) return true
        return app[getcurrentLanguge()].validate.order.heightNotNull
    },
    (value) => {
        if (isNaN(value)) {
            return app[getcurrentLanguge()].validate.order.heightSize(ghnSize.lengthSize)
        } else if (value > ghnSize.lengthSize || value < 1) {
            return app[getcurrentLanguge()].validate.order.heightSize(ghnSize.lengthSize)

        }
        return true
    }
];
const widthValidate = [
    (value) => {
        if (value) return true
        return app[getcurrentLanguge()].validate.order.widthNotNull
    },
    (value) => {
        if (isNaN(value)) {
            return app[getcurrentLanguge()].validate.order.widthSize(ghnSize.lengthSize)
        } else if (value > ghnSize.lengthSize || value < 1) {
            return app[getcurrentLanguge()].validate.order.widthSize(ghnSize.lengthSize)
        }
        return true
    }
];
const lengthValidate = [
    (value) => {
        if (value) return true
        return app[getcurrentLanguge()].validate.order.lengthNotNull
    },
    (value) => {
        if (isNaN(value)) {
            return app[getcurrentLanguge()].validate.order.lengthSize(ghnSize.lengthSize)
        } else if (value > ghnSize.lengthSize || value < 1) {
            return app[getcurrentLanguge()].validate.order.lengthSize(ghnSize.lengthSize)
        }
        return true
    }
];
const requiredNoteValidate = [
    (value) => {
        if (value) return true
        return app[getcurrentLanguge()].validate.order.requiredNoteNotNull
    }
];
const noteValidate = [
    (value) => {
        if (!value) {
            return true
        }
        if (value.length > ghnSize.noteSize) {
            return app[getcurrentLanguge()].validate.order.noteSize(ghnSize.noteSize)
        }
        return true;
    }
];
const item = ref({
    width: 0,
    height: 0,
    length: 0,
    weight: 0,
    requiredNote: null,
    note: "",
})
const defaultItem = {
    width: 0,
    height: 0,
    length: 0,
    weight: 0,
    requiredNote: null,
    note: "",
};
const close = () => {
    item.value = Object.assign({}, defaultItem);
    nextTick(() => {
        emits('close');

    })
}

const delivery = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    if (!confirm(app[getcurrentLanguge()].order.confirm)) {
        return;
    }
    let tmp = build(props.order, item.value);
    nextTick(() => {
        emits('delivery', tmp);
        item.value = Object.assign({}, defaultItem);
    })
}

const build = (item, size) => {
    let [province, district, ward] = item.addressCode.split(",");
    let total = (item.totalPrice + item.shippingFee);
    let orderGhn = {
        orderId: item.id,
        clientOrderCode: item.orderCode,
        toName: item.clientName,
        toPhone: item.phone,
        toAddress: item.address,
        toWardCode: ward,
        districtId: district,
        codAmount: total,
        insuranceValue: total,
        width: size.width,
        height: size.height,
        weight: size.weight,
        length: size.length,
        requiredNote: size.requiredNote,
        note: size.note,
        serviceTypeId: 2, // ghn test just accepted serviceTypeId = 2;
        items: item.orderDetails.reduce((arr, i) => {
            arr.push({
                name: i.name,
                quantity: i.quantity,
                price: i.sellPrice
            });
            return arr;
        }, [])
    }
    return orderGhn;
}
const loadServiceFee = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    let tmp = build(props.order, item.value);
    await preview(tmp).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            console.log(resp.data);
            serviceFee.value = resp.data.data.total_fee;
        }
    })
}
// watchEffect(async () => {
//     console.log("ok");
//     if (item.value.height && item.value.height > 0 && item.value.height < ghnSize.lengthSize && item.value.height < ghnSize.lengthSize && item.value.height < ghnSize.lengthSize && item.value.weight && item.value.width && item.value.length && item.value.requiredNote) {

//     }
// })
// onMounted(() => {
//     maxWeight.value =
// })
</script>
<style>
.order__money__data {
    color: red;
    font-weight: bold;
}
</style>