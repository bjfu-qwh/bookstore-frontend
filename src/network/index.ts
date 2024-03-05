import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {BaseConfig} from "network/type";
import {endProgressBar, startProgressBar} from "utils/progress"

const bases = {
    development: "http://localhost:8080"
}

/**
 * 按部署环境获取测试服务器。
 * @param env 部署环境，也许可以从vite获取
 */
export function getBaseUrl(env: string) {
    const base = bases[env];
    if (!base) {
        return "/";
    }
    return base;
}

/**
 *
 * @param env 开发环境，基于此决定axios示例的baseURL
 * @param timeout 请求的超时时间。
 */
function createBaseConfig(env: string, timeout: number) {
    return {
        baseURL: getBaseUrl(env),
        timeout: timeout
    };
}

/**
 * 对请求进行拦截。开始进度条显示并带上token
 * @param config
 */
const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
    startProgressBar();
    const token: string = localStorage.getItem("token") as string
    if (token) {
        config.headers!.Authorization = token;
    }
    return config;
}

/**
 * 拦截器停止进度条
 * @param response
 */
const responseInterceptor = (response: AxiosResponse) => {
    endProgressBar();
    return response.data;
}

function createAxiosInstance(env: string) {
    const baseConfig: BaseConfig = createBaseConfig(env, 10000);
    let instance = axios.create({
        baseURL: baseConfig.baseURL,
        timeout: baseConfig.timeout
    });
    instance.interceptors.request.use(requestInterceptor);
    instance.interceptors.response.use(responseInterceptor);

    return instance;
}


const devInstance = createAxiosInstance(import.meta.env.VITE_ENV_MODE);

export default devInstance;