import router from "@/router/index.ts";
import {PATH_AUTHOR_ADD, PATH_BMS_ADD, PATH_BMS_LIST, PATH_HOME, PATH_LOGIN, PATH_REGISTER} from "@/router/path.ts";

export async function goto(path: string) {
    await router.push(path);
}

export async function gotoAddBook() {
    await goto(PATH_BMS_ADD);
}

export async function gotoBookTable() {
    await goto(PATH_BMS_LIST);
}

export async function gotoAddAuthor() {
    await goto(PATH_AUTHOR_ADD);
}

export async function gotoLogin() {
    await goto(PATH_LOGIN);
}

export async function gotoRegister() {
    await goto(PATH_REGISTER);
}

export async function gotoHome() {
    await goto(PATH_HOME);
}


