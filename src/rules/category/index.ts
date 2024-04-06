import {FormRules} from "element-plus";
import {Category} from "@/types/category";
import {ref} from "vue";
import {checkCategoryID} from "@/api/category";

export const appendCategoryFormRules = ref<FormRules<Category>>({
    id: [{
        required: true,
        trigger: "blur",
        message: "请输入图书分类"
    }, {
        trigger: 'blur',
        validator(rule, value, callback) {
            checkCategoryID(value).then(
                (result: boolean) => {
                    if (result) {
                        return callback("该分类ID已被使用，请重新输入");
                    } else {
                        return callback();
                    }
                }
            );
        },
    }],
    name: {
        required: true,
        trigger: "blur",
        message: "请输入图书分类名称，如'编程语言'"
    },
    parent: {
        required: true,
        trigger: "blur",
        message: "请输入父分类ID"
    }
});