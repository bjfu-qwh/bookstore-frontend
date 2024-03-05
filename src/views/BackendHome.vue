<script lang="ts" setup>
import {ref} from "vue";
import {backendRoutes} from "@/config/routes.ts";

let activePath = ref<string>("");
</script>

<template>
  <el-container id="container">
    <el-header id="header">
      <div>
        <img alt="#" src="../assets/vue.svg"/>
        <span>商家后台系统</span>
      </div>
      <div>
        <span>你好</span>
        <el-image
            fit="fill"
            src="https://tse4-mm.cn.bing.net/th/id/OIP-C.ytZ3w0NP3JfGHzPzNXO25QAAAA?pid=ImgDet&rs=1"
            style="width: 50px; height: 50px; margin: 0 30px; cursor: pointer;">
        </el-image>
        <el-button type="info">退出</el-button>
      </div>
    </el-header>
    <el-container id="main">
      <el-aside id="aside" width="200px">
        <el-menu
            :default-active="activePath"
            :router="true"
            active-text-color="#409eff"
            background-color="#333744"
            class="menu-item"
            text-color="#fff"
            unique-opened>
          <el-sub-menu v-for="item in backendRoutes" :index="item.title">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
                v-for="path in item.children"
                v-if="item.children!==null"
                :key="path.title"
                :index="path.title"
                class="sub-menu-item"
                @click="item.goto">
              <template #title>
                <el-icon>
                  <component :is="path.icon"></component>
                </el-icon>
                <span>{{ path.title }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main id="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
#container {
  height: 100%;
  width: 100%;
}

#header {

  height: 80px;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
      color: #fff;
    }

    img {
      width: 54px;
      display: inline-block;
      border-radius: 50%;
      background-color: #eee;
    }
  }

}

#aside {
  background-color: #333744;
}

#main {
  background-color: #eaedf1;
}

.menu-item {
  border-right: none;
}

</style>