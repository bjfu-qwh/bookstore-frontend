<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {BookUpload, init} from "@/types/bms";


let book = ref<BookUpload>(init());

onMounted(() => {
  book.value = init();
});
</script>
<template>
  <el-form id="new-book-form" :model="book">
    <el-form-item label="ISBN">
      <el-input v-model="book.isbn" placeholder="请输入图书ISBN"
                type="text"/>
    </el-form-item>
    <el-form-item label="图书名">
      <el-input v-model="book.name" placeholder="请输入图书名"
                type="text"/>
    </el-form-item>
    <el-form-item label="出版社">
      <el-input v-model="book.press" placeholder="请填写图书出版社"
                type="text"/>
    </el-form-item>

  </el-form>
</template>

<style scoped>

</style>