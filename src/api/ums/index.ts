import {LoginDTO, UserInfoDTO, UserRegisterDTO} from "@/types/ums";
import {Result} from "@/types/util/type";
import devInstance from "@/network";
import {SHA256Encrypt} from "@/utils/encrypt";

export async function login(login: LoginDTO): Promise<UserInfoDTO | null> {
    const result: Result<UserInfoDTO> = (await devInstance.post(
        '/account/login', {
            key: login.key,
            password: SHA256Encrypt(login.password)
        }
    ));
    return result ? result.data : null;
}

export async function checkEmail(email: string): Promise<Result<string>> {
    return (await devInstance.get(`/account/check-email?email=${email}`));
}

export async function checkPhone(phone: string): Promise<Result<string>> {
    return (await devInstance.get(`/account/check-phone?phone=${phone}`));
}

export async function register(info: UserRegisterDTO): Promise<UserInfoDTO | null> {
    const result: Result<UserInfoDTO> =
        (await devInstance.post('/account/register', {
            username: info.username,
            password: SHA256Encrypt(info.password),
            email: info.email,
            phone: info.phone,
            url: info.url,
        }));
    return result ? result.data : null;
}