<template>
  <div style="max-width: 600px; margin: 60px auto; padding: 20px">
    <el-result icon="404" title="404" sub-title="访问的页面不存在">
      <template #extra>
        <el-button type="primary" @click="$router.push('/home')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
</script>
