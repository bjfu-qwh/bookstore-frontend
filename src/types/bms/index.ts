import {Category} from "@/types/category";
import {AuthorDetail} from "@/types/author";

/**
 * 图书上传时需要的接口。
 * TODO 差一个图书详情页的富文本编辑
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
     * 图书所有分类ID
     */
    categories: string[]
    /**
     * 图书库存
     */
    amount: number,
    /**
     * 图书装帧
     */
    type: string,
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
     * 图书页码数
     */
    page: number
}

/**
 * 用于后台列表简化展示
 */
export interface BookVO {
    /**
     * ISBN编号
     */
    isbn: string,
    /**
     * 图书名
     */
    bookName: string,
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
    authors: AuthorDetail[],
    /**
     * 图书所有分类ID
     */
    categories: Category[],
    /**
     * 图书装帧
     */
    type: string,
    /**
     * 图书出版日期
     */
    published: string,
}

export function init() {
    return {
        url: '',
        name: '',
        page: 0,
        authors: [],
        brief: '',
        amount: 0,
        categories: [],
        isbn: '',
        press: '',
        price: 0.00,
        type: '',
        edition: '',
        published: ''
    } as BookUpload;
}

