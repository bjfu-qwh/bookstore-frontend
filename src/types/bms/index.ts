/**
 * 图书上传时需要的接口。
 */
export interface BookUpload {
    /**
     * ISBN编号
     */
    isbn: string,
    /**
     * 图书名
     */
    name: string,
    /**
     * 图书价格
     */
    price: number,
    /**
     * 图书图片url，上传至oss后回调
     */
    url: string,
    /**
     * 图书出版社
     */
    press: string,
    /**
     * 图书作者id，可以有多个
     */
    authors: number[],
    /**
     * 图书分类ID
     */
    categoryID: number,
    /**
     * 图书库存
     */
    amount: number,
    /**
     * 图书版本
     */
    edition: string,
    /**
     * 图书出版日期
     */
    published: string,
    /**
     * 图书简要说明
     */
    brief: string,
    /**
     * 图书详细说明，基于富文本编辑器实现。
     */
    description: string
}

export function init() {
    return {} as BookUpload;
}