import OSS from "ali-oss";
import {conf} from "@/config/oss-config.js"
import {createUUID} from "../uuid.ts";

const tool = new OSS(
    conf
);

const PREFIX_BOOK = "book";
const PREFIX_USER = "user";
const PREFIX_AUTHOR = "author";


/**
 *
 * @param prefix 需要上传的图片目录前缀，比如"book"等
 * @param file 文件实体数据
 */
async function uploadSingleImg(prefix, {file}) {
    const fileName = `${prefix}/${createUUID()}.jpeg`;
    const result = await tool.put(fileName, file);
    return result.url;
}

export async function uploadSingleUserImg({file}) {
    return await uploadSingleImg(PREFIX_USER, {file});
}

/**
 * 删除单个已经上传的文件
 * @param path 文件的完整路径
 */
export async function deleteSingle(path) {
    const prefix = `https://${conf.region}/.aliyuncs.com`;
    path = path.replace(prefix, "");
    const result = await tool.delete(path);
    console.log(result);
    return true;
}

export async function uploadSingleAuthorAvatar({file}) {
    return await uploadSingleImg(PREFIX_AUTHOR, {file});
}

export async function uploadSingleBookImg({file}) {
    return await uploadSingleImg(PREFIX_BOOK, {file});
}
