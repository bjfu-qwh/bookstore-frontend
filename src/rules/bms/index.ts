import {FormRules} from "element-plus";
import {BookUpload} from "@/types";
import {ref} from "vue"
import {checkISBN} from "@/api";

export const newBookFormRules = ref<FormRules<BookUpload>>({
    name: {
        required: true,
        trigger: 'blur',
        validator(rule, value, callback) {
            if (value === "") {
                return callback(new Error("请输入图书名"));
            }
            callback();
        },
    },
    isbn: {
        required: true,
        trigger: "blur",
        asyncValidator(rule, value, callback) {
            if (value === "") {
                return callback(new Error("请输入图书ISBN"));
            }
            checkISBN(value).then(
                (result: boolean | null) => {
                    if (result !== null && result) {
                        return callback(new Error("该ISBN已被注册"));
                    }
                    callback();
                }
            )
        },
    },
    press: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value === "") {
                return callback(new Error("请输入图书出版社"));
            }
            callback();
        },
    },
    categoryID: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value === 0) {
                return callback(new Error("请为图书指定分类"));
            }
            callback();
        },
    },
    authors: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value.length === 0) {
                return callback(new Error("请指定图书作者，至少一位"));
            }
        },
    },
    price: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value === undefined || value === 0.0) {
                return callback(new Error("请指定图书价格(人民币)"));
            }
            callback();
        },
    },
    edition: {
        required: true,
        trigger: 'blur',
        validator(rule, value, callback) {
            if (value === '') {
                return callback(new Error("请输入图书版次信息"));
            }
            callback();
        }
    },
    published: {
        required: true,
        trigger: 'blur',
        validator(rule, value, callback) {
            if (value === '') {
                return callback(new Error("请输入图书出版日期"));
            }
            callback();
        }
    },
    amount: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value === 0) {
                return callback(new Error("图书库存不少于1件"));
            }
            callback();
        }
    },
    page: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value === 0) {
                return callback(new Error("请输入图书页码"));
            }
            callback();
        }
    },
    url: {},
    brief: {},
    type: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value === '') {
                return callback(new Error("请指定新图书装帧"));
            }
            callback();
        }
    }

});