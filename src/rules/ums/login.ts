import {ref} from "vue";
import {FormRules} from "element-plus";
import {LoginDTO} from "@/types/ums";


export const loginFormRules = ref<FormRules<LoginDTO>>({
    key: [
        {
            trigger: "blur",
            required: true,
            validator(rule, value, callback) {
                if (!value) {
                    return callback(new Error('邮箱/手机号不能为空'))
                }
                const reg = new RegExp("[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");
                if (!reg.test(value) && value.length !== 11) {
                    return callback(new Error("请输入正确格式的邮箱/手机号"));
                }
                callback();
            },
        }
    ],
    password: [
        {
            required: true,
            trigger: "blur",
            validator(rule, value, callback) {
                if (!value) {
                    return callback(new Error("请输入密码"));
                }
                callback();
            },
        }
    ]
});