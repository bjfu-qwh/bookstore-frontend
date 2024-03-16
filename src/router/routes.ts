import {RouteMeta, RouteRecordRaw} from "vue-router";
import {PATH_BMS_ADD, PATH_HOME, PATH_LOGIN, PATH_REGISTER} from "@/router/path.ts";

/**
 * 规定vue-router的组件配置
 */
export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: PATH_LOGIN
    },
    {
        name: "Login",
        path: PATH_LOGIN,
        component: () => import("@/components/Login.vue"),
        meta: {
            title: "登录",
            requireAuth: false
        } as RouteMeta
    },
    {
        name: "Register",
        path: PATH_REGISTER,
        component: () => import("@/components/Register.vue"),
        meta: {
            title: "注册账号",
            requireAuth: false,
        } as RouteMeta
    },
    {
        name: "Home",
        path: PATH_HOME,
        component: () => import("@/views/BackendHome.vue"),
        meta: {
            title: "后台首页",
            requireAuth: true
        } as RouteMeta,
        children: [
            {
                name: "AddBook",
                path: PATH_BMS_ADD,
                component: () => import("@/views/bms/AddBook.vue"),
                meta: {
                    title: "添加新图书",
                    requireAuth: true
                } as RouteMeta
            }
        ]
    }
];