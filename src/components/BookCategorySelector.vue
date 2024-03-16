<script lang="ts" setup>
import {Category} from "@/types/category";
import {loadChildren, loadRoots} from "@/api/category";
import {CascaderOption, CascaderProps} from "element-plus";

let currentCategories = ref<Category[]>([]);
let selected = ref<[]>();

defineExpose({
  selected
});


function mapper(categories: Category[], level: number): CascaderOption[] {
  return categories.map((item: Category) => ({
    value: item.id,
    label: item.name,
    leaf: level >= 2,
  }));
}

const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const {level} = node
    if (level !== 0) {
      const children = await loadChildren(node.value);
      if (children !== null) {
        const nodes = mapper(children, level);
        resolve(nodes);
      }
    } else {
      const roots = await loadRoots();
      if (roots !== null) {
        currentCategories.value = roots;
      }
      resolve(mapper(currentCategories.value, level));
    }
  },
}
</script>

<template>
  <el-cascader id="category-selector"
               v-model="selected"
               :props="props"
               placeholder="请选择一个图书分类"
               @change="console.log(selected)">

  </el-cascader>
</template>

<style scoped>

</style>