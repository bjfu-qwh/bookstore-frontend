import {routes} from "./routes.ts"
import {createRouter, createWebHistory} from "vue-router";
import {endProgressBar, startProgressBar} from "@/utils/progress";
import {getToken} from "@/utils/token";
import {ElMessage} from "element-plus";


const router = createRouter({
    routes: routes,
    history: createWebHistory()
});

router.beforeEach((to, from) => {
    startProgressBar();
    if (to.meta.requireAuth && getToken() === null) {
        ElMessage.info("您未登录,即将返回登录界面")
        return {
            name: "Login"
        }
    }
});

router.afterEach((to, from) => {
    document.title = to.meta.title;
    endProgressBar();
})

export default router;