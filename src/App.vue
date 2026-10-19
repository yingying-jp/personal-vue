<template>
  <!-- 路由出口交给Layout内部管理，App只做最外层暗黑状态管理 -->
  <div class="page-wrap" :class="{ dark: isDark }">
    <!-- 浅蓝浅粉水彩晕染背景光斑 -->
    <div class="bg-blobs" aria-hidden="true">
      <span class="blob blob-blue"></span>
      <span class="blob blob-pink"></span>
      <span class="blob blob-violet"></span>
    </div>

    <RouterView @change-theme="onChangeTheme" :is-dark="isDark" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

// 全局暗黑状态，provide注入给子页面
const isDark = ref(false)

const onChangeTheme = () => {
  isDark.value = !isDark.value
  // 自定义样式走 body.dark
  document.body.classList.toggle('dark', isDark.value)
  // Element Plus 暗色模式要求切换 html.dark
  document.documentElement.classList.toggle('dark', isDark.value)
}

// 向下提供主题状态、修改方法
provide('darkState', {
  isDark,
  onChangeTheme
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  font-family: "Microsoft YaHei", system-ui, sans-serif;
  background: linear-gradient(135deg, #eaf6ff 0%, #ffeef8 100%);
  transition: background 0.4s ease, color 0.4s ease;
}
body.dark {
  background: linear-gradient(135deg, #1c2538 0%, #272b3b 100%);
}
.page-wrap {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
/* 内容层级位于光斑之上 */
.page-wrap > .el-container {
  position: relative;
  z-index: 1;
}

/* ---------- 水彩晕染光斑 ---------- */
.bg-blobs {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}
.blob-blue {
  width: 46vw;
  height: 46vw;
  left: -10vw;
  top: -8vw;
  background: radial-gradient(circle, #d0e4ff 0%, transparent 68%);
  animation: blobFloat 18s ease-in-out infinite;
}
.blob-pink {
  width: 42vw;
  height: 42vw;
  right: -8vw;
  bottom: -10vw;
  background: radial-gradient(circle, #ffd9ec 0%, transparent 68%);
  animation: blobFloat 22s ease-in-out infinite reverse;
}
.blob-violet {
  width: 30vw;
  height: 30vw;
  left: 38vw;
  top: 30vh;
  background: radial-gradient(circle, #dcd6ff 0%, transparent 68%);
  opacity: 0.35;
  animation: blobFloat 26s ease-in-out infinite;
}
@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(3vw, -2vh) scale(1.08); }
  66% { transform: translate(-2vw, 2vh) scale(0.94); }
}
/* 暗色模式下光斑调暗 */
.page-wrap.dark .blob-blue {
  background: radial-gradient(circle, #2e4670 0%, transparent 68%);
  opacity: 0.45;
}
.page-wrap.dark .blob-pink {
  background: radial-gradient(circle, #4a2f46 0%, transparent 68%);
  opacity: 0.45;
}
.page-wrap.dark .blob-violet {
  background: radial-gradient(circle, #38325a 0%, transparent 68%);
  opacity: 0.35;
}
</style>
