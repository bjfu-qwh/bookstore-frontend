<script lang="ts" setup>
import {CircleCloseFilled} from "@element-plus/icons-vue";
import AppendCategoryForm from "@/views/category/AppendCategoryForm.vue";
import {ref, watchEffect} from "vue";

const props = defineProps<{
  parent: string,
  visible: boolean
}>();

const visible = ref<boolean>(false);
const parent = ref<string>('');

watchEffect(() => {
  visible.value = props.visible;
});

watchEffect(() => {
  parent.value = props.parent;
});

function close() {
  visible.value = false;
  parent.value = '';
}

defineExpose({
  visible, parent, close
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
    <AppendCategoryForm :parent="props.parent"/>
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