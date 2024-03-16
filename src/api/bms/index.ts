import {BookUpload} from "@/types";
import devInstance from "@/network/index.ts"

export async function uploadNewBook(book: BookUpload) {
    devInstance.post(``).then(

    )
    console.log(book);
}