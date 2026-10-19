<template>
  <div class="detail-box" :class="{ dark: isDark }">
    <el-card v-if="currentProj" shadow="hover">
      <template #header>
        <div class="head">
          <h2>{{ currentProj.name }}</h2>
          <el-tag effect="plain">项目 ID：{{ currentProj.id }}</el-tag>
        </div>
      </template>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="项目简介">
          {{ currentProj.desc }}
        </el-descriptions-item>
        <el-descriptions-item label="技术栈">
          <div class="tag-wrap">
            <el-tag v-for="t in currentProj.tags" :key="t" size="small" round>{{ t }}</el-tag>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="详细介绍">
          {{ currentProj.detail }}
        </el-descriptions-item>
      </el-descriptions>

      <template #footer>
        <div class="btns">
          <el-button @click="goBack">返回上一页</el-button>
          <el-button type="primary" @click="goList">返回项目列表</el-button>
        </div>
      </template>
    </el-card>

    <el-result v-else icon="warning" title="无效项目ID" sub-title="没有找到该项目">
      <template #extra>
        <el-button type="primary" @click="goList">回到项目列表</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/project.js'

defineProps(['isDark'])
const route = useRoute()
const router = useRouter()

// 通过 getter 按 id 查找项目
const projectStore = useProjectStore()
const currentProj = computed(() => projectStore.getProjectById(route.params.id))

const goBack = () => router.go(-1)
const goList = () => router.replace({ name: 'ProjectList' })
</script>

<style scoped>
.detail-box {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.btns {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
