<script lang="ts" setup>
import {onBeforeMount, ref, watch} from "vue";
import {Category} from "@/types/category";
import {Connection, DocumentAdd, Key, Message, Top} from "@element-plus/icons-vue";
import {addCategory, getByID} from "@/api/category";
import {appendCategoryFormRules} from "@/rules/category";
import {FormInstance} from "element-plus";
import {parentCategoryID} from "@/types/category/key.ts";

let parentCategoryName = ref<string>('');

let appendCategoryFormRef = ref<FormInstance>();

const parent = inject(parentCategoryID, ref<string>(''));

let category = ref<Category>({
  id: '',
  name: '',
  parent: parent.value
});

watch(
    parent,
    async () => {
      category.value.parent = parent.value;
      const result: Category | null = await getByID(parent.value);
      if (result !== null) {
        parentCategoryName.value = result.name;
      }
    }
);

onBeforeMount(async () => {
  const parent: Category | null = await getByID(category.value.parent);
  if (parent !== null) {
    parentCategoryName.value = parent.name;
  }
});

async function checkAndAppendCategory(formEl: FormInstance | undefined) {
  if (!formEl) {
    return
  }
  await formEl.validate(
      async valid => {
        if (valid) {
          await addCategory(category.value);
          parentCategoryName.value = '';
          category.value = {
            id: '',
            name: '',
            parent: ''
          };
        }
      }
  );
}
</script>

<template>
  <el-header id="append-category-header">
    添加子分类
  </el-header>
  <el-form id="append-category-form" ref="appendCategoryFormRef"
           :model="category"
           :rules="appendCategoryFormRules"
           label-position="left">
    <el-form-item label="分类ID" prop="id">
      <el-input v-model="category.id" :prefix-icon="Key" placeholder="请按一定格式输入分类id，如'cate_1'"/>
    </el-form-item>
    <el-form-item label="分类名称" prop="name">
      <el-input v-model="category.name" :prefix-icon="Message"
                placeholder="请输入分类名称"/>
    </el-form-item>
    <el-form-item label="父分类ID" prop="parent">
      <el-input v-model="category.parent" :prefix-icon="Top" readonly/>
    </el-form-item>
    <el-form-item label="父分类名称" prop="parentCategoryName">
      <el-input v-model="parentCategoryName" :prefix-icon="Connection" readonly/>
    </el-form-item>
    <el-form-item>
      <el-button :icon="DocumentAdd" size="large" style="width: 100%"
                 type="success"
                 @click="checkAndAppendCategory(appendCategoryFormRef)">追加分类
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
#append-category-header {
  font-size: larger;
  text-align: left;
}
</style>