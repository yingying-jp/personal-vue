import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user.js'

import Layout from '../views/Layout.vue'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import ProjectList from '../views/ProjectList.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import About from '../views/About.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import ArticleManage from '../views/ArticleManage.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '个人主页', requireAuth: false }
      },
      {
        path: 'project',
        name: 'Project',
        component: Project,
        meta: { title: '项目中心', requireAuth: false },
        children: [
          {
            path: '',
            name: 'ProjectList',
            component: ProjectList,
            meta: { title: '项目列表', requireAuth: false }
          },
          {
            path: ':id',
            name: 'ProjectDetail',
            component: ProjectDetail,
            meta: { title: '项目详情', requireAuth: false }
          }
        ]
      },
      {
        path: 'article',
        name: 'ArticleList',
        component: ArticleList,
        meta: { title: '文章列表', requireAuth: false }
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: ArticleDetail,
        meta: { title: '文章详情', requireAuth: false }
      },
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: { title: '关于我', requireAuth: false }
      },
      {
        path: 'admin',
        name: 'Admin',
        component: Admin,
        meta: { title: '后台管理', requireAuth: true }
      },
      {
        path: 'admin/articles',
        name: 'ArticleManage',
        component: ArticleManage,
        meta: { title: '文章管理', requireAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '身份认证', requireAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '页面不存在', requireAuth: false }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * 全局前置守卫：结合用户 Store 与路由 meta 实现访问控制
 * 注意：必须在守卫函数内部调用 useUserStore()，确保 Pinia 已完成初始化
 */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '个人主页系统'
  const userStore = useUserStore()
  if (to.meta.requireAuth && !userStore.isLogin) {
    // 把想去的页面地址存到 query，登录成功之后跳回去
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
