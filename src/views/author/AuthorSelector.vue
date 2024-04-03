<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {showNation} from "@/utils/info/nation.ts";
import {AuthorSelectItem} from "@/types/author";
import {allAuthorSelectorItem} from "@/api";


let selectedAuthors = ref<number[]>([]);

defineExpose({
  selectedAuthors
})

let authors = ref<AuthorSelectItem[]>([]);

onMounted(async () => {
  const result = await allAuthorSelectorItem();
  if (result !== null) {
    authors.value = result;
  }
})

</script>

<template>
  <el-select id="author-selector"
             v-model="selectedAuthors"
             filterable
             multiple
             placeholder="请选择一个以上的作家信息">
    <el-option
        v-for="author in authors" :key="author.id"
        :label="author.name"
        :value="author.id">
      <span class="author-item-name-label">{{ author.name }}</span>
      <span class="author-item-nation-label">{{ showNation(author.nation) }}</span>
    </el-option>
  </el-select>
</template>

<style scoped>
.author-item-name-label {
  float: left;
}

.author-item-nation-label {
  float: right;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
</style>