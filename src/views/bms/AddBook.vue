<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {BookUpload, init} from "@/types/bms";
import AuthorSelector from "@/views/author/AuthorSelector.vue";
import BookTypeSelector from "@/views/bms/BookTypeSelector.vue";
import BookCategorySelector from "@/components/BookCategorySelector.vue";

let book = ref<BookUpload>(init());

/**
 * 通过这个ref使用子组件数据
 */
const selectedAuthors = ref<number[] | undefined>();
const selectedBookType = ref<string>("");
const categorySelected = ref<number>();

onMounted(() => {
  book.value = init();
});

</script>
<template>
  <el-form id="new-book-form" :model="book" label-position="top">
    <el-form-item label="ISBN" prop="isbn">
      <el-input v-model="book.isbn" placeholder="请输入图书ISBN"
                type="text"/>
    </el-form-item>
    <el-form-item label="图书名" prop="name">
      <el-input v-model="book.name" placeholder="请输入图书名"
                type="text"/>
    </el-form-item>
    <el-form-item label="出版社" prop="press">
      <el-input v-model="book.press" placeholder="请填写图书出版社"
                type="text"/>
    </el-form-item>
    <el-row>
      <el-col :span="11">
        <el-form-item label="图书分类" prop="categoryID">
          <BookCategorySelector ref="categorySelected"></BookCategorySelector>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="出版日期" prop="published">
          <el-date-picker
              v-model="book.published"
              placeholder="选择图书的出版日期"
              type="date"
              value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="作家" prop="authors">
      <AuthorSelector ref="selectedAuthors"></AuthorSelector>
    </el-form-item>
    <el-form-item label="页码" prop="page">
      <el-input v-model="book.page" min="1"
                placeholder="请输入图书页码" type="number"/>
    </el-form-item>
    <el-form-item label="图书价格" prop="price">
      <el-input v-model="book.price"
                placeholder="请输入图书价格(￥)"
                type="number"/>
    </el-form-item>
    <el-form-item label="版次信息" prop="edition">
      <el-input v-model="book.edition" placeholder="请输入图书版次"
                type="text"/>
    </el-form-item>
    <el-form-item label="图书装帧" prop="type">
      <BookTypeSelector ref="selectedBookType"></BookTypeSelector>
    </el-form-item>
    <el-form-item label="图书库存" prop="amount">
      <el-input v-model="book.amount" min="1" placeholder="请输入图书库存数"
                type="number"/>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>