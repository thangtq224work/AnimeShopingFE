<template>
  <v-app>
    <v-layout>
      <SideBar :show-side-bar="store.getShow" />
      <Header></Header>
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import SideBar from './SideBar.vue'
import Header from './HeaderDashboard.vue'
import { useCounterStore } from '@/stores/showSideBar';
import { storeToRefs } from 'pinia'

const store = useCounterStore();
const { show } = storeToRefs(store);
// console.log(show,getShow,setShow);
</script>
