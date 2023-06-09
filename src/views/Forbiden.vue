<template>
  <div class="forbidden-container">
    <h1 class="forbidden-title">403</h1>
    <p class="forbidden-message">Bạn không có quyền truy cập trang web này.</p>
    <v-btn @click="router.go(-1)" color="blue" rel="tooltip" title="Designed and Coded by Creative Tim"
      data-placement="bottom">
      Quay lại trang chủ
    </v-btn>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
  
<style>
.forbidden-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-image: linear-gradient(45deg, rgba(11, 96, 216, 0.4), rgb(233, 13, 97, 0.6));
}

.forbidden-title {
  font-size: 48px;
  margin-bottom: 16px;
}

.forbidden-message {
  font-size: 24px;
  margin-bottom: 16px;
}

</style>
  