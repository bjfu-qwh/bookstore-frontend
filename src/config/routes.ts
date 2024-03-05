import {DocumentAdd, List, Notebook} from "@element-plus/icons-vue";
import {PATH_BMS, PATH_BMS_ADD, PATH_BMS_LIST} from "@/router/path.ts";
import {gotoAddBook} from "@/router/methods.ts";
import {RouteItem} from "@/types/util/type";

/**
 * 在线图书商城系统
 */
export const backendRoutes: RouteItem[] = [
    {
        title: "图书管理",
        path: PATH_BMS,
        icon: Notebook,
        goto: null,
        children: [
            {
                title: "图书列表查询",
                path: PATH_BMS_LIST,
                icon: List,
                children: null
            } as RouteItem,
            {
                title: "新增图书",
                path: PATH_BMS_ADD,
                icon: DocumentAdd,
                goto: gotoAddBook,
                children: null
            } as RouteItem
        ],
    } as RouteItem
];

