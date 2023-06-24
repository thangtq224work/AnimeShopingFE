<template>
    day la product detail
    <button @click="back">Quay lai</button>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const back = () => {
    router.go(-1);
}
</script>