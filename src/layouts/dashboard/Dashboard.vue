<template>
  <v-app>
    <v-layout>
      <SideBar :show-side-bar="store.getShow" class="fixed__sidebar" />
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
<style>
  
.fixed__sidebar{
  /* overflow: scroll; */
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  /* z-index: 1; */
}
</style>
