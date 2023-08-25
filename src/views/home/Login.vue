<template>
    <v-container fluid class="pa-0">
        <div class="login__page d-flex justify-center align-center" style="height: 100vh;">
            <v-card width="500" class="rounded-lg py-8">
                <v-card-title>
                    <p class="login__page__title">{{ homeApp[getcurrentLanguge()].auth.login }}</p>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" @submit.prevent>
                        <v-row>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="loginData.username"
                                    :label="homeApp[getcurrentLanguge()].auth.username" :rules="usernameValidate" clearable
                                    variant="underlined" id="id"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-8">
                                <v-text-field v-model="loginData.password"
                                    :label="homeApp[getcurrentLanguge()].auth.password" :rules="passwordValidate" clearable
                                    :append-inner-icon="!marker ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="marker = !marker" :type="!marker ? 'password' : 'text'"
                                    variant="underlined" id="id2"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-8">
                                <RouterLink :to="{name:'register'}" class="login__page__forget__password">Forget password?</RouterLink>
                            </v-col>
                            <v-col cols="12" class="px-7">
                                <v-btn block color="blue" text-color="black" class="rounded-xl" type="submit" @click="loginHandler">{{
                                    homeApp[getcurrentLanguge()].auth.login }}</v-btn>
                            </v-col>
                            <v-col cols="12" class="px-8 d-flex justify-center">
                                <RouterLink to="/" class="login__page__forget__password me-4">Forget password</RouterLink>
                                <v-divider vertical class="border-opacity-75"></v-divider>
                                <RouterLink to="/" class="login__page__forget__password ms-4">Forget password</RouterLink>
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
import { login } from '@/services/authService';
import authStore from '@/stores/auth';
import { setCookie } from '@/util/cookies'
import { useRoute, useRouter } from 'vue-router';
const toast = useToast();
const route = useRoute();
const router = useRouter();
const auth = authStore();
const loginData = ref({});
const form = ref(null);
const marker = ref(false);
const usernameValidate = [
    (value) => {
        if (value) return true;
        return homeApp[getcurrentLanguge()].auth.validate.usernameNotNull;
    }
];
const passwordValidate = [
    (value) => {
        if (value) return true;
        return homeApp[getcurrentLanguge()].auth.validate.usernameNotNull;
    }
];
const loginHandler = async () => {
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    await login(loginData.value).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            setCookie('access_token', resp.data.data.access_token, resp.data.data.access_token_expired);
            setCookie('refresh_token', resp.data.data.refresh_token, resp.data.data.refresh_token_expired);
            auth.setUser(loginData.value.username,resp.data.data.access_token_expired);
            auth.setUserRole(resp.data.data.role);
            const returnUrl = route.query['returnUrl'];
            router.push({ name: returnUrl ? returnUrl : "Home"})
        }
        else{
            toast.warning(homeApp[getcurrentLanguge()].auth.usernameInvalid)
        }
    }).catch(err => {
        console.log(err);
    })

}
</script>
<style>
.login__page {
    margin: 0;
    background-image: linear-gradient(45deg, rgba(11, 96, 216, 0.4), rgb(233, 13, 97, 0.6));
}

.login__page__title {
    padding: 1rem 0px;
    text-align: center;
    font-weight: bold;
    font-size: 2.25rem;
}

.login__page__forget__password {
    /* font-weight: bold; */
    font-size: 1rem;
    text-decoration: none;
    color: rgb(133, 133, 133, 0.8);
    font-family: 'Roboto', sans-serif;
}

.login__page__forget__password:hover {
    text-decoration: underline;
    color: rgb(133, 133, 133);

}</style>