<template>
  <v-card>
    <v-dialog v-model="props.show" persistent scrollable max-width="1000">

      <v-card>
        <v-card-title class="text-center py-3 formTitle">{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent ref="form">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model.trim="item.name" :rules="productNameValidate"
                  :label="app[getcurrentLanguge()].product.attribute.name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.length" v-model="item.length" clearable
                  :rules="lengthValidate"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.width" v-model="item.width" clearable
                  :rules="ratioNotNull"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.height" v-model="item.height" clearable
                  :rules="ratioNotNull"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.weight" v-model="item.weight" clearable
                  :rules="ratioNotNull"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.price" v-model="item.price" clearable
                  :rules="ratioNotNull"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.priceSell" v-model="item.priceSell"
                  clearable :rules="ratioNotNull"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :label="app[getcurrentLanguge()].product.attribute.category" v-model="item.category"
                  item-title="name" item-value="id" :items="categories.value" clearable
                  :rules="categoryNotNull"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :label="app[getcurrentLanguge()].product.attribute.material" v-model="item.material"
                  item-title="name" item-value="id" :items="materials.value" clearable
                  :rules="materialNotNull"></v-select>
                <!-- return-object -->
              </v-col>
              <v-col cols="12" md="6">
                <v-select :label="app[getcurrentLanguge()].product.attribute.typeProduct" v-model="item.typeProduct"
                  item-title="name" item-value="id" :items="types.value" clearable :rules="typeProductNotNull"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :label="app[getcurrentLanguge()].product.attribute.supplier" v-model="item.supplier"
                  item-title="name" item-value="id" :items="suppliers.value" clearable
                  :rules="typeProductNotNull"></v-select>
              </v-col>
              <!-- <v-col cols="12" md="6">
                <v-select :label="app[getcurrentLanguge()].product.attribute.properties" multiple v-model="item.properties" item-title="name" item-value="id"
                  clearable :items="properties.value" :rules="propertyNotNull"></v-select>
              </v-col> -->
              <v-col cols="12" md="12">
                <v-radio-group v-model="item.status" inline>
                  <v-radio :label="app[getcurrentLanguge()].product.status.trueVal" :value="true"></v-radio>
                  <v-radio :label="app[getcurrentLanguge()].product.status.falseVal" :value="false"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea clearable :label="app[getcurrentLanguge()].product.attribute.description"
                  v-model="item.description"></v-textarea>
              </v-col>
            </v-row>
          </v-form>
          <!-- <v-card-actions>
          </v-card-actions> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
              {{ app[getcurrentLanguge()].btn.cancel }}
            </v-btn>
            <!-- <v-btn color="blue-darken-1" variant="text" @click="saveToDb">
              Save
            </v-btn> -->
            <v-btn type="submit" @click="submit">
              {{ app[getcurrentLanguge()].btn.confirm }}
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script setup>
import { inject, ref } from 'vue';
import { getAllCategory } from '@/services/categoryService';
import { getAllMaterial } from '@/services/materialSerivice';
// import { getAllProperty } from '@/services/propertyService';
import { getAllSupplier } from '@/services/supplierService';
import { getAllType } from '@/services/typeService';
import { onMounted } from 'vue';
import { nextTick } from 'vue';
import { watch } from 'vue';
import { useToast } from 'vue-toastification';
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
// props and emits
const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  editItem: {
    type: Object,
    required: false,
    default: null
  }
});
const emits = defineEmits({
  closeDialog: null,
  openDialog: null,
  submitForm: null
});
// properties
let materials = [];
let categories = [];
let suppliers = [];
let types = [];
let properties = [];

//
const formTitle = ref(app[getcurrentLanguge()].product.action.new);
// item
let defaultItem = ref({
  id: null,
  name: "",
  weight: null,
  height: null,
  length: null,
  price: null,
  priceSell: null,
  width: null,
  category: null,
  material: null,
  typeProduct: null,
  supplier: null,
  status: false,
  description: "",
});
let item = ref({
})
// valid
const toast = useToast();
const form = ref(null);
let productNameValidate = [
  (value) => {
    if (value) return true;
    return "Name product must not be null"
  },
  (value) => {
    if (value.length > 1 && value.length < 100) {
      return true
    }
    return "Name product must be at least 3 characters and largest 100 characters.";
  }
];
const lengthValidate = [
  (value) => {
    if (value) return true;
    return "Name product must not be null"
  }, (value) => {
    if (isNaN(value)) return "Name product must not be null";
    else if(value > 0) return true;
    return "Name product must not be null";
  },
]
const categoryNotNull = [
  (value) => {
    if (value) return true;
    return "Category must not be null"
  }
];
const materialNotNull = [
  (value) => {
    if (value) return true;
    return "Material must not be null"
  }
];
const ratioNotNull = [
  (value) => {
    if (value) return true;
    return "Ratio must not be null"
  }
];
const typeProductNotNull = [
  (value) => {
    if (value) return true;
    return "Type product must not be null"
  }
];
const propertyNotNull = [
  (value) => {
    console.log(value);
    if (value) return true;
    return "Property must not be null"
  }, (value) => {
    if (value.length == 0) return "Property must not be null2";
    return true;
  }
];
// function
const emitter = inject('emitter');
let submit = async () => {
  const valid = await validate();
  if (!valid) {
    return;
  }
  emits('submitForm', item.value);
  close();
  item.value = Object.assign({}, defaultItem.value);
}
const validate = async () => {
  const { valid } = await form.value.validate();
  console.log(valid);
  return valid;
}
const close = () => {
  nextTick(() => {
    emits('closeDialog', false);
    item.value = Object.assign({}, defaultItem.value);
    formTitle.value = app[getcurrentLanguge()].product.action.new;
  })
}
watch(() => props.editItem, (newvalue, oldvalue) => {
  newvalue.status = newvalue.status == 1;
  if (newvalue.id) {
    formTitle.value = app[getcurrentLanguge()].product.action.update;
    item.value = Object.assign({}, newvalue);
  }
  else {
    formTitle.value = app[getcurrentLanguge()].product.action.new;
    item.value = Object.assign({}, defaultItem.value);
  }
})
onMounted(async () => {
  let isSuccess = true;
  let initDataPromies = [
    getAllCategory().then(resp => {
      categories.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    }),
    getAllMaterial().then(resp => {
      materials.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    }),
    getAllSupplier().then(resp => {
      suppliers.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    }),
    getAllType().then(resp => {
      types.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    })];
  Promise.all(initDataPromies).then(([...arg]) => {
    if (!isSuccess) {
      console.log(arg);
      toast.error("Error networking");
    }
  }).catch(([...args]) => {

  })
})
</script>