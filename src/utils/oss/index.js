import OSS from "ali-oss";
import {conf} from "../../config/oss-config.js"
import {createUUID} from "../uuid.ts";

const tool = new OSS(
    conf
);

const PREFIX_BOOK = "book";


/**
 *
 * @param prefix 需要上传的图片目录前缀，比如"book"等
 * @param file 文件实体数据
 */
function uploadSingleImg(prefix, {file}) {
    const fileName = `book/${createUUID()}.jpeg`;
    tool.put(fileName, file).then(
        ({res, url, name}) => {
            console.log(res, url, name);
            return url;
        }).catch((error) => {
        console.log(error);
    });
}

export function uploadSingleBookImg({file}) {
    return uploadSingleImg(PREFIX_BOOK, {file});
}