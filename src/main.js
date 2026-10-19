import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/theme.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册 Pinia（全局状态管理）
app.use(createPinia())
// 注册路由
app.use(router)
// 全局注册 Element Plus（实验阶段使用全局注册即可）
app.use(ElementPlus)

app.mount('#app')
