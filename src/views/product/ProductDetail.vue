<template>
    day la product detail
    <button @click="back">Quay lai</button>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
console.log(router);
    const back = () =>{
        console.log(router);
        router.go(-1);
    }
</script>