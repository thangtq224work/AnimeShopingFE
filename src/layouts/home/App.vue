<template>
    <v-app  class="mx-md-12">
        <NavBar class="px-md-12"></NavBar>
        <Slider class="px-md-12"></Slider>
        <v-main  class="px-md-12">
            <RouterView/>
        </v-main>
        <Footer  class="px-md-12"></Footer>
    </v-app>
</template>
<script setup>
import NavBar from '@/layouts/home/NavBar.vue'
import Slider from './Slider.vue';
import Footer from './Footer.vue';
</script>