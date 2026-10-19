<template>
  <div class="project-page" :class="{dark:isDark}">
    <h2 class="page-title">📂我的项目作品展示</h2>

    <ProjectCard
      v-for="proj in projectList"
      :key="proj.id"
      :project="proj"
      :is-dark="isDark"
    >
      <template #card-title>
        <h3>{{ proj.name }}</h3>
      </template>
      <p>{{ proj.desc }}</p>
      <template #tag="{ item }">
        <span class="tag" v-for="t in item.tags" :key="t">{{t}}</span>
      </template>
      <template #card-actions>
        <!-- 删除源代码，只保留查看详情，点击触发弹窗 -->
        <button class="btn" @click="openDialog(proj)">查看详情</button>
      </template>
    </ProjectCard>

    <!-- 项目详情弹窗 -->
    <div v-if="dialogVisible" class="dialog-mask" @click.self="closeDialog">
      <div class="dialog-box" :class="{dark:isDark}">
        <div class="dialog-header">
          <h3>{{ currentProject.name }}</h3>
          <button class="close-btn" @click="closeDialog">×</button>
        </div>
        <div class="dialog-content">
          <h4>📖项目详细介绍</h4>
          <p>{{ currentProject.detail }}</p>

          <h4>🛠技术栈</h4>
          <div class="tag-wrap">
            <span class="tag" v-for="t in currentProject.tags" :key="t">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import ProjectCard from './ProjectCard.vue'
const props = defineProps({
  isDark: Boolean
})

// 项目数据：新增detail字段；修改第一个项目描述为Java纯后端
const projectList = ref([
  {
    id:1,
    name:"大学生积分管理系统",
    desc:"纯后端项目，使用Java语言开发，MySQL数据库保存业务数据，不包含前端页面。",
    tags:["Java","MySQL","SpringBoot"],
    detail:"本项目为纯后端服务项目，基于SpringBoot框架开发，没有前端页面。实现学生信息维护、学生积分录入、积分变更记录、积分排名统计、权限控制接口。全部通过接口对外提供服务，数据持久化存储于MySQL数据库，完成业务逻辑处理与数据校验。"
  },
  {
    id:2,
    name:"智慧仓储管理系统",
    desc:"仓库物品出入库管理，库存统计，数据查询，表单管理",
    tags:["HTML","JS","MySQL"],
    detail:"实现仓库货物入库、出库操作，库存余量实时统计，货物分类管理，条件筛选查询，表单录入，数据持久化保存。方便仓库管理员完成日常仓储业务，简化手工台账操作。"
  },
  {
    id:3,
    name:"个人主页Vue实验项目",
    desc:"Vue3组件化练习，父子通信、插槽、暗黑主题切换",
    tags:["Vue3","组件化","插槽"],
    detail:"Vue3组合式API实验项目；完成组件拆分，使用defineProps、defineEmits、defineModel完成父子通信；练习默认插槽、具名插槽、作用域插槽；实现亮色/暗色主题切换、个人信息展示、项目展示两大模块。"
  }
])

//弹窗状态
const dialogVisible = ref(false)
const currentProject = ref({})

//打开弹窗，赋值当前点击的项目
const openDialog = (proj)=>{
  currentProject.value = proj
  dialogVisible.value = true
}
//关闭弹窗
const closeDialog = ()=>{
  dialogVisible.value = false
}
</script>

<style scoped>
.project-page{
  max-width:900px;
  margin: 40px auto;
  padding:0 20px;
}
.page-title{
  text-align:center;
  margin-bottom:30px;
  font-size:24px;
}
.tag{
  display:inline-block;
  background:#cfe9ff;
  color:#334155;
  padding:4px 12px;
  border-radius:20px;
  margin-right:8px;
  font-size:13px;
}
.project-page.dark .tag{
  background:#475570;
  color:#e2e8f0;
}
.btn{
  padding:7px 14px;
  border:none;
  border-radius:20px;
  background:linear-gradient(90deg,#c9e8ff,#ffd6ec);
  color:#4f467a;
  cursor:pointer;
}
.project-page.dark .btn{
  background: linear-gradient(90deg, #7ea7d8 0%, #b78fb7 100%);
  color:#ffffff;
}

/*弹窗遮罩层*/
.dialog-mask{
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background:rgba(0,0,0,0.45);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:999;
}
.dialog-box{
  width:520px;
  max-width:90%;
  background:#ffffff;
  border-radius:16px;
  overflow:hidden;
}
.dialog-box.dark{
  background:#2c3446;
  color:#eee;
}
.dialog-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:16px 20px;
  background:linear-gradient(90deg,#c9e8ff,#ffd6ec);
  color:#4f467a;
}
.dialog-box.dark .dialog-header{
  background: linear-gradient(90deg, #7ea7d8 0%, #b78fb7 100%);
  color:#fff;
}
.close-btn{
  font-size:24px;
  cursor:pointer;
  border:none;
  background:transparent;
}
.dialog-content{
  padding:20px;
}
.dialog-content h4{
  margin:12px 0 8px;
}
.tag-wrap{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}
</style>
