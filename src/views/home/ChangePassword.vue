<template>
    <v-container fluid class="pa-0">
        <div v-if="token" class="register__page  d-flex justify-center align-center" style="height: 100vh;">
            <v-card width="500" class="rounded-lg py-8">
                <v-card-title class="text-center">
                    <p>{{ message }}</p>
                    <router-link :to="lang=='en'?'/login':'/dang-nhap'">{{ messageLogin }}</router-link>
                </v-card-title>
            </v-card>
        </div>
        <div v-else class="register__page d-flex justify-center align-center" style="height: 100vh;">
            <v-card width="500" class="rounded-lg py-8">
                <v-card-title>
                    <p class="register__page__title">{{ homeApp[lang].auth.changePassword }}</p>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" @submit.prevent autocomplete="off">
                        <v-row>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.oldPassword" :label="homeApp[lang].auth.oldPassword"
                                    :rules="oldPasswordValidate" clearable autocomplete="off" variant="underlined" type="password"
                                    id="id"></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.password" :label="homeApp[lang].auth.password"
                                    :rules="passwordValidate" clearable autocomplete="off" variant="underlined" type="password"
                                    id="id2"></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.repassword" :label="homeApp[lang].auth.repassword"
                                    :rules="repasswordValidate" clearable autocomplete="off" variant="underlined" type="password"
                                    id="id3"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-7">
                                <v-btn block color="blue" text-color="black" class="rounded-xl" type="submit"
                                    @click="changePasswordHandler">{{
                                        homeApp[lang].auth.changePassword }}</v-btn>
                            </v-col>
                            <v-col cols="12" class="px-8 d-flex justify-center">
                                <RouterLink :to="{name:'login'}" class="register__page__forget__password me-4">{{ homeApp[lang].auth.login }}</RouterLink>
                                <!-- <v-divider vertical class="border-opacity-75"></v-divider>
                                <RouterLink to="/" class="register__page__forget__password ms-4">Forget password</RouterLink> -->
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>
<script setup>
import getcurrentLanguge from '@/util/locale';
import homeApp from '@/i18n/home'
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { changePassword } from '@/services/authService';
import authStore from '@/stores/auth';
import { setCookie } from '@/util/cookies'
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { emailPattern, phonePattern, usernamePattern, passwordPattern, fullnamePattern } from '@/const/validate';
const toast = useToast();
const route = useRoute();
const router = useRouter();
const auth = authStore();
const registerData = ref({});
const form = ref(null);
const marker = ref(false);
const lang = ref("en");
const token = ref("");
const message = ref("");
const messageLogin = ref("");
const passwordValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.usernameNotNull;
    },
    (value) => {
        if (value.match(passwordPattern)) return true;
        return homeApp[lang.value].auth.validate.usernameInvalid;
    }
];
const oldPasswordValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.passwordNotNull;
    },
    (value) => {
        if (value.match(passwordPattern)) return true;
        return homeApp[lang.value].auth.validate.passwordInvalid;
    }
];

const repasswordValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.repasswordInvalid;
    },
    (value) => {
        if (value == registerData.value.password) return true;
        return homeApp[lang.value].auth.validate.repasswordInvalid;
    },
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

const phoneValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.phoneInvalid;
    },
    (value) => {
        if (value.match(phonePattern)) return true;
        return homeApp[lang.value].auth.validate.phoneInvalid;
    }
];

const fullnameValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.fullnameNotNull;
    },
    (value) => {
        if (value.match(fullnamePattern)) return true;
        return homeApp[lang.value].auth.validate.fullnameInvalid;
    }
];
const changePasswordHandler = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    let username = readCookie('_user');
    registerData.value.username = username || await auth.getUser();
    await changePassword(registerData.value).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            auth.logout();
            registerData.value = {};
            toast.info(homeApp[lang.value].auth.validate.changePasswordSucess)
        }
        else {
            toast.warning(homeApp[lang.value].auth.validate.changePasswordFaild)
        }
    }).catch(err => {
        console.log(err);
    })

}
const forwardToLogin = () =>{
    router.push({path:lang=="en"?"login":"dang-nhap"})
}
onMounted(async () => {
    lang.value = getcurrentLanguge();
    messageLogin.value = lang=='en'?'Login':'Đăng nhập';
    token.value = route.query.token;
    if (!!token.value) {
        await confirm(token.value).then((resp) => {
            if (resp.data.code >= 200 && resp.data.code < 300) {
                message.value = homeApp[lang.value].auth.messageRegisterSuccess;           
            }
            else{
                message.value = homeApp[lang.value].auth.messageRegisterFail;           
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    // console.log(usernamePattern);
    // console.log(emailPattern);
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