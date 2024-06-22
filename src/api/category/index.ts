import devInstance from "@/network";
import {Result} from "@/types/util/type";
import {Category} from "@/types/category";
import {useUserStore} from "@/stores/user.ts";

export async function loadChildren(parent: string | any) {
    const result: Result<Category[]> = (await
        devInstance.get(`/category/children?parent=${parent}`))
    return result !== null ? result.data : null;
}

export async function loadRoots() {
    return await loadChildren('');
}

export async function getByID(categoryID: string) {
    const result: Result<Category> = await (
        devInstance.get(`/category/get?id=${categoryID}`)
    );
    return result !== null ? result.data : null;
}

export async function addCategory(category: Category) {
    const workerID = useUserStore().userInfo.id;
    const result: Result<string> = await (
        devInstance.post(`/category/add?workerID=${workerID}`, {
            id: category.id,
            name: category.name,
            parent: category.parent
        })
    );
    return result.data;
}

export async function checkCategoryID(categoryID: string) {
    const result: Result<boolean> = await (
        devInstance.get(`/category/check-id?id=${categoryID}`)
    );
    return result.data;
}

export function formatCategories(categories: Category[]): string {
    let result: string = "";
    const n = categories.length;
    for (let index = n - 1; index >= 0; --index) {
        result += `${categories[index].name}`;
        if (index !== 0) {
            result += '\\';
        }
    }
    return result;
}