<template>
  <el-container class="layout">
    <!-- 顶部：标题 + 菜单导航 -->
    <el-header class="layout-header" height="auto">
      <MyHeader :title="$route.meta.title" :is-dark="isDark" />
      <div class="nav-row">
        <el-menu
          mode="horizontal"
          router
          :default-active="activeMenu"
          :ellipsis="false"
          class="nav-menu"
        >
          <el-menu-item index="/home">个人主页</el-menu-item>
          <el-menu-item index="/project">项目展示</el-menu-item>
          <el-menu-item index="/article">文章列表</el-menu-item>
          <el-menu-item index="/about">关于我</el-menu-item>
          <el-sub-menu index="/admin">
            <template #title>后台管理</template>
            <el-menu-item index="/admin">个人与项目管理</el-menu-item>
            <el-menu-item index="/admin/articles">文章管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item :index="userStore.isLogin ? '/home' : '/login'" @click="onUserNav">
            {{ userStore.isLogin ? '退出登录' : '登录' }}
          </el-menu-item>
        </el-menu>
        <el-button round @click="onChangeTheme">
          {{ isDark ? '切换亮色' : '切换暗色' }}
        </el-button>
      </div>
    </el-header>

    <!-- 主体内容 -->
    <el-main class="main-content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :is-dark="isDark" @change-theme="onChangeTheme" />
      </RouterView>
    </el-main>

    <!-- 底部 -->
    <el-footer class="layout-footer" height="auto">
      <MyFooter footer-text="©2026 个人主页｜Vue3实验作业 · Pinia · Element Plus" :is-dark="isDark" />
    </el-footer>
  </el-container>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import MyHeader from '../components/MyHeader.vue'
import MyFooter from '../components/MyFooter.vue'
import { useUserStore } from '../stores/user.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const { isDark, onChangeTheme } = inject('darkState')

// 菜单高亮跟随当前路由
const activeMenu = computed(() => route.path)

// 登录 / 退出登录
const onUserNav = () => {
  if (userStore.isLogin) {
    userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/home')
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
}
.layout-header {
  padding: 0;
}
.nav-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  padding: 10px 20px 12px;
}
.nav-menu {
  border-bottom: none;
  background: transparent;
}
.layout-header :deep(.el-menu--horizontal > .el-menu-item),
.layout-header :deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
  border-radius: 24px;
  margin: 0 4px;
  height: 40px;
  line-height: 40px;
}
.main-content {
  flex: 1;
  padding: 30px 20px;
}
.layout-footer {
  padding: 0;
}
</style>
