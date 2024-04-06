import {DocumentAdd, HelpFilled, List, Notebook, User} from "@element-plus/icons-vue";
import {
    PATH_AUTHOR,
    PATH_AUTHOR_ADD,
    PATH_BMS,
    PATH_BMS_ADD,
    PATH_BMS_LIST,
    PATH_CATEGORY,
    PATH_CATEGORY_TABLE
} from "@/router/path.ts";
import {gotoAddAuthor, gotoAddBook, gotoBookTable, gotoCategoryTable} from "@/router/methods.ts";
import {RouteItem} from "@/types/util/type";
import {TITLE_CATEGORY_TABLE} from "@/router/title.ts";

/**
 * 在线图书商城系统后台路由项配置。
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
                goto: gotoBookTable,
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
    } as RouteItem,
    {
        title: "作者管理",
        path: PATH_AUTHOR,
        icon: User,
        goto: null,
        children: [
            {
                title: "新增作者",
                path: PATH_AUTHOR_ADD,
                icon: DocumentAdd,
                goto: gotoAddAuthor,
                children: null
            } as RouteItem
        ]
    } as RouteItem,
    {
        title: "图书分类管理",
        path: PATH_CATEGORY,
        icon: HelpFilled,
        goto: null,
        children: [
            {
                title: TITLE_CATEGORY_TABLE,
                path: PATH_CATEGORY_TABLE,
                icon: List,
                goto: gotoCategoryTable,
                children: null
            } as RouteItem
        ]
    } as RouteItem
];


