import {ref} from "vue";
import {defineStore} from "pinia";
import {UserStore} from "@/types/ums";
import {removeToken} from "@/utils/token";
import {gotoLogin} from "@/router/methods.ts";

export const useUserStore =
    defineStore("user", () => {
        const userInfo = ref<UserStore>({} as UserStore);

        function updateUserInfo(info: UserStore) {
            userInfo.value = {
                id: info.id,
                url: info.url,
                email: info.email,
                username: info.username
            } as UserStore
        }

        async function logout() {
            userInfo.value = {} as UserStore;
            removeToken();
            await gotoLogin();
        }

        return {
            userInfo, updateUserInfo, logout
        }
    }, {
        persist: true,
    },);