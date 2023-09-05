<template>
    <v-container fluid class="pa-0">
        <div v-if="!token" class="register__page  d-flex justify-center align-center" style="height: 100vh;">
            <v-card width="500" class="rounded-lg py-8">
                <v-card-title class="text-center">
                    <p>{{ homeApp[lang].auth.forgetPassword }}</p>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form1" @submit.prevent autocomplete="off">
                        <v-row>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="forgetData.email" :label="homeApp[lang].auth.email"
                                    :rules="emailValidate" clearable autocomplete="off" variant="underlined"
                                    id="id3"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-7">
                                <v-btn block color="blue" text-color="black" class="rounded-xl" type="submit"
                                    @click="forgetPasswordHandler">{{
                                        homeApp[lang].auth.forgetPassword }}</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
        <div v-else class="register__page d-flex justify-center align-center" style="height: 100vh;">
            <v-card v-if="!message" width="500" class="rounded-lg py-8">
                <v-card-title>
                    <p class="register__page__title">{{ homeApp[lang].auth.forgetPassword }}</p>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" @submit.prevent autocomplete="off">
                        <v-row>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="forgetConfirmData.newPassword" :label="homeApp[lang].auth.password"
                                    :rules="passwordValidate" clearable autocomplete="off"
                                    :append-inner-icon="!marker ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="marker = !marker" :type="!marker ? 'password' : 'text'"
                                    variant="underlined" id="id5"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="forgetConfirmData.confirm" :label="homeApp[lang].auth.repassword"
                                    :rules="repasswordValidate" clearable autocomplete="off"
                                    :append-inner-icon="!marker ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="marker = !marker" :type="!marker ? 'password' : 'text'"
                                    variant="underlined" id="id6"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-7">
                                <v-btn block color="blue" text-color="black" class="rounded-xl" type="submit"
                                    @click="confirmHandler">{{
                                        homeApp[lang].auth.confirm }}</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
            <v-card v-else width="500" class="rounded-lg py-8">
                <v-card-title class="text-center">
                    <p>{{ message }}</p>
                    <router-link :to="lang=='en'?'/login':'/dang-nhap'">{{ messageLogin }}</router-link>
                </v-card-title>
            </v-card>
        </div>
    </v-container>
</template>
<script setup>
import getcurrentLanguge from '@/util/locale';
import homeApp from '@/i18n/home'
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { forgetPassword, forgetPasswordConfirm } from '@/services/authService';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { passwordPattern,emailPattern } from '@/const/validate';
const toast = useToast();
const route = useRoute();
const router = useRouter();
const forgetData = ref({});
const forgetConfirmData = ref({});
const form = ref(null);
const form1 = ref(null);
const marker = ref(false);
const lang = ref("en");
const token = ref("");
const message = ref(null);
const messageLogin = ref("Login");
const passwordValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.passwordNotNull;
    },
    (value) => {
        if (value.match(passwordPattern)) return true;
        return homeApp[lang.value].auth.validate.passwordInvalid;
    }
];

const emailValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.emailInvalid;
    },
    (value) => {
        if (value.match(emailPattern)) return true;
        return homeApp[lang.value].auth.validate.emailInvalid;
    },
];

const repasswordValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.repasswordInvalid;
    },
    (value) => {
        if (value == forgetConfirmData.value.newPassword) return true;
        return homeApp[lang.value].auth.validate.repasswordInvalid;
    },
];
const forgetPasswordHandler = async () => {
    const { valid } = await form1.value.validate();
    if (!valid) return;
    forgetData.value.url = window.location.href;
    await forgetPassword(forgetData.value).then((resp) => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            forgetData.value = {};
            toast.info(homeApp[lang.value].auth.validate.forgetSuccess);
        } else {
            toast.warning(homeApp[lang.value].auth.validate.emailNotFoundOrLocked);
        }
    }).catch((err) => {
        console.log(err);
    })
}
const confirmHandler = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    forgetConfirmData.value.token = token.value;
    await forgetPasswordConfirm(forgetConfirmData.value).then(resp=>{
        if (resp.data.code >= 200 && resp.data.code < 300) {
            forgetConfirmData.value = {};
            // toast.info(homeApp[lang.value].auth.validate.forgetSuccess);
            message.value = homeApp[lang.value].auth.messageConfirmSuccess;
            
        } else {
            message.value = homeApp[lang.value].auth.messageRegisterFail;
        }
    }).catch((err)=>{
        console.log(err);
    })


}
const forwardToLogin = () => {
    router.push({ path: lang == "en" ? "login" : "dang-nhap" })
}
onMounted(async () => {
    lang.value = getcurrentLanguge();
    messageLogin.value = lang == 'en' ? 'Login' : 'Đăng nhập';
    token.value = route.query.token;
    if (!!token.value) {
        console.log("aaaaa");
    }
})
</script>
<style>
.register__page {
    margin: 0;
    background-image: linear-gradient(45deg, rgba(11, 96, 216, 0.4), rgb(233, 13, 97, 0.6));
}

.register__page__title {
    padding: 1rem 0px;
    text-align: center;
    font-weight: bold;
    font-size: 2.25rem;
}

.register__page__forget__password {
    /* font-weight: bold; */
    font-size: 1rem;
    text-decoration: none;
    color: rgb(133, 133, 133, 0.8);
    font-family: 'Roboto', sans-serif;
}

.register__page__forget__password:hover {
    text-decoration: underline;
    color: rgb(133, 133, 133);

}
</style>