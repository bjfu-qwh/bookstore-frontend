export interface LoginDTO {
    key: string,
    password: string
}

/**
 * 登录成功后服务器返回的信息接口格式
 */
export interface UserInfoDTO {
    id: string,
    token: string,
    username: string,
    email: string,
    url: string,
}

/**
 * pinia管理的用户数据接口
 */
export interface UserStore {
    id: string,
    username: string,
    email: string,
    url: string,
}

/**
 * 注册账号时必须填写的有关信息
 */
export interface UserRegisterDTO {
    username: string,
    url: string,
    email: string,
    phone: string,
    password: string,
    /**
     * 确认密码，这一段是不用传给后端的
     */
    passwordConfirm: string,
}
