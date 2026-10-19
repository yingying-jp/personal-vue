<template>
  <div class="article-page" :class="{ dark: isDark }">
    <h2 class="page-title">文章列表</h2>

    <!-- 分类筛选 + 关键词搜索 -->
    <div class="toolbar">
      <el-select v-model="category" placeholder="全部分类" clearable style="width: 160px">
        <el-option v-for="c in categories" :key="c" :label="c" :value="c" />
      </el-select>
      <el-input
        v-model="keyword"
        placeholder="搜索文章标题或摘要..."
        clearable
        style="width: 260px"
      />
    </div>

    <el-row :gutter="20">
      <el-col v-for="art in filterArticles" :key="art.id" :xs="24" :sm="12" :md="8">
        <el-card shadow="hover" class="article-card">
          <template #header>
            <div class="card-head">
              <el-tag size="small" effect="plain">{{ art.category }}</el-tag>
              <span class="date">{{ art.date }}</span>
            </div>
          </template>
          <h3 class="title">{{ art.title }}</h3>
          <p class="summary">{{ art.summary }}</p>
          <template #footer>
            <div class="card-foot">
              <span class="author">作者：{{ art.author }}</span>
              <el-button type="primary" link @click="goDetail(art.id)">阅读全文</el-button>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <el-empty v-if="!filterArticles.length" description="暂无文章" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article.js'

defineProps(['isDark'])
const router = useRouter()

// storeToRefs 解构 state 与 getters，保持响应式
const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)
const { categories } = storeToRefs(articleStore)

const category = ref('')
const keyword = ref('')

// 组合筛选：分类 + 关键词
const filterArticles = computed(() => {
  let list = articleList.value
  if (category.value) list = list.filter((a) => a.category === category.value)
  if (keyword.value) {
    const kw = keyword.value.toLowerCase()
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(kw) || a.summary.toLowerCase().includes(kw)
    )
  }
  return list
})

const goDetail = (id) => {
  router.push({ name: 'ArticleDetail', params: { id } })
}
</script>

<style scoped>
.article-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}
.page-title {
  text-align: center;
  margin: 20px 0 24px;
  color: #4f467a;
}
.article-page.dark .page-title {
  color: #e0d8ff;
}
.toolbar {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.article-card {
  margin-bottom: 20px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date {
  font-size: 13px;
  color: #9ca3af;
}
.title {
  font-size: 17px;
  margin-bottom: 8px;
  color: #1f2937;
}
.article-page.dark .title {
  color: #f3f4f6;
}
.summary {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.7;
  min-height: 72px;
}
.article-page.dark .summary {
  color: #cbd5e1;
}
.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.author {
  font-size: 13px;
  color: #9ca3af;
}
</style>
