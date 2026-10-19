import { defineStore } from 'pinia'

const STORAGE_KEY = 'personal_article_store'

const DEFAULT_ARTICLES = [
  {
    id: 1,
    title: 'Vue3 组合式 API 入门',
    category: '前端技术',
    author: '杨莹莹',
    date: '2026-09-12',
    summary: '从 setup 语法糖出发，介绍 ref、reactive、computed 等组合式 API 的核心用法与适用场景。',
    content:
      'Vue3 引入组合式 API（Composition API）后，组件逻辑可以按功能聚合而不是按选项分散，代码复用与可维护性都大幅提升。\n\n' +
      'ref 用于包装基本类型，reactive 用于包装对象；computed 负责派生状态；watch 负责监听变化。组合式函数（useXxx）可以把一段完整逻辑抽离出来，在多个组件间复用。\n\n' +
      '本项目中的页面均使用 <script setup> 语法编写，配合 defineProps、defineEmits、defineModel 完成组件通信。'
  },
  {
    id: 2,
    title: 'Pinia 状态管理与持久化实践',
    category: '前端技术',
    author: '杨莹莹',
    date: '2026-09-28',
    summary: '使用 Pinia 组织全局共享状态，通过 state、getters、actions 管理数据流，并手写 localStorage 实现持久化。',
    content:
      'Pinia 是 Vue 官方推荐的全局状态管理库，一个 Store 由三部分组成：state 存放响应式数据，getters 基于 state 派生计算值并带缓存，actions 是唯一推荐的状态修改入口，支持同步与异步操作。\n\n' +
      '在组件中直接解构 Store 会丢失响应性，因此需要使用 storeToRefs 把 state 和 getters 包装为 ref 后再解构，而 actions 可以直接解构使用。\n\n' +
      'Pinia 本身不提供持久化能力。本项目在 state 初始化时从 localStorage 读取已保存的值，并在每个 action 修改状态后通过 persist() 写回 localStorage，从而在页面刷新后恢复数据。'
  },
  {
    id: 3,
    title: 'Element Plus 组件库使用笔记',
    category: '前端技术',
    author: '杨莹莹',
    date: '2026-10-08',
    summary: '记录 Element Plus 的引入方式与常用组件：布局、菜单、卡片、表单、表格、对话框、时间线等。',
    content:
      'Element Plus 是一套基于 Vue3 的桌面端组件库。实验阶段采用全局注册：在 main.js 中一次性引入全部组件与样式，再配合暗色主题样式变量即可切换暗色模式。\n\n' +
      '常用组件包括：el-container 系列布局、el-menu 导航菜单、el-card 卡片、el-form 表单、el-table 表格、el-dialog 对话框、el-timeline 时间线、el-tag 标签等。组件大多通过属性（props）控制外观、通过事件（events）交互、通过插槽（slots）自定义内容。'
  },
  {
    id: 4,
    title: '我的个人主页项目总结',
    category: '项目实践',
    author: '杨莹莹',
    date: '2026-10-15',
    summary: '从实验三到实验四：组件化、路由、Pinia 状态管理与 Element Plus 重构的完整过程回顾。',
    content:
      '个人主页项目以 Vue3 + Vite 搭建。实验三完成了组件拆分、父子通信与插槽练习；实验四引入 Pinia 管理用户、项目、文章三类全局状态，并通过路由守卫实现后台页面的登录访问控制，最后使用 Element Plus 对界面进行整体重构。\n\n' +
      '通过本实验，我理解了全局状态管理的必要性，掌握了 storeToRefs 的响应式解构、localStorage 手动持久化，以及路由守卫与 Store 配合实现认证的完整流程。'
  }
]

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function deepClone(list) {
  return JSON.parse(JSON.stringify(list))
}

/**
 * 文章 Store
 * - state：articleList（文章列表，首次从默认数据或 localStorage 恢复）
 * - getters：articleCount、getArticleById、categories
 * - actions：addArticle/updateArticle/removeArticle，修改后同步 localStorage
 */
export const useArticleStore = defineStore('article', {
  state: () => ({
    articleList: readStorage()?.articleList ?? deepClone(DEFAULT_ARTICLES)
  }),
  getters: {
    articleCount: (state) => state.articleList.length,
    getArticleById: (state) => (id) => state.articleList.find((a) => a.id === Number(id)),
    categories: (state) => [...new Set(state.articleList.map((a) => a.category))]
  },
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ articleList: this.articleList }))
    },
    /** 新增文章，返回新 id */
    addArticle(payload) {
      const nextId = this.articleList.length
        ? Math.max(...this.articleList.map((a) => a.id)) + 1
        : 1
      this.articleList.push({ id: nextId, ...payload })
      this.persist()
      return nextId
    },
    /** 按 id 更新文章 */
    updateArticle(id, payload) {
      const idx = this.articleList.findIndex((a) => a.id === Number(id))
      if (idx > -1) {
        this.articleList[idx] = { ...this.articleList[idx], ...payload }
        this.persist()
        return true
      }
      return false
    },
    /** 按 id 删除文章 */
    removeArticle(id) {
      const idx = this.articleList.findIndex((a) => a.id === Number(id))
      if (idx > -1) {
        this.articleList.splice(idx, 1)
        this.persist()
        return true
      }
      return false
    }
  }
})
