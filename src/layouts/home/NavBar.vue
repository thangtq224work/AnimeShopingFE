<template>
    <div app  height='200'>
        <v-alert :value="true">
            >ĐỊa chỉ :
        </v-alert>
        <v-row>
            <v-col cols="3">
                <v-toolbar-title class="d-flex justify-center">
                    <v-img class="align-self-center" src="@/assets/download.jpeg" cover width="100"></v-img>
                </v-toolbar-title>
            </v-col>
            <v-col cols="9">
                <v-row class="px-4">
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12" lg="6">
                                <v-list>
                                    <v-list-item class="col-12 col-md-6" width="">
                                        <v-autocomplete item-props density="compact" variant="outlined" :label="homeApp[getcurrentLanguge()].search" :no-data-text="homeApp[getcurrentLanguge()].noData"
                                            append-inner-icon="mdi-magnify" single-line hide-details></v-autocomplete>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                            <v-col cols="12" lg="6">
                                <v-list class="d-flex flex-wrap justify-lg-end align-center">
                                    <div v-for="(item, index) in navData.header">
                                        <v-list-item :prepend-icon="item.icon" id="" :to="item.path" class="menu__item">
                                            <v-list-item-title class="hidden-sm-and-down">
                                                {{ item.name }}
                                            </v-list-item-title>

                                            <v-menu activator="parent" v-if="item.children">
                                                <v-list>
                                                    <v-list-item v-if="isLogin" :title="username" prepend-icon="" ></v-list-item>
                                                    <v-divider v-if="isLogin" thickness="2"></v-divider>
                                                    <div v-for="it in item.children">
                                                        <v-list-item  :title="it.name" v-if="it.requireLogin == isLogin"
                                                        prepend-icon="" :to="it.path"></v-list-item>
                                                    </div>
                                                </v-list>
                                            </v-menu>
                                        </v-list-item>

                                    </div>
                                    <v-list-item id="menu-lang" variant="text" prepend-icon="mdi-web" to="" >
                                        <v-list-item-title class="hidden-sm-and-down" >
                                            {{ homeApp[getcurrentLanguge()].lang }}
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-menu activator="#menu-lang">
                                        <v-list>
                                            <v-list-item v-for="(item, index) in lang" :key="index" :value="index"
                                                @click="changeLocale(item)">
                                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                    <v-btn icon="mdi-format-list-bulleted" variant="text" rounded=""
                                        class="hidden-md-and-up rounded-lg" @click="showMenu = !showMenu">
                                    </v-btn>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-expand-transition>
                <v-col cols="12" class="" v-if="showMenu">
                    <v-list class="d-flex flex-wrap flex-md-row flex-column" bg-color="">
                        <div v-for="(item, index) in navData.content">
                            <v-list-item id="menu-account" :to="item.path" v-if="!item.requireManagerRole || isManager">
                                <v-list-item-title>
                                    {{ item.name }}
                                </v-list-item-title>
                                <!-- <v-menu activator="parent" v-if="item.children">
                                    <v-list>
                                        <v-list-item v-for="it in item.children" :title="it.name" prepend-icon=""
                                        :to="it.path"></v-list-item>
                                    </v-list>
                                </v-menu> -->
                            </v-list-item>
                        </div>
                        <!-- <div v-for='navLink in navData.content' class="hidden-md-and-up">
                            <v-list-group v-if="navLink.children" no-action :key="navLink.name">
                                <template v-slot:activator="{ props }">
                                    <v-list-item v-bind="props" :title="navLink.name" :prepend-icon="navLink.icon"
                                        rounded="xl">
                                    </v-list-item>
                                </template>
                                <v-list-item v-for='sub in navLink.children' :key="sub.name" :title="sub.name"
                                    :value="sub.name" :to="sub.path" rounded="xl" active-color="#3498db" exact>
                                </v-list-item>
                            </v-list-group>
                            <v-list-item v-else :title="navLink.name" :prepend-icon="navLink.icon" :to="navLink.path"
                                :value="navLink.name" rounded="xl" active-color="#3498db" exact></v-list-item>
                        </div> -->
                    </v-list>
                </v-col>
            </v-expand-transition>
        </v-row>
    </div>
</template>
<script setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import navBar from '@/layouts/home/nav'
import getcurrentLanguge from '@/util/locale';
import lang from '@/i18n/lang';
import homeApp from '@/i18n/home';
import { useRouter } from 'vue-router';
import authStore from '@/stores/auth';
import { onMounted } from 'vue';
import roles from '@/stores/roles';
const auth = authStore();
const navData = navBar[getcurrentLanguge()];
const display = useDisplay();
const showMenu = ref(true);
const router = useRouter();
const username = ref(null);
const isManager = ref(false);
const isLogin = ref(false);
const changeLocale = (i) => {
    localStorage.setItem('locale', i.val);
    router.go();
}
const isShow = (reqired)=>{
    if(reqired){
        return isLogin;
    }
    return !isLogin
}
watch(display.width, (newv) => {
    if (newv > 960) {
        showMenu.value = true;
    }
});
onMounted(async() =>{
    username.value = await auth.getUser();
    isManager.value = (await auth.getUserRole()).some(value=>{
        return value == roles.ADMIN || value == roles.USER;
    });
    isLogin.value = auth.isLogin;
})
</script>
<style>

#menu-lang,#menu-account:hover{
    cursor: pointer;
}
.menu__item:hover{
    cursor: pointer;
}
</style>