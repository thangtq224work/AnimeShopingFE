import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { readCookie, setCookie } from "@/util/cookies";
import { refresh, getUsername, getRole } from "@/services/authService";
const check = async () => {
    let access_token = readCookie('access_token');
    let refresh_token = readCookie('refresh_token');
    if (access_token) {
        return true;
    }
    if (!refresh_token) {
        return false;
    }
    let tmp = true;
    await refresh({ 'refreshToken': refresh_token }).then(resp => {
        if (resp.data.code >= 200 && resp.data.code < 300) {
            setCookie('access_token', resp.data.data.access_token, resp.data.data.access_token_expired);
        }
        else {
            tmp = false;
        }
    }).catch(err => {
        tmp = false;
    })
    return tmp;

}
const authStore = defineStore("auth", () => {
    // state
    const user = ref({
        username: null,
        expired: 1
    });
    const userRoles = ref({
        roles: [],
        expired: 1
    });
    // getter / mutations
    const getUser = async () => {
        if (new Date().getTime() <= user.value.expired && user.value.username != null) {
            return user.value.username;
        }
        const checking = await check();
        if (checking) {
            let access_token = readCookie('access_token');
            await getUsername({ 'accessToken': access_token }).then(resp => {
                if (resp.data.code >= 200 && resp.data.code < 300) {
                    user.value.username = resp.data.data.username;
                    user.value.expired = resp.data.data.expired;
                }
            })
        }
        return user.value.username;
    }
    const isLogin = computed(() => {
        return user.value.username != null && new Date().getTime() <= user.value.expired;
    })
    const getUserRole = async () => {
        if (new Date().getTime() <= userRoles.value.expired) {
            return userRoles.value.roles;
        }
        const checking = await check();
        if (checking) {
            let access_token = readCookie('access_token');
            await getRole({ 'accessToken': access_token }).then(resp => {
                if (resp.data.code >= 200 && resp.data.code < 300) {
                    userRoles.value.roles = resp.data.data.role;
                    userRoles.value.expired = resp.data.data.expired;
                }
            })
        }
        return userRoles.value.roles;
    }
    // actions
    const setUser = (u, expired) => {
        user.value.username = u;
        user.value.expired = expired;
    }
    const setUserRole = (roles) => {
        userRoles.value = roles;
    }
    const init = async () =>{
        await getUser();
        await getUserRole();
    }
    const logout = () =>{
        user.value = {
            username: null,
            expired: 1
        };
        userRoles.value = {
            roles: [],
            expired: 1
        }
        setCookie("refresh_token", "", new Date().getTime());
        setCookie("access_token", "", new Date().getTime());
    }
    return {user,userRoles, getUser, getUserRole, setUser, setUserRole, isLogin,logout,init };
});
export default authStore;