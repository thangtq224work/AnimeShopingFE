<template>
    <v-app-bar color="" class="dashboard_header" height="65">
        <v-row>
            <v-col>
                <v-icon icon="mdi-format-list-bulleted" class="btn_list ms-5" @click="toggle"></v-icon>
            </v-col>
            <v-col>
                <v-btn id="menu-activator" color="primary" variant="outlined">
                    {{ app[getcurrentLanguge()].lang }}
                </v-btn>

                <v-menu activator="#menu-activator">
                    <v-list>
                        <v-list-item v-for="(item, index) in lang" :key="index" :value="index" @click="changeLocale(item)">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
    </v-app-bar>
</template>
<script setup>
import { useRouter } from 'vue-router';
import app from '@/i18n/dashboard';
import getcurrentLanguge from '@/util/locale';
import lang from '@/i18n/lang';
// const items = [
//     {
//         val: 'vi',
//         title: "Tiếng Việt"
//     },
//     {
//         val: 'en',
//         title: "English"
//     },

// ];
const props = defineProps({
    drawer: {
        type: Boolean,
        required: false,
        default: false
    }
});

const emits = defineEmits({
    toggle:null
})
const toggle = () => {
    emits('toggle');
}
const router = useRouter();
const changeLocale = (i) => {
    localStorage.setItem('locale', i.val);
    router.go();
}
</script>
<style scoped>
.btn_list:hover {
    cursor: pointer;
}
</style>