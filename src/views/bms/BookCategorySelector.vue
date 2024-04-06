<script lang="ts" setup>
import {Category} from "@/types/category";
import {ref} from "vue";
import {loadChildren, loadRoots} from "@/api/category";
import {CascaderOption, CascaderProps} from "element-plus";

let currentCategories = ref<Category[]>([]);
let categorySelected = ref<string[]>([]);

defineExpose({
  categorySelected, clear
});

function clear() {
  categorySelected.value = [];
}

function mapper(categories: Category[]): CascaderOption[] {
  return categories.map((item: Category) => ({
    value: item.id,
    label: item.name,
    leaf: false
  }));
}

const props: CascaderProps = {
  lazy: true,
  checkStrictly: true,
  async lazyLoad(node, resolve) {
    const {level} = node
    if (level !== 0) {
      const children = await loadChildren(node.value);
      if (children !== null) {
        const nodes = mapper(children);
        resolve(nodes);
      }
    } else {
      const roots = await loadRoots();
      if (roots !== null) {
        currentCategories.value = roots;
      }
      resolve(mapper(currentCategories.value));
    }
  },
}

</script>

<template>
  <el-cascader id="category-selector"
               v-model="categorySelected"
               :props="props"
               clearable
               filterable
               placeholder="请选择一个图书分类">

  </el-cascader>
</template>

<style scoped>

</style>