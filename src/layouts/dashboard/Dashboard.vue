<template>
  <v-app>
    <v-navigation-drawer v-model="showSideBar">
      <template #prepend>
        <SideBar></SideBar>
      </template>
      <template #append>
        <v-list>
          <v-list-item  :prepend-icon="sideBarNav.nav_footer.icon" :to="sideBarNav.nav_footer.path" :title="sideBarNav.nav_footer.name"
            rounded="xl" active-color="#3498db" exact></v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <Header :drawer="showSideBar" @toggle="showSideBar = !showSideBar"></Header>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import SideBar from './SideBar.vue'
import Header from './HeaderDashboard.vue'
import { ref,onBeforeMount } from 'vue';
import nav from '@/_nav';
import getcurrentLanguge from '@/util/locale'
let sideBarNav = ref(null);
onBeforeMount(() => {
  sideBarNav.value = nav[getcurrentLanguge()];
})
const showSideBar = ref(true);
</script>
<style>
.fixed__sidebar {
  /* overflow: scroll; */
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  /* z-index: 1; */
}
</style>
