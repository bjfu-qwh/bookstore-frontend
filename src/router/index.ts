import {routes} from "./routes.ts"
import {createRouter, createWebHistory} from "vue-router";
import {endProgressBar, startProgressBar} from "@/utils/progress";
import {getToken} from "@/utils/token";


const router = createRouter({
    routes: routes,
    history: createWebHistory()
});

router.beforeEach((to, from) => {
    startProgressBar();
    if (to.meta.requireAuth && getToken() === null) {
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