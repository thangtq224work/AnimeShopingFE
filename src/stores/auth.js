import { defineStore } from "pinia";
import { computed, ref } from "vue";
const authStore = defineStore("auth",() => {
    // state
    const user = ref(null);
    const userToken = ref("");
    const userRoles = ref([]);
    // getter / mutations
    const getUser = computed(() => {
        return user.value;
    })
    const getUserToken = computed(() => {
        return userToken.value;
    })
    const getUserRole = computed(() => {
        return userRoles.value;
    })
    // actions
    const setUser = (u) => {
        user.value = u;
    }
    const setUserRole = (roles) => {
        userRoles.value = roles;
    }
    const setToken = (token) => {
        userToken.value = token;
    }
    return {user,userToken,userRoles,getUser,getUserRole,getUserToken,setUser,setUserRole,setToken};
});
export default authStore;