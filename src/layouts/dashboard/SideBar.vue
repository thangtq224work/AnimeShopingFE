<template>
    <v-list-item height="65">
      <div class="d-flex align-center">
        <v-img src="@/assets/logo.png" height="50"></v-img>
        <span class="">Anime shoping</span>
      </div>
    </v-list-item>
    <v-divider></v-divider>
    <v-list density="compact" nav v-model:opened="open">
      <div v-for='navLink in sideBarNav.nav_content'>
        <v-list-group v-if="navLink.children" no-action :key="navLink.name">
          <!-- <v-list-item :to="navLink.path" :title="navLink.name" :prepend-icon="navLink.icon" slot='activator'>
          </v-list-item> -->
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="navLink.name" :prepend-icon="navLink.icon" rounded="xl">
            </v-list-item>
          </template>
          <v-list-item v-for='sub in navLink.children' :key="sub.name" :title="sub.name" :value="sub.name" :to="sub.path"
            rounded="xl" active-color="#3498db" exact>
          </v-list-item>
          <!-- :prepend-icon="sub.icon" -->
        </v-list-group>
        <v-list-item v-else :title="navLink.name" :prepend-icon="navLink.icon" :to="navLink.path" :value="navLink.name"
          rounded="xl" active-color="#3498db" exact></v-list-item>
      </div>
    </v-list>
</template>

<script setup>
import { onMounted,onBeforeMount } from 'vue';
import { ref } from 'vue';
import nav from '@/_nav';
import getcurrentLanguge from '@/util/locale'
let open = ref(['']);
let sideBarNav = ref(null);
onBeforeMount(() => {
  sideBarNav.value = nav[getcurrentLanguge()];
})
</script>
<style></style>
