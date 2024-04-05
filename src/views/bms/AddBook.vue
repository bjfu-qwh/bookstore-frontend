<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {BookUpload, init} from "@/types/bms";
import AuthorSelector from "@/views/author/AuthorSelector.vue";
import BookTypeSelector from "@/views/bms/BookTypeSelector.vue";
import BookCategorySelector from "@/views/bms/BookCategorySelector.vue";
import {newBookFormRules} from "@/rules/bms";
import {Check, Plus} from "@element-plus/icons-vue";
import {FormInstance} from "element-plus";
import {uploadSingleBookImg} from "@/utils/oss";
import {uploadNewBook} from "@/api";

let book = ref<BookUpload>(init());

/**
 * 通过这些ref使用子组件数据
 */
let selectedAuthors = ref<InstanceType<typeof AuthorSelector> | null>(null);
let selectedBookType = ref<InstanceType<typeof BookTypeSelector> | null>(null);
let categorySelected = ref<InstanceType<typeof BookCategorySelector> | null>();
const newBookFormRef = ref<FormInstance>();

const checkNewBook = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  book.value.authors = <number[]>selectedAuthors?.value?.selectedAuthors;
  book.value.type = <string>selectedBookType?.value?.selectedBookType;
  book.value.categoryID = <string>categorySelected?.value?.categorySelected;
  await formEl.validate(async valid => {
    if (valid) {
      await uploadNewBook(book.value);
      book.value = init();
      selectedAuthors?.value?.clear();
      selectedBookType?.value?.clear();
      categorySelected?.value?.clear();
    }
  });
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
  <el-card>
    <el-form id="new-book-form" ref="newBookFormRef" :model="book"
             :rules="newBookFormRules"
             label-position="left"
             size="large" status-icon>
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
          <el-form-item prop="categoryID">
            <template #label>
              <span>图书分类</span>
              <el-tooltip
                  content="点击新增分类"
                  effect="dark"
                  placement="top-start">
                <el-button :icon="Plus" circle size="small" type="success"/>
              </el-tooltip>
            </template>
            <BookCategorySelector ref="categorySelected"></BookCategorySelector>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="authors">
            <template #label>
              <span>图书作者</span>
              <el-tooltip content="点击新增作者"
                          effect="dark"
                          placement="top-end">
                <el-button :icon="Plus" circle size="small" type="success"/>
              </el-tooltip>
            </template>
            <AuthorSelector ref="selectedAuthors"></AuthorSelector>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="页码" prop="page">
            <el-input v-model="book.page" min="1"
                      placeholder="请输入图书页码" type="number"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="图书价格" prop="price">
            <el-input v-model="book.price"
                      placeholder="请输入图书价格(￥)"
                      type="number"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="图书库存" prop="amount">
            <el-input v-model="book.amount" min="1" placeholder="请输入图书库存数"
                      type="number"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="图书装帧" prop="type">
            <BookTypeSelector ref="selectedBookType"></BookTypeSelector>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="版次信息" prop="edition">
            <el-input v-model="book.edition" placeholder="请输入图书版次"
                      type="text"/>
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
      </el-row>
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
  </el-card>
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