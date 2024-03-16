import {ref} from "vue";
import {FormRules} from "element-plus";
import {NewAuthorDTO} from "@/types/author";

export const newAuthorFormRules = ref<FormRules<NewAuthorDTO>>({
    name: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value === "") {
                return callback(new Error("请输入作者姓名"));
            }
            callback();
        },
    },
    nation: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value === "") {
                return callback(new Error("请输入国家信息"));
            }
            callback();
        },
    },
    url: {
        required: true,
        trigger: "blur",
        message: "请指定作者头像信息"
    },
    brief: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
            if (value.length < 10 || value.length > 100) {
                return callback(new Error("作家简介必须介于10-100字之间"));
            }
            callback();
        },
    }
});