<template>
  <footer class="page-footer" :class="{ dark: isDark }">
    <p>{{ footerText }}</p>
  </footer>
</template>

<script setup>
const props = defineProps({
  footerText: {
    type: String,
    default: '©2026 个人主页｜Vue3实验作业'
  },
  isDark: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.page-footer {
  width: 100%;
  text-align: center;
  padding: 18px 20px;
  background: linear-gradient(90deg, #c9e8ff 0%, #ffd6ec 100%);
  color: #4f467a;
  font-size: 14px;
  box-shadow: 0 -4px 14px rgba(184, 224, 255, 0.45);
  transition: all 0.4s ease;
}
.page-footer.dark {
  background: linear-gradient(90deg, #7ea7d8 0%, #b78fb7 100%);
  color: #ffffff;
}
</style>
