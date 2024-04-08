<script lang="ts" setup>
import {provide, ref} from "vue";
import {Category} from "@/types/category";
import {loadChildren, loadRoots} from "@/api/category";
import type Node from 'element-plus/es/components/tree/src/model/node'
import {Delete, DocumentAdd} from "@element-plus/icons-vue";
import AppendCategoryDialog from "@/views/category/AppendCategoryDialog.vue";
import {dialogVisible, parentCategoryID, updateDialog, updateParentID} from "@/types/category/key.ts";

const props = {
  label: 'name',
}

const loadCategories = async (node: Node, resolve: (data: Category[]) => void) => {
  if (node.level === 0) {
    const roots = await loadRoots();
    if (roots !== null) {
      return resolve(roots);
    }
  }
  if (node.level >= 1) {
    const children = await loadChildren(node.data.id);
    if (children !== null) {
      return resolve(children);
    }
  }
}

let categoryIDToAppend = ref<string>('');

let appendCategoryDialogVisible = ref<boolean>(false);

provide(
    parentCategoryID,
    categoryIDToAppend
);

provide(
    dialogVisible,
    appendCategoryDialogVisible
);

provide(
    updateDialog,
    updateDialogVisible
);

provide(
    updateParentID,
    updateParent
);

function updateDialogVisible(visible: boolean) {
  appendCategoryDialogVisible.value = visible;
}

function updateParent(parentID: string) {
  categoryIDToAppend.value = parentID;
}

function append(data: Category) {
  categoryIDToAppend.value = data.id;
  appendCategoryDialogVisible.value = true;
}

async function deleteCategory(data: Category) {
  console.log(data.id);
}

</script>

<template>
  <el-header id="category-table-header">
    图书分类列表
  </el-header>
  <el-tree id="category-table-tree"
           :expand-on-click-node="false"
           :load="loadCategories"
           :props="props"
           accordion
           lazy>
    <template #default="{ node, data }">
        <span class="category-tool">
          <span class="category-id">{{ node.data.id }}</span>
          <span class="category-name">{{ node.label }}</span>
          <span>
            <el-link :icon="DocumentAdd" :underline="false"
                     class="category-tool-append"
                     type="success" @click.prevent="append(data)"> 追加 </el-link>
            <el-link :icon="Delete" :underline="false" class="category-tool-delete"
                     type="danger" @click.prevent="deleteCategory(data)"> 删除 </el-link>
          </span>
        </span>
    </template>
  </el-tree>
  <AppendCategoryDialog/>
</template>

<style scoped>
#category-table-header {
  font-size: larger;
  text-align: left;
  margin-left: 8px;
}

#category-table-tree {
  border-radius: 0.5rem;
}

.category-tool {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: large;
  padding-right: 8px;
}

.category-tool-append {
  font-size: large;
}

.category-name {
  font-family: "Microsoft YaHei", serif, sans-serif;
}

.category-tool-delete {
  margin-left: 8px;
  font-size: large;
}
</style>