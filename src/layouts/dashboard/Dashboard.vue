<template>
  <v-app id="inspire">
      <v-navigation-drawer v-model="showSideBar">
        <template #prepend>
          <SideBar></SideBar>
        </template>
      </v-navigation-drawer>
      <Header :drawer="showSideBar" @toggle="showSideBar= !showSideBar "></Header>
      <v-main>
        <RouterView />
      </v-main>
  </v-app>
</template>

<script setup>
import SideBar from './SideBar.vue'
import Header from './HeaderDashboard.vue'
import { ref } from 'vue';

const showSideBar = ref(true);
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
