<template>
  <div style="max-width: 700px; margin: 40px auto; padding: 20px" :class="{ dark: isDark }">
    <el-card shadow="hover">
      <template #header>
        <h2 class="about-title">关于我</h2>
      </template>
      <p class="about-text">
        我是杨莹莹，24计科2班学生。本页面为 Vue3 路由 + Pinia 状态管理 + Element Plus
        组件库实验作业。
      </p>
      <el-divider />
      <div class="info-row">
        <el-tag effect="plain">Vue3</el-tag>
        <el-tag effect="plain" type="success">Pinia</el-tag>
        <el-tag effect="plain" type="warning">Vue Router</el-tag>
        <el-tag effect="plain" type="danger">Element Plus</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script setup>
defineProps(['isDark'])
</script>

<style scoped>
.about-title {
  margin: 0;
  color: #4f467a;
}
.dark .about-title {
  color: #e0d8ff;
}
.about-text {
  line-height: 1.9;
  color: #4b5563;
}
.dark .about-text {
  color: #cbd5e1;
}
.info-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
