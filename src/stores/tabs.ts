import {defineStore} from "pinia";
import {ref} from "vue";
import {RouteItem} from "@/types/util/type";

export const useTabsStore =
    defineStore("tabs", () => {
        const tabList = ref<RouteItem[]>([]);

        function append(item: RouteItem) {
            tabList.value.push(item);
        }

        return {
            tabList, append
        }
    });