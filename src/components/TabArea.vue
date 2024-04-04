<script lang="ts" setup>
import {ref} from "vue";
import {RouteItem} from "@/types/util/type";
import {ElMessage, TabPaneName, TabsPaneContext} from "element-plus";
import {useTabsStore} from "@/stores/tabs.ts";
import {goto, gotoHome} from "@/router/methods.ts";
import {PATH_HOME} from "@/router/path.ts";

const editableTabsValue = ref<string>('')
let tabItems = useTabsStore().tabList;

defineExpose({
  editableTabsValue
});

const handleTabClick = async (tab: TabsPaneContext) => {
  editableTabsValue.value = tab.paneName as string;
  await goto(tab.paneName as string);
}

const handleTabClose = async (
    targetName: TabPaneName | undefined
) => {
  if (tabItems.length === 1) {
    return ElMessage.info("至少保留一个页面喔");
  }
  const tabs = tabItems;
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
  tabItems = tabItems.filter((tab: RouteItem) => tab.path !== targetName);
  useTabsStore().tabList = tabItems;
  if (tabItems.length === 0) {
    editableTabsValue.value = PATH_HOME;
    return await gotoHome();
  }
  editableTabsValue.value = activeName;
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
        :label="item.title"
        :name="item.path">
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>

</style>