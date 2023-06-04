<template>
  <v-card>
    <v-dialog v-model="props.show" persistent scrollable max-width="1000">

      <v-card>
        <v-card-title class="text-center py-3 formTitle">{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent ref="productForm">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model.trim="item.name" :rules="productNameValidate" clearable
                  :label="app[getcurrentLanguge()].product.attribute.name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.length" v-model="item.length" clearable
                  :rules="lengthValidate"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.width" v-model="item.width" clearable
                  :rules="widthValidate"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.height" v-model="item.height" clearable
                  :rules="heightValidate"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.weight" v-model="item.weight" clearable
                  :rules="weightValidate"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.price" v-model="item.price" clearable
                  :rules="priceValidate"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field :label="app[getcurrentLanguge()].product.attribute.priceSell" v-model="item.priceSell"
                  clearable :rules="priceSellValidate"></v-text-field>
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
                  :rules="supplierNotNull"></v-select>
              </v-col>
              <!-- <v-col cols="12" md="6">
                <v-select :label="app[getcurrentLanguge()].product.attribute.properties" multiple v-model="item.properties" item-title="name" item-value="id"
                  clearable :items="properties.value" :rules="propertyNotNull"></v-select>
              </v-col> -->
              <v-col cols="12" md="6">
                <v-radio-group v-model="item.status" inline :rules="statusValidate">
                  <v-radio :label="app[getcurrentLanguge()].product.status.trueVal" :value="true"></v-radio>
                  <v-radio :label="app[getcurrentLanguge()].product.status.falseVal" :value="false"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="item.quantity" clearable :label="app[getcurrentLanguge()].product.attribute.quantity"
                  :rules="quantityValidate"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-file-input v-model="images" clearable :label="app[getcurrentLanguge()].product.attribute.images"
                  prepend-icon="" accept="image/jpg, image/jpeg, image/png" multiple outlined
                  style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" :rules="imagesValidate"></v-file-input>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea clearable :label="app[getcurrentLanguge()].product.attribute.description"
                  v-model="item.description"></v-textarea>
              </v-col>
              <v-col cols="12" md="12" class="d-flex d-wrap">
                <v-row v-if="item?.images && (item.images.length <= fileSize || item.id)">
                  <v-col v-for="(img, indexImage) in item.images" :key="img.id" cols="4" md="2" class="">
                    <v-img :src="createImage(img)" style="height: 100%;" :title="getFileName(img)" cover>
                      <v-badge top left icon="mdi-close" floating style="cursor: pointer;"
                        @click="removeImage(img, indexImage)">
                      </v-badge>
                    </v-img>
                    <!-- </div> -->
                  </v-col>
                  <v-col v-for="(img, indexImage) in images" :key="img.id" cols="4" md="2" class=""
                    v-if="counter <= fileSize">
                    <v-img :src="createImage(img)" style="height: 100%;" :title="getFileName(img)" cover>
                      <v-badge top left icon="mdi-close" floating style="cursor: pointer;"
                        @click="removeImage(img, indexImage)">
                      </v-badge>
                    </v-img>
                    <!-- </div> -->
                  </v-col>
                </v-row>
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
import { computed } from 'vue';
const fileSize = 6;
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
  name: null,
  weight: null,
  height: null,
  length: null,
  quantity:null,
  price: null,
  priceSell: null,
  width: null,
  category: null,
  material: null,
  typeProduct: null,
  supplier: null,
  status: false,
  description: "",
  images: []
});
const images = ref([]);
let item = ref({
})
// valid
const toast = useToast();
const productForm = ref(null);
let productNameValidate = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.productNameNotNull;
  },
  (value) => {
    if (value.length > 2 && value.length < 100) {
      return true
    }
    return app[getcurrentLanguge()].validate.product.productNameSize;

  }
];
const statusValidate = [
  (value) => {
    if (!!value || value == false) return true;
    return app[getcurrentLanguge()].validate.product.statusNotNull;
  }
];
const imagesValidate = [
  (value) => {
    if (item.value.images == null || item.value.images.length == 0) {
      if (value == null || value.length == 0 ) {
        return app[getcurrentLanguge()].validate.product.imageNotNull;
      }
    }

    for (let index = 0; index < value.length; index++) {
      if (!isImage(value[index].name)) {
        images.value.splice(index, 1);
      }
    }
    let counter = images.value.length + item.value.images.length;
    if (counter > 0 && counter <= fileSize) {
      return true;
    }
    return app[getcurrentLanguge()].validate.product.imageSize;
  }
];
const isImage = (file) => {
  return (
    file.endsWith(".jpg") ||
    file.endsWith(".jpeg") ||
    file.endsWith(".png") ||
    file.endsWith(".gif")
  );
}
const removeImage = (img, index) => {
  if (img.url) {
    item.value.images.splice(index, 1);
  } else {
    images.value.splice(index, 1);
  }
}
const lengthValidate = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.lengthNotNull;
  }, (value) => {
    if (isNaN(value)) return app[getcurrentLanguge()].validate.product.lengthSize;
    else if (value > 0) return true;
    return app[getcurrentLanguge()].validate.product.lengthSize;
  },
];
const widthValidate = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.widthNotNull;
  }, (value) => {
    if (isNaN(value)) return app[getcurrentLanguge()].validate.product.widthSize;
    else if (value > 0) return true;
    return app[getcurrentLanguge()].validate.product.widthSize;
  },
];
const heightValidate = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.heightNotNull;
  }, (value) => {
    if (isNaN(value)) return app[getcurrentLanguge()].validate.product.heightSize;
    else if (value > 0) return true;
    return app[getcurrentLanguge()].validate.product.heightSize;
  },
];
const weightValidate = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.weightNotNull;
  }, (value) => {
    if (isNaN(value)) return app[getcurrentLanguge()].validate.product.weightSize;
    else if (value > 0) return true;
    return app[getcurrentLanguge()].validate.product.weightSize;
  },
];
const priceValidate = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.priceNotNull;
  }, (value) => {
    if (isNaN(value)) return app[getcurrentLanguge()].validate.product.priceSize;
    else if (value > 0) return true;
    return app[getcurrentLanguge()].validate.product.priceSize;
  },
];
const priceSellValidate = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.priceSellNotNull;
  }, (value) => {
    if (isNaN(value)) return app[getcurrentLanguge()].validate.product.priceSellSize;
    else if (value > 0) return true;
    return app[getcurrentLanguge()].validate.product.priceSellSize;
  },
]
const categoryNotNull = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.categoryNotNull;
  }
];
const materialNotNull = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.materialNotNull;
  }
];
const supplierNotNull = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.supplierNotNull;
  }
];
const typeProductNotNull = [
  (value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.typeNotNull;
  }
];
const quantityValidate = [
(value) => {
    if (value) return true;
    return app[getcurrentLanguge()].validate.product.quantityNotNull;
  },
  (value) => {
    if (isNaN(value)) {
      return app[getcurrentLanguge()].validate.product.quantitSize;
    }
    if(value < 0){
      return app[getcurrentLanguge()].validate.product.quantitSize;
    }
    return true;
  }
]
// const propertyNotNull = [
//   (value) => {
//     console.log(value);
//     if (value) return true;
//     return "Property must not be null"
//   }, (value) => {
//     if (value.length == 0) return "Property must not be null2";
//     return true;
//   }
// ];
// function
// const emitter = inject('emitter');
const getFileName = computed(() => {
  return (input) => {
    if (!input.url) {
      return input.name;
    }
    return input.url.substring(input.url.lastIndexOf('?url=') + '?url='.length);
  }
})
const counter = computed(() => {
  if (item.value.images) {
    return item.value.images.length + images.value.length;
  }
  return images.value.length;
})
let submit = async () => {
  const { valid } = await productForm.value.validate();
  console.log(item.value);
  if (!valid) {
    return;
  }
  emits('submitForm', item.value,images.value);
  close();
  item.value = Object.assign({}, defaultItem.value);
  images.value = [];
}
const validate = async () => {
  const { valid } = await productForm.value.validate();
  return valid;
}
const createImage = (file) => {
  if (file.url) {
    return file.url;
  }
  return URL.createObjectURL(file);
}
// const checking = (files) => {
//   if (counter.value > fileSize) {
//     images.value = [];
//   }
//   console.log(files);
// }
const close = () => {
  nextTick(() => {
    emits('closeDialog', false);
    item.value = Object.assign({}, defaultItem.value);
    images.value = [];
    formTitle.value = app[getcurrentLanguge()].product.action.new;
  })
}
watch(() => props.editItem, (newvalue, oldvalue) => {
  // newvalue.status = newvalue.status == 1;
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
      // console.log(arg);
      toast.error("Error networking");
    }
  }).catch(([...args]) => {

  })
})
</script>