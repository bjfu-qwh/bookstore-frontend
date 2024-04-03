type gotoFunction = () => Promise<void>;

/**
 * 基于vue-router实现的路由跳转实体，包括标签和element-icon图标
 */
export interface RouteItem {
    /**
     * 跳转标签标题
     */
    title: string,
    /**
     * 对应的vue-router路径
     */
    path: string,
    /**
     * element-plus图标的类型
     */
    icon: any,

    goto: gotoFunction | null

    children: RouteItem[] | null
}

/**
 * 面包屑词条项
 */
export interface BreadCrumbItem {
    title: string,
    /**
     * vue-router项的真实路径
     */
    path: string,
}

export interface Result<T> {
    code: number,
    message: string,
    data: T
}