<script lang="ts" setup>
import {UserRegisterDTO, UserStore} from "@/types/ums";
import {ref} from "vue";
import {FormInstance, FormRules} from "element-plus";
import {Result} from "@/types/util/type";
import {checkEmail, checkPhone, register} from "@/api/ums";
import {ResponseCode} from "@/network/enum.ts";
import {Check, Lock, Message, Phone, Plus, User} from "@element-plus/icons-vue";
import {uploadSingleUserImg} from "@/utils/oss"
import {setToken} from "@/utils/token";
import {gotoHome} from "@/router/methods.ts";
import {useUserStore} from "@/stores/user.ts";

let registerInfo = ref<UserRegisterDTO>({
  username: "",
  password: "",
  passwordConfirm: "",
  email: "",
  phone: "",
  url: ""
} as UserRegisterDTO);

const registerFormRef = ref<FormInstance>();

const userStore = useUserStore();

const checkRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  await formEl.validate(async valid => {
    if (valid) {
      const userData = await register(registerInfo.value);
      console.log(userData);
      if (userData !== null) {
        setToken(userData.token);
        userStore.updateUserInfo({
          id: userData.id,
          email: userData.email,
          username: userData.username,
          url: userData.url
        } as UserStore);
        await gotoHome();
      }
    }
  })
}

/**
 * 由于二次输入密码验证需要组件响应式对象，只能将规则定义写入.vue文件
 */
const registerFormRules = <FormRules<UserRegisterDTO>>({
      username: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
          if (value === "") {
            return callback(new Error("请输入用户名"));
          }
          if (value.length < 3 || value.length > 15) {
            return callback(new Error("用户昵称长度必须是3~15个字符"))
          }
          callback();
        }
      },
      password: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
          if (value === "") {
            return callback(new Error("请输入密码"));
          }
          callback();
        }
      },
      passwordConfirm: {
        required: true,
        trigger: "blur",
        validator(rule, value, callback) {
          if (value === "") {
            return callback(new Error("请再次确认密码"));
          }
          if (value !== registerInfo.value.password) {
            return callback(new Error("两次输入密码不一致，请重新检查"));
          }
          callback();
        },
      },
      email: {
        required: true,
        trigger: "blur",
        asyncValidator(rule, value, callback) {
          if (value === "") {
            return callback(new Error("请输入邮箱"));
          }
          const reg = new RegExp("[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");
          if (!reg.test(value)) {
            return callback(new Error("请输入正确格式的邮箱"));
          }
          checkEmail(value).then(
              (result: Result<string> | null) => {
                if (result !== null && result.code !== ResponseCode.CODE_SUCCESS) {
                  return callback(new Error(result.message));
                }
              }
          )
          callback();
        },
      },
      phone: {
        required: true,
        trigger: "blur",
        asyncValidator(rule, value, callback) {
          if (value === "") {
            return callback(new Error("请输入手机号码"));
          }
          if (value.length !== 11) {
            return callback(new Error("请输入格式正确的11位手机号"))
          }
          checkPhone(value).then(
              (result: Result<string> | null) => {
                if (result !== null && result.code !== ResponseCode.CODE_SUCCESS) {
                  return callback(new Error(result.message));
                }
              }
          )
          callback();
        },
      }
    }
);

async function uploadUserAvatar({file}: any) {
  const result = await uploadSingleUserImg({file});
  if (result !== "") {
    registerInfo.value.url = result;
  }
}

</script>

<template>
  <el-form id="worker-register-form"
           ref="registerFormRef"
           :model="registerInfo"
           :rules="registerFormRules"
           label-position="top"
           label-width="auto"
           size="large"
           status-icon>
    <el-form-item id="worker-register-form-name" prop="username">
      <el-input v-model="registerInfo.username"
                :prefix-icon="User"
                placeholder="请输入工作人员昵称"/>
    </el-form-item>
    <el-form-item id="worker-register-form-email" prop="email">
      <el-input v-model="registerInfo.email"
                :prefix-icon="Message"
                placeholder="请输入工作邮箱"/>
    </el-form-item>
    <el-form-item id="worker-register-form-phone" prop="phone">
      <el-input v-model="registerInfo.phone"
                :prefix-icon="Phone"
                placeholder="请输入联系方式"/>
    </el-form-item>
    <el-form-item id="worker-register-form-password" prop="password">
      <el-input v-model="registerInfo.password"
                :prefix-icon="Lock"
                placeholder="请输入账号密码"
                type="password"/>
    </el-form-item>
    <el-form-item id="worker-register-form-password-confirm" prop="passwordConfirm">
      <el-input v-model="registerInfo.passwordConfirm"
                :prefix-icon="Lock"
                placeholder="请确认账号密码"
                type="password"/>
    </el-form-item>
    <el-form-item prop="url">
      <el-upload
          :http-request="uploadUserAvatar"
          :limit="1"
          :multiple="false"
          accept=".jpeg,.jpg,.png"
          action="#"
          class="avatar-uploader">
        <el-image v-if="registerInfo.url!==''"
                  :src="registerInfo.url" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item id="login-form-button-group">
      <el-button :icon="Check" type="primary"
                 width="100%"
                 @click="checkRegister(registerFormRef)">
        立即注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>