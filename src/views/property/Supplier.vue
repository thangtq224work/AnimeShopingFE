<template>
  <VCard class="ma-5" elevation="12">
    <VRow class="ma-1 mb-0">
      <h2 class="v-col-12 text-center formTitle">{{ app[getcurrentLanguge()].property.supplier.title }}</h2>

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
                #
              </th>
              <th class="text-center">
                {{ app[getcurrentLanguge()].property.supplier.attribute.name }}
              </th>
              <th class="text-center">
                {{ app[getcurrentLanguge()].property.supplier.attribute.action }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="properties == null || properties?.data?.length == 0">
              <td colspan="3" class="text-center">{{ app[getcurrentLanguge()].noData }}</td>
            </tr>
            <tr v-else v-for="(item, index) in properties?.data" :key="item.name">
              <td class="text-center">{{ properties.beginIndex + 1 + index }}</td>
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">
                <v-icon class="btn_icon" size="small" @click="editItem(item.id)" title="edit">
                  mdi-pencil
                </v-icon>
                <!-- <v-icon class="btn_icon" size="small" @click="deleteItem(item.id)">
                  mdi-delete
                </v-icon> -->
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
    <VRow class="row mx-0 align-center" v-if="properties?.data?.length != 0">
      <VCol md="6" sm="12" xs="12">
        <vue-awesome-paginate v-if="properties?.data?.length != 0" :total-items="properties?.totalRecords || 0"
          :items-per-page="properties?.pageSize || 1" :max-pages-shown="5" v-model="page" :on-click="onClickHandler" />
      </VCol>
      <VCol md="4" sm="6" xs="6" class="d-flex align-center">
        <span v-if="properties != null" class="current_page_message ms-auto me-5">{{
          (properties?.beginIndex + 1) + "-" + (properties?.endIndex) + " / " +
          (properties?.totalRecords) }}
        </span>
      </VCol>
      <VCol md="2" sm="6" xs="6">
        <!-- <select class="ms-3 custom_select" >
                  <option v-for="item in [10,20,30,50]" :value="item">{{ item }}</option>
            </select> -->
        <VSelect outlined :items="[3, 5, 7, 50]" @update:model-value="logger" v-model="pageSize" />
      </VCol>

    </VRow>
  </v-container>

  <!-- dialog -->
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5 formTitle">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="currentItem.name"
                :label="app[getcurrentLanguge()].property.supplier.attribute.name"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click=" close ">
          {{ app[getcurrentLanguge()].btn.cancel }}
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click=" saveToDb ">
          {{ app[getcurrentLanguge()].btn.confirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getAll, save, update } from '@/services/supplierService'
import { nextTick } from 'vue';
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
let page = ref(1);
const dialog = ref(false);
const toast = useToast();
const router = useRouter();
let pageSize = ref(3);
let properties = ref(null);
let formTitle = ref('');
let currentItem = ref({
  id: "",
  name: ""
})
let defaultItem = {
  id: "",
  name: ""
};
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
const editItem = (id) => {
  const item = properties.value.data.find((i) => {
    return i.id == id;
  });
  currentItem.value = Object.assign({}, item);
  formTitle.value = app[getcurrentLanguge()].property.supplier.action.update;
  dialog.value = true;
}
const infor = (id) => {
  router.push({ path: 'category' })
  console.log(id);
}
const newHandler = () => {
  formTitle.value = app[getcurrentLanguge()].property.supplier.action.update;
  dialog.value = true;
}


const saveToDb = async () => {
  if (currentItem.value.id) {
    await update(currentItem.value).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        const index = properties.value.data.findIndex(i => {
          return i.id == currentItem.value.id;
        })
        properties.value.data[index] = Object.assign({}, resp.data);
        toast.info(app[getcurrentLanguge()].property.supplier.action.updateSuccess);
        close();
      } else {
        toast.error(app[getcurrentLanguge()].property.supplier.action.updatefaild);
      }
    }).catch((err) => {
      toast.error(app[getcurrentLanguge()].networkFaild);
    })
  } else {
    await save(currentItem.value).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        getData(page.value - 1, pageSize.value);
        toast.info(app[getcurrentLanguge()].property.supplier.action.newSuccess);
        close();
      } else {
        toast.error(app[getcurrentLanguge()].property.supplier.action.newFaild);
      }
    }).catch((err) => {
      toast.error(app[getcurrentLanguge()].networkFaild);
    })
  }
}
const edit = () => {
  console.log("save to database : ", obj);
  close();
}
const logger = () => {
  nextTick(() => {
    page.value = 1;
    console.log(pageSize.value);
    getData(0, pageSize.value)
  })
}
const close = () => {
  dialog.value = false;
  nextTick(() => {
    currentItem.value = Object.assign({}, defaultItem.value);
  })
}
// watch(page, (oldpage, newPage) => {
//   console.log(oldpage, newPage);
// });

// watch(pageSize, (oldpage, newPage) => {
//   console.log(newPage);
//   console.log(oldpage);
// })
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