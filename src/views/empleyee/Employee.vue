<template>
    <v-sheet class="ma-5" elevation="4" :rounded="true">
        <v-row class="px-4">
            <v-col cols="12" md="6">
                <v-card max-width="400">
                    <v-text-field max-width="400" density="compact" variant="solo" label="Search templates" v-model="filter.search" clearable
                        append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="onClickHandler" @click:clear="clear"></v-text-field>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-end">
                <v-btn @click="newHandler">{{ app[lang].btn.new }} </v-btn>
            </v-col>
        </v-row>
        <h2 class="ms-5 my-5">Danh sách nhân viên</h2>
        <v-row class="ma-5 pb-5" style="width: 100%;" v-if="employees == null || employees?.data?.length == 0">
            {{ app[lang].noData }}
        </v-row>
        <v-row class="ma-5 pb-5" style="width: 100%;">
            <template v-for="(item, index) in employees?.data">
                <v-card class="me-4 mb-4" style="width:30%">
                    <v-card-title>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-img style="width:100%;"
                                    src="https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"
                                    alt="no-imge"></v-img>
                            </v-col>
                            <v-col cols="12" md="6">
                                <p>{{ item.fullname }}</p>
                                <span class="ps-4">
                                    <v-badge :color="item.status ? 'info' : 'error'"
                                        :content="item.status ? 'Hoạt động' : 'Bị khóa'">
                                    </v-badge>
                                </span>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item>SDT: {{ item.phone }} </v-list-item>
                            <v-list-item>Email: {{ item.email }} </v-list-item>
                        </v-list>
                        <v-btn @click="edit(item)" color="info">{{ app[lang].btn.edit }}</v-btn>
                    </v-card-text>
                </v-card>
            </template>
        </v-row>
        <VRow class="mx-0 align-center" v-if="employees?.data?.length != 0">

            <VCol md="4" sm="12" xs="12" class="d-flex justify-end align-end align-md-center">
                <span v-if="employees != null" class="current_page_message">{{
                    (employees?.beginIndex + 1) + "-" + (employees?.endIndex) + " of " +
                    (employees?.totalRecords) }}
                </span>
            </VCol>
            <VCol md="6" sm="12" xs="12">
                <vue-awesome-paginate v-if="employees != null" :total-items="employees.totalRecords || 0"
                    :items-per-page="employees.pageSize || 1" :max-pages-shown="5" v-model="filter.page"
                    :on-click="onClickHandler" />
            </VCol>

        </VRow>
        <v-dialog v-model="dialog" width="1200" persistent>
            <v-card>
                <v-card-title>
                    <p class="text-h5 text-center my-5 text-info font-weight-bold">{{ action }}</p>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form @submit.prevent ref="form" class="form_cua_thang">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="item.username" :label="app[lang].employee.properties.username"
                                        :disabled="item.id != -1" :rules="usernameValidate"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="item.fullname" :label="app[lang].employee.properties.fullname"
                                        :rules="nameValidate" variant="outlined"></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="item.email" :label="app[lang].employee.properties.email"
                                        :rules="emailValidate" variant="outlined"></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" v-if="item.id == -1">
                                    <v-text-field v-model="item.password" :label="app[lang].employee.properties.password"
                                        :rules="passwordValidate" variant="outlined"></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field v-model="item.phone" :label="app[lang].employee.properties.phone"
                                        :rules="phoneValidate" variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="item.birthday" type="date" data-date-format="DD MMMM YYYY"
                                        :label="app[lang].employee.properties.birthday" :rules="birthdayValidate"
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="item.roles" :items="roles.data" multiple
                                        :label="app[lang].employee.properties.role" :rules="roleValidate"
                                        variant="outlined"></v-select>
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
    </v-sheet>
</template>
<script setup>
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
import { ref, onMounted } from 'vue';
import { getEmployees, newEmployee, updateEmployee } from '@/services/employeeService'
import roles from '@/stores/roles';
import { useToast } from 'vue-toastification';
import { formatDateV5 } from '@/util/dateformat';
import { usernamePattern, emailPattern, phonePattern, passwordPattern } from '@/const/validate';
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from '@/const/validate';
const form = ref(null);
const item = ref({

});
const toast = useToast();
const defaultItem = {
    id: -1,
    username: "",
    fullname: "",
    email: "",
    password: "",
    birthday: null,
    phone: "",
    status: true,
    roles: []
}
const filter = ref({
    search: "",
    page: 1,
    size: 6
})
const action = ref("");
const dialog = ref(false);
const lang = ref('en');
const employees = ref(null);
const usernameValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập tên đăng nhập"
    },
    (value) => {
        if (value.match(usernamePattern)) return true;
        return `Username không hợp lệ`
    }
];
const emailValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập email"
    },
    (value) => {
        if (value.match(emailPattern)) return true;
        return `email không hợp lệ`
    }
];

const birthdayValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng chọn ngày sinh"
    }
];

const roleValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng chọn vai trò"
    },
    (value) => {
        if (value.length > 0) return true;
        return "Vui lòng chọn vai trò"
    }
];
const passwordValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập mật khẩu"
    },
    (value) => {
        if (value.match(passwordPattern)) return true;
        return `Mật khẩu không hợp lệ`
    }
];

const phoneValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập số điện thoại"
    },
    (value) => {
        if (value.match(phonePattern)) return true;
        return `Số điện thoại không hợp lệ`
    }
];
const nameValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập họ tên"
    },
    (value) => {
        if (value.length < USERNAME_MIN_LENGTH || value.length > USERNAME_MAX_LENGTH) return `Username không hợp lệ`;
        return true;
    }
];
const onClickHandler = () => {
    getData();
}
const clear = () =>{
    filter.value.search = "";
    getData();
}
const close = () => {
    item.value = Object.assign({}, defaultItem);
    dialog.value = false;
}
const newHandler = () => {
    action.value = app[lang.value].employee.action.new;
    item.value = Object.assign({}, defaultItem);
    dialog.value = true;
}
const saveToDb = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    if (item.value.id == -1) {
        await newEmployee(item.value).then(resp => {
            if (resp.data.code >= 200 && resp.data.code < 300) {
                dialog.value = false;
                item.value = Object.assign({}, defaultItem);
                getData();
                toast.success(app[lang.value].employee.validate.createEmployeeSuccess);
            } else {
                toast.warning(app[lang.value].employee.validate.usernameOrEmailUsed);
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        await updateEmployee(item.value).then(resp => {
            if (resp.data.code >= 200 && resp.data.code < 300) {
                dialog.value = false;
                item.value = Object.assign({}, defaultItem);
                getData();
                toast.success(app[lang.value].employee.validate.updateEmployeeSuccess);

            } else {
                toast.warning(app[lang.value].employee.validate.usernameOrEmailUsed);
            }
        }).catch(err => {
            console.log(err);
        })
    }
}
const edit = (data) => {
    action.value = app[lang.value].employee.action.update;
    item.value = Object.assign({}, data);
    item.value.birthday = formatDateV5(new Date(item.value.birthday));
    dialog.value = true;
}
const getData = async () => {
    await getEmployees(filter.value).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            employees.value = resp.data.data;
        }

    }).catch((err) => {
        console.log(err);
    })
}
onMounted(async () => {
    lang.value = getcurrentLanguge();
    await getData();
})
</script>