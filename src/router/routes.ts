import {RouteMeta, RouteRecordRaw} from "vue-router";
import {PATH_AUTHOR_ADD, PATH_BMS_ADD, PATH_BMS_LIST, PATH_HOME, PATH_LOGIN, PATH_REGISTER} from "@/router/path.ts";
import {
    TITLE_ADD_AUTHOR,
    TITLE_ADD_BOOK,
    TITLE_BOOK_LIST,
    TITLE_HOME,
    TITLE_LOGIN,
    TITLE_REGISTER
} from "@/router/title.ts";

/**
 * 规定vue-router的组件配置
 */
export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: PATH_HOME,
    },
    {
        name: "Login",
        path: PATH_LOGIN,
        component: () => import("@/components/Login.vue"),
        meta: {
            title: TITLE_LOGIN,
            requireAuth: false
        } as RouteMeta
    },
    {
        name: "Register",
        path: PATH_REGISTER,
        component: () => import("@/components/Register.vue"),
        meta: {
            title: TITLE_REGISTER,
            requireAuth: false,
        } as RouteMeta
    },
    {
        name: "Home",
        path: PATH_HOME,
        component: () => import("@/views/BackendHome.vue"),
        meta: {
            title: TITLE_HOME,
            requireAuth: true
        } as RouteMeta,
        children: [
            {
                name: "AddBook",
                path: PATH_BMS_ADD,
                component: () => import("@/views/bms/AddBook.vue"),
                meta: {
                    title: TITLE_ADD_BOOK,
                    requireAuth: true
                } as RouteMeta
            }, {
                name: "AddAuthor",
                path: PATH_AUTHOR_ADD,
                component: () => import("@/views/author/NewAuthorForm.vue"),
                meta: {
                    title: TITLE_ADD_AUTHOR,
                    requireAuth: true
                } as RouteMeta
            }, {
                name: "BookTable",
                path: PATH_BMS_LIST,
                component: () => import("@/views/bms/BookTable.vue"),
                meta: {
                    title: TITLE_BOOK_LIST,
                    requireAuth: true
                } as RouteMeta
            }
        ]
    }
];