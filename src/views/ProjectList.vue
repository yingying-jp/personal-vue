<template>
  <div class="project-page" :class="{ dark: isDark }">
    <h2 class="page-title">项目作品</h2>
    <el-row :gutter="20">
      <el-col v-for="proj in projectList" :key="proj.id" :xs="24" :sm="12">
        <el-card shadow="hover" class="project-card">
          <template #header>
            <div class="card-head">
              <strong>{{ proj.name }}</strong>
              <el-tag size="small" effect="plain">{{ proj.tags.length }} 项技术</el-tag>
            </div>
          </template>
          <p class="desc">{{ proj.desc }}</p>
          <div class="tag-wrap">
            <el-tag v-for="t in proj.tags" :key="t" size="small" effect="light" round>
              {{ t }}
            </el-tag>
          </div>
          <template #footer>
            <el-button type="primary" round size="small" @click="goDetail(proj.id)">
              查看详情
            </el-button>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <el-empty v-if="!projectList.length" description="暂无项目" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useProjectStore } from '../stores/project.js'

defineProps(['isDark'])
const router = useRouter()

// storeToRefs 解构 state，保持响应式
const projectStore = useProjectStore()
const { projectList } = storeToRefs(projectStore)

const goDetail = (id) => {
  router.push({ name: 'ProjectDetail', params: { id } })
}
</script>

<style scoped>
.project-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}
.page-title {
  text-align: center;
  margin: 20px 0 24px;
  color: #4f467a;
}
.project-page.dark .page-title {
  color: #e0d8ff;
}
.project-card {
  margin-bottom: 20px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
.desc {
  color: #4b5563;
  line-height: 1.7;
  min-height: 48px;
}
.project-page.dark .desc {
  color: #cbd5e1;
}
.tag-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
</style>
