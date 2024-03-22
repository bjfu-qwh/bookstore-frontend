<script lang="ts" setup>
import {NewAuthorDTO, SelectedNation} from "@/types/author";
import {newAuthorFormRules} from "@/rules/author";
import {uploadSingleAuthorAvatar} from "@/utils/oss"
import {Check, Plus} from "@element-plus/icons-vue";
import {FormInstance} from "element-plus";
import {addAuthor} from "@/api";

let authorInfo = ref<NewAuthorDTO>({
  name: '',
  nation: '',
  url: '',
  brief: ''
} as NewAuthorDTO);

/**
 * 通过这个ref使用子组件数据
 */
const selectedNation = ref<SelectedNation>({
  selectedNation: ''
});

const newAuthorFormRef = ref<FormInstance>();

const checkNewAuthor = async (formEl: FormInstance | undefined) => {
  authorInfo.value.nation = selectedNation.value.selectedNation;
  if (!formEl) {
    return
  }
  await formEl.validate(async valid => {
    if (valid) {
      return await addAuthor(authorInfo.value);
    }
  })
}

async function uploadAuthorAvatar({file}: any) {
  const result = await uploadSingleAuthorAvatar({file});
  if (result !== "") {
    authorInfo.value.url = result;
  }
}
</script>

<template>
  <el-form id="new-author-form"
           ref="newAuthorFormRef"
           :model="authorInfo"
           :rules="newAuthorFormRules"
           label-position="top"
           label-width="auto"
           size="large"
           status-icon>
    <el-form-item id="new-author-form-name" label="姓名" prop="name">
      <el-input v-model="authorInfo.name" placeholder="请输入作者姓名"/>
    </el-form-item>
    <el-form-item id="new-author-form-nation" label="国籍" prop="nation">
      <NationSelector ref="selectedNation"></NationSelector>
    </el-form-item>
    <el-upload :http-request="uploadAuthorAvatar"
               :limit="1"
               :multiple="false"
               accept=".jpeg,.jpg,.png"
               action="#"
               class="avatar-uploader">
      <el-image v-if="authorInfo.url!==''"
                :src="authorInfo.url" class="avatar"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
    <el-form-item id="new-author-form-brief" label="简介" prop="brief">
      <el-input
          v-model="authorInfo.brief"
          :rows="2"
          placeholder="请输入作者生平"
          style="width: 100%"
          type="textarea">
      </el-input>
    </el-form-item>
    <el-form-item id="new-author-form-button-group">
      <el-button :icon="Check" type="primary"
                 width="100%"
                 @click="checkNewAuthor(newAuthorFormRef)">
        立即注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
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