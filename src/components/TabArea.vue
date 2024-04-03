<script lang="ts" setup>
import {ref} from "vue";
import {RouteItem} from "@/types/util/type";
import {ElMessage, TabPaneName, TabsPaneContext} from "element-plus";
import {useTabsStore} from "@/stores/tabs.ts";
import {goto} from "@/router/methods.ts";

const editableTabsValue = ref<string>('')
let tabItems = ref(useTabsStore().tabList);

const handleTabClick = async (tab: TabsPaneContext) => {
  await goto(tab.paneName as string);
}

const handleTabClose = async (
    targetName: TabPaneName | undefined
) => {
  if (tabItems.value.length === 1) {
    return ElMessage.info("至少保留一个页面喔");
  }
  const tabs = tabItems.value;
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path;
        }
      }
    })
  }
  tabItems.value = tabItems.value.filter((tab: RouteItem) => tab.path !== targetName);
  useTabsStore().tabList = tabItems.value;
  await goto(activeName);
}

</script>

<template>
  <el-tabs v-model="editableTabsValue"
           closable
           type="card"
           @tab-click="handleTabClick"
           @tab-remove="handleTabClose">
    <el-tab-pane
        v-for="item in tabItems"
        :key="item.title"
        :name="item.path">
      <template #label>
        <span>
          <el-icon :is="item.icon"></el-icon>
          <span>{{ item.title }}</span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>

</style>