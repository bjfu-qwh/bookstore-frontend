import {AuthorSelectItem, NewAuthorDTO} from "@/types/author";
import {Result} from "@/types/util/type";
import devInstance from "@/network";
import {useUserStore} from "@/stores/user.ts";

export async function addAuthor(author: NewAuthorDTO) {
    const workerID: string = useUserStore().userInfo.id;
    const result: Result<string> = (await
        devInstance.post(`/back/author/add?workerID=${workerID}`, {
            name: author.name,
            nation: author.nation,
            brief: author.brief,
            url: author.url
        }));
    return result ? result.data : null;
}

export async function allAuthorSelectorItem() {
    const result: Result<AuthorSelectItem[]> = (
        await devInstance.get('/back/author/selector')
    );
    return result ? result.data : null;
}