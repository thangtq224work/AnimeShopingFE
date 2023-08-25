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
                    <p class="register__page__title">{{ homeApp[lang].auth.register }}</p>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" @submit.prevent autocomplete="off">
                        <v-row>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.username" :label="homeApp[lang].auth.username"
                                    :rules="usernameValidate" clearable autocomplete="off" variant="underlined"
                                    id="id"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.fullname" :label="homeApp[lang].auth.fullname"
                                    :rules="fullnameValidate" clearable autocomplete="off" variant="underlined"
                                    id="id2"></v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.email" :label="homeApp[lang].auth.email"
                                    :rules="emailValidate" clearable autocomplete="off" variant="underlined"
                                    id="id3"></v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.phone" :label="homeApp[lang].auth.phone"
                                    :rules="phoneValidate" clearable autocomplete="off" variant="underlined"
                                    id="id4"></v-text-field>
                            </v-col>

                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.password" :label="homeApp[lang].auth.password"
                                    :rules="passwordValidate" clearable autocomplete="off"
                                    :append-inner-icon="!marker ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="marker = !marker" :type="!marker ? 'password' : 'text'"
                                    variant="underlined" id="id5"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="registerData.repassword" :label="homeApp[lang].auth.repassword"
                                    :rules="repasswordValidate" clearable autocomplete="off"
                                    :append-inner-icon="!marker ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="marker = !marker" :type="!marker ? 'password' : 'text'"
                                    variant="underlined" id="id6"></v-text-field>
                            </v-col>
                            <!-- <v-col cols="12" class="px-8">
                                <RouterLink to="/" class="register__page__forget__password">Forget password?</RouterLink>
                            </v-col> -->
                            <v-col cols="12" class="px-7">
                                <v-btn block color="blue" text-color="black" class="rounded-xl" type="submit"
                                    @click="registerHandler">{{
                                        homeApp[lang].auth.register }}</v-btn>
                            </v-col>
                            <!-- <v-col cols="12" class="px-8 d-flex justify-center">
                                <RouterLink to="/" class="register__page__forget__password me-4">Forget password</RouterLink>
                                <v-divider vertical class="border-opacity-75"></v-divider>
                                <RouterLink to="/" class="register__page__forget__password ms-4">Forget password</RouterLink>
                            </v-col> -->
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
import { register, confirm } from '@/services/authService';
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
const usernameValidate = [
    (value) => {
        if (value) return true;
        return homeApp[lang.value].auth.validate.usernameNotNull;
    },
    (value) => {
        if (value.match(usernamePattern)) return true;
        return homeApp[lang.value].auth.validate.usernameInvalid;
    }
];
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
const registerHandler = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    registerData.value.url = window.location.href + "/confirm";
    console.log(homeApp[lang.value].auth.validate.registerSuccess);
    console.log(registerData.value);
    console.log(lang.value);

    console.log(homeApp[lang.value].auth.validate.usernameOrEmailUsed);
    await register(registerData.value).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            auth.logout();
            registerData.value = {};
            toast.info(homeApp[lang.value].auth.validate.registerSuccess)
        }
        else {
            toast.warning(homeApp[lang.value].auth.validate.usernameOrEmailUsed)
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