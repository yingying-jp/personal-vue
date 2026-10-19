<template>
  <div class="login-wrap" :class="{ dark: isDark }">
    <el-card class="login-card" shadow="always">
      <template #header>
        <h2>身份认证</h2>
        <p class="sub">请输入管理员账号密码登录</p>
      </template>

      <!-- 登录表单：el-form -->
      <el-form :model="form" label-position="top" @submit.prevent>
        <el-form-item label="账号">
          <el-input
            v-model="form.account"
            placeholder="请输入账号"
            @keyup.enter="doLogin"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
            @keyup.enter="doLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round class="login-btn" @click="doLogin">登 录</el-button>
        </el-form-item>
      </el-form>

      <p class="hint">测试账号：admin &nbsp; 密码：123456</p>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user.js'

defineProps(['isDark'])
const router = useRouter()
const route = useRoute()

const form = reactive({ account: '', password: '' })

// 登录：调用用户 Store 的 action 完成校验与状态更新
const doLogin = () => {
  if (!form.account || !form.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }
  const userStore = useUserStore()
  if (userStore.login(form.account, form.password)) {
    ElMessage.success('登录成功')
    // 登录成功后跳回原本想去的页面，默认去后台
    const redirect = route.query.redirect || '/admin'
    router.push(redirect)
  } else {
    ElMessage.error('账号或密码错误，请重试')
  }
}
</script>

<style scoped>
.login-wrap {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 24px;
  padding: 12px 8px;
}
.login-card h2 {
  text-align: center;
  color: #4f467a;
  margin-bottom: 6px;
  font-size: 22px;
}
.login-wrap.dark .login-card h2 {
  color: #e0d8ff;
}
.sub {
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 4px;
}
.login-btn {
  width: 100%;
}
.hint {
  text-align: center;
  color: #c0c4cc;
  font-size: 12px;
  margin-top: 8px;
}
</style>
