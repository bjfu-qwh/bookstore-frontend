<script lang="ts" setup>
import {inject, ref} from "vue";
import {CircleCloseFilled} from "@element-plus/icons-vue";
import AppendCategoryForm from "@/views/category/AppendCategoryForm.vue";
import {dialogVisible, parentCategoryID, updateDialog, updateParentID} from "@/types/category/key.ts";

const parent = inject(parentCategoryID, ref<string>(''));
const visible = inject(dialogVisible, ref<boolean>(false));
const updateVisible = inject(updateDialog, null);
const updateParent = inject(updateParentID, null);

function close() {
  if (updateVisible !== null) {
    updateVisible(false);
  }
  if (updateParent !== null) {
    updateParent('');
  }
}

defineExpose({
  visible, parent
});
</script>

<template>
  <el-dialog id="append-category-dialog"
             v-model="visible"
             :show-close="false">
    <template #header>
      <div class="append-category-dialog-header">
        <h4>请填写表单</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled/>
          </el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <AppendCategoryForm/>
  </el-dialog>
</template>

<style scoped>
.append-category-dialog-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
</style>