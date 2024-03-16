import devInstance from "@/network";
import {Result} from "@/types/util/type";
import {Category} from "@/types/category";

export async function loadChildren(parent: string | any) {
    const result: Result<Category[]> = (await
        devInstance.get(`/category/children?parent=${parent}`))
    return result !== null ? result.data : null;
}

export async function loadRoots() {
    return await loadChildren('');
}