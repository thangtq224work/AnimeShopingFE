<template>
  <v-navigation-drawer permanent :rail="rail" v-model="store.getShow" @click="rail = false">


      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" :title="nav.side_bar.name" height="50" nav>
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav v-model:opened="open">
      <div v-for='navLink in nav.nav_content'>
        <v-list-group v-if="navLink.children" no-action  :key="navLink.name" :value="navLink.name ">
          <!-- <v-list-item :to="navLink.path" :title="navLink.name" :prepend-icon="navLink.icon" slot='activator'>
          </v-list-item> -->
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="navLink.name" :prepend-icon="navLink.icon" @click.prevent>
            </v-list-item>
          </template>
          <v-list-item v-for='sub in navLink.children' :key="sub.name" :title="sub.name" :to="navLink.path">
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :title="navLink.name" :prepend-icon="navLink.icon" :to="navLink.path"></v-list-item>
      </div>
    </v-list>

  </v-navigation-drawer>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import { useCounterStore } from '@/stores/showSideBar';
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import nav from '@/_nav';
import { useRoute } from 'vue-router';
const store = useCounterStore();
let rail = ref(false);
let open = ref(['Product property']);
onMounted(() => {
  if (useDisplay().name.value == 'xs' || useDisplay().name.value == 'sm') {
    rail.value = true;
  }
  // check url
  const route = useRoute();
  nav.nav_content.some((item)=>{
    return item?.children?.some((i)=>{
      if(i.path == route.path){
        open.value.push(item.name);
        return true;
      }
    })
  })
})
</script>
