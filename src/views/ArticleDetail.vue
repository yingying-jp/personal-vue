<template>
  <div class="article-detail" :class="{ dark: isDark }">
    <el-card v-if="currentArticle" shadow="hover" class="detail-card">
      <template #header>
        <div class="head">
          <h2>{{ currentArticle.title }}</h2>
        </div>
      </template>

      <div class="meta">
        <el-tag size="small" effect="plain">{{ currentArticle.category }}</el-tag>
        <span>作者：{{ currentArticle.author }}</span>
        <span>日期：{{ currentArticle.date }}</span>
      </div>

      <el-divider />

      <p class="content">{{ currentArticle.content }}</p>

      <template #footer>
        <div class="btns">
          <el-button @click="goBack">返回上一页</el-button>
          <el-button type="primary" @click="goList">返回文章列表</el-button>
        </div>
      </template>
    </el-card>

    <el-result v-else icon="warning" title="无效文章ID" sub-title="没有找到该文章">
      <template #extra>
        <el-button type="primary" @click="goList">回到文章列表</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article.js'

defineProps(['isDark'])
const route = useRoute()
const router = useRouter()

// 通过 getter 按 id 查找文章
const articleStore = useArticleStore()
const currentArticle = computed(() => articleStore.getArticleById(route.params.id))

const goBack = () => router.go(-1)
const goList = () => router.replace({ name: 'ArticleList' })
</script>

<style scoped>
.article-detail {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
}
.head h2 {
  color: #1f2937;
}
.article-detail.dark .head h2 {
  color: #f3f4f6;
}
.meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #9ca3af;
}
.content {
  font-size: 15px;
  line-height: 2;
  color: #4b5563;
  white-space: pre-line;
}
.article-detail.dark .content {
  color: #cbd5e1;
}
.btns {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
