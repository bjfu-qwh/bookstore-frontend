<script lang="ts" setup>
import {LoginDTO} from "@/types/ums";
import {loginFormRules} from "@/rules";

import {Check, Lock, User} from "@element-plus/icons-vue";
import {FormInstance} from "element-plus";
import {login} from "@/api/ums";
import {setToken} from "@/utils/token";
import {gotoHome, gotoRegister} from "@/router/methods.ts";
import {useUserStore} from "@/stores/user.ts";

let loginInfo = ref<LoginDTO>({
  key: "",
  password: ""
});

const loginFormRef = ref<FormInstance>();

const userStore = useUserStore();

const checkLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  await formEl.validate(async valid => {
    if (valid) {
      const userData = await login(loginInfo.value);
      if (userData !== null) {
        setToken(userData.token);
        userStore.updateUserInfo(userData);
        await gotoHome();
      }
    }
  })
}
</script>

<template>
  <el-header>
    工作人员登录
  </el-header>
  <el-form id="login-form"
           ref="loginFormRef"
           :model="loginInfo"
           :rules="loginFormRules"
           label-position="top"
           label-width="auto"
           size="large"
           status-icon>
    <el-form-item id="login-form-key" prop="key">
      <el-input id="login-form-key-input" v-model="loginInfo.key"
                :prefix-icon="User"
                placeholder="用户邮箱/手机号"/>
    </el-form-item>
    <el-form-item id="login-form-password" prop="password">
      <el-input id="login-form-password-input" v-model="loginInfo.password"
                :prefix-icon="Lock"
                placeholder="账号密码"
                type="password"/>
    </el-form-item>
    <el-form-item id="login-form-button-group">
      <el-button :icon="Check" type="primary"
                 width="100%"
                 @click="checkLogin(loginFormRef)">
        登录
      </el-button>
      <el-button type="primary" @click="gotoRegister">
        注册账号
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>