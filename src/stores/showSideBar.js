import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useCounterStore = defineStore('showSideBar', () => {
    let isShow = ref(true);
    const getShow = computed(() => {
        return isShow.value;
    })
    const setShow = (value) => {
        isShow.value = value;
    }
    return { isShow, getShow, setShow }
})