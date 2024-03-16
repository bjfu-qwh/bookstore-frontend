<script lang="ts" setup>
/**
 * 图书装帧。用装帧名表示label和value
 */
interface BookType {
  label: string
}

let selectedBookType = ref<string>("");
defineExpose({
  selectedBookType
})

const types: BookType[] = [
  {
    label: "平装"
  }, {
    label: "精装"
  }, {
    label: "线状",
  }, {
    label: "软精装"
  }
]
</script>

<template>
  <el-select id="book-type-selector"
             v-model="selectedBookType"
             filterable
             placeholder="请选择图书装帧类型">
    <el-option v-for="type in types"
               :key="type.label"
               :label="type.label"
               :value="type.label"/>
  </el-select>
</template>

<style scoped>

</style>