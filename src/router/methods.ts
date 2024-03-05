import router from "@/router/index.ts";
import {PATH_BMS_ADD} from "@/router/path.ts";

async function goto(path: string) {
    await router.push(path);
}

export async function gotoAddBook() {
    await goto(PATH_BMS_ADD);
}