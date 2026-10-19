<template>
  <header class="page-header" :class="{dark: isDark}">
    <h3>{{ title }}</h3>
  </header>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "个人信息展示页面"
  },
  isDark:{
    type:Boolean,
    default:false
  }
})
</script>

<style scoped>
.page-header {
  width: 100%;
  background: linear-gradient(90deg, #c9e8ff 0%, #ffd6ec 100%);
  color: #4f467a;
  text-align: center;
  padding: 18px 20px;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 14px rgba(184, 224, 255, 0.45);
  transition: all 0.4s ease;
}
.page-header.dark {
  background: linear-gradient(90deg, #7ea7d8 0%, #b78fb7 100%);
  color: #ffffff;
}
</style>
