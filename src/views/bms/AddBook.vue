<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {BookUpload, init} from "@/types/bms";
import AuthorSelector from "@/views/author/AuthorSelector.vue";
import BookTypeSelector from "@/views/bms/BookTypeSelector.vue";
import BookCategorySelector from "@/components/BookCategorySelector.vue";
import {newBookFormRules} from "@/rules/bms";
import {Check, Plus} from "@element-plus/icons-vue";
import {FormInstance} from "element-plus";
import {uploadSingleBookImg} from "@/utils/oss";
import {uploadNewBook} from "@/api";

let book = ref<BookUpload>(init());

/**
 * 通过这个ref使用子组件数据
 */
const selectedAuthors = ref<number[] | undefined>();
const selectedBookType = ref<string>("");
const categorySelected = ref<number>();

const newBookFormRef = ref<FormInstance>();

/**
 * 表示图书装帧的数组集合
 */

const bookTypes = [
  {
    label: "平装",
  },
  {
    label: "精装",
  }, {
    label: "软精装",
  },
  {
    label: "线装"
  }
];

const checkNewBook = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  await formEl.validate(async valid => {
    if (valid) {
      await uploadNewBook(book.value);
    }
  })
}

const uploadBookUrl = async ({file}: any) => {
  const result = await uploadSingleBookImg({file});
  if (result !== "") {
    book.value.url = result;
  }
}


onMounted(() => {
  book.value = init();
});

</script>
<template>
  <el-form id="new-book-form" ref="newBookFormRef" :model="book"
           :rules="newBookFormRules" label-position="top">
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
      <el-col :span="8">
        <el-form-item label="图书分类" prop="categoryID">
          <BookCategorySelector ref="categorySelected"></BookCategorySelector>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出版日期" prop="published">
          <el-date-picker
              v-model="book.published"
              placeholder="选择图书的出版日期"
              type="date"
              value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="图书装帧" prop="type">
          <el-select id="new-book-type-selector"
                     v-model="book.type"
                     placeholder="请指定图书装帧">
            <el-option v-for="type in bookTypes" :key="type.label"
                       :label="type.label"
                       :value="type.label"></el-option>
          </el-select>
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
    <el-form-item prop="url">
      <el-upload
          :http-request="uploadBookUrl"
          :limit="1"
          :multiple="false"
          accept=".jpeg,.jpg,.png"
          action="#"
          class="avatar-uploader">
        <el-image v-if="book.url!==''"
                  :src="book.url" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item id="register-form-button-group">
      <el-button :icon="Check" type="primary"
                 width="100%"
                 @click="checkNewBook(newBookFormRef)">
        立即生成图书
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 100%;
  height: 178px;
  margin: 0 auto;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>