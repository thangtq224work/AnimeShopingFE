<template>
    <!-- <VRow justify="start" class="ma-0">
        <v-btn color="success" class="ms-5 mt-5 d-sm-none d-md-flex" @click="show=!show">Show</v-btn>
        
    </VRow>
    <v-expand-transition mode="in-out" >
        <v-card v-show="show" height="100" width="100" color="success">
            xin chao
        </v-card>
    </v-expand-transition> -->
    <!-- <div>
        show
    </div>
    <RouterView/> -->
    dashboeard
</template>
<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
// or
import vuetify from '@/plugins/vuetify';
import { ref } from 'vue';

const breakPoin = useDisplay();
let show = ref(false);
console.log(breakPoin.thresholds);
// or : option api
const breakPoin2 = vuetify.display;
console.log(breakPoin2);
</script>