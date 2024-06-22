import {BookUpload, BookVO} from "@/types";
import devInstance from "@/network/index.ts"
import {PagedResult, Result} from "@/types/util/type";
import {useUserStore} from "@/stores/user.ts";

export async function uploadNewBook(book: BookUpload) {
    const workerID: string = useUserStore().userInfo.id;
    const result: Result<string> = await (devInstance.post(`/back/bms/book/add?workerID=${workerID}`, {
        isbn: book.isbn,
        name: book.name,
        press: book.press,
        published: book.published,
        edition: book.edition,
        url: book.url,
        amount: book.amount,
        page: book.page,
        price: book.price,
        brief: book.brief,
        authors: book.authors,
        categories: book.categories,
        type: book.type
    }));
    return result.data;
}

export async function getBookTable(pageID: number, pageSize: number) {
    const result: Result<PagedResult<BookVO>> = (await
        devInstance.get(`/back/bms/info/table?pageID=${pageID}&pageSize=${pageSize}`));
    return result.data;
}

export async function checkISBN(isbn: string) {
    const result: Result<boolean> = (
        await devInstance.get(`/back/bms/book/isbn?isbn=${isbn}`)
    )
    return result.data;
}