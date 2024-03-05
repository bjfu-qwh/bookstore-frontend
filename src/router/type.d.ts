import "vue-router"

declare module 'vue-router' {
    interface RouteMeta {
        requireAuth: boolean
        /**
         * 导航对应组件的标题
         */
        title: string
    }
}

export {}