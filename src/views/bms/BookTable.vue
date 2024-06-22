<script lang="ts" setup>
import {BookVO} from "@/types";
import {ref} from "vue"
import {formatAuthors, getBookTable} from "@/api";
import {formatCategories} from "@/api/category";

let bookTableData = ref<BookVO[]>();
let pageID = ref<number>(1);
let pageSize = ref<number>(5);
onMounted(async () => {
  let data = await getBookTable(pageID.value, pageSize.value);
  bookTableData.value = data.data;
})
</script>

<template>
  <div id="book-table-container">
    <el-table id="book-table" :data="bookTableData">
      <el-table-column fixed="left" label="ISBN" prop="isbn"/>
      <el-table-column label="图书图片">
        <template v-slot="scope">
          <el-image :src="scope.row.url" mode="aspectFill"/>
        </template>
      </el-table-column>
      <el-table-column label="图书名" prop="bookName"/>
      <el-table-column label="出版社" prop="press"/>
      <el-table-column label="作者">
        <template v-slot="scope">
          <span>
            {{ formatAuthors(scope.row.authors) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="分类">
        <template v-slot="scope">
          <span>
            {{ formatCategories(scope.row.categories) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template v-slot="scope">
          <span>
            ￥{{ scope.row.price.toFixed(2) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="更多">
        <template #default>
          <el-button link size="small" type="primary">
            详情
          </el-button>
          <el-button link size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>