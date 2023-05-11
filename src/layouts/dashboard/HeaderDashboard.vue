<template>
    <v-app-bar color="" class="dashboard_header" height="65">
        <v-row>
            <v-col>
                <v-icon icon="mdi-format-list-bulleted" class="btn_list ms-5" @click="toggle"></v-icon>
            </v-col>
            <v-col>
                <v-btn id="menu-activator" color="primary">
                    Sibling activator
                </v-btn>

                <v-menu activator="#menu-activator">
                    <v-list>
                        <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="changeLocale(item)">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
    </v-app-bar>
</template>
<script setup>
import { useCounterStore } from '@/stores/showSideBar';
import { useRouter } from 'vue-router';
const store = useCounterStore();
const items = [
    {
        val:'vi',
        title:"Tiếng Việt"
    },
    {
        val:'en',
        title:"English"
    },
    
]
const toggle = () => {
    store.setShow(!store.isShow);
}
const router = useRouter();
const changeLocale = (i) => {
    localStorage.setItem('locale',i.val);
    router.go();
}
</script>
<style scoped>
.btn_list:hover {
    cursor: pointer;
}
</style>