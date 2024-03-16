<script lang="ts" setup>
import {nations} from "@/config/nation.ts";
import {ref} from "vue";

let selectedNation = ref<string>("");
defineExpose({
  selectedNation
});

</script>

<template>
  <el-select id="nation-selector"
             v-model="selectedNation"
             filterable
             placeholder="请选择一个国家">
    <el-option
        v-for="nation in nations"
        :key="nation.label"
        :label="nation.label"
        :value="nation.label"
    />
  </el-select>
</template>

<style scoped>

</style>