<template>
  <div class="manage-page" :class="{ dark: isDark }">
    <el-card shadow="hover">
      <template #header>
        <div class="card-head">
          <span>文章管理（共 {{ articleCount }} 篇）</span>
          <el-button type="primary" round @click="openAdd">新增文章</el-button>
        </div>
      </template>

      <!-- 文章列表：el-table -->
      <el-table :data="articleList" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="标题" min-width="180" show-overflow-tooltip />
        <el-table-column prop="category" label="分类" width="110">
          <template #default="{ row }">
            <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="100" />
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="openEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="delArticle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增 / 编辑弹窗：el-dialog + el-form -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑文章' : '新增文章'"
      width="560px"
      destroy-on-close
    >
      <el-form :model="articleForm" label-width="70px">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="articleForm.category" placeholder="请选择分类" style="width: 100%">
            <el-option label="前端技术" value="前端技术" />
            <el-option label="项目实践" value="项目实践" />
            <el-option label="学习笔记" value="学习笔记" />
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="articleForm.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="articleForm.date"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择日期"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="articleForm.summary" type="textarea" :rows="2" placeholder="请输入摘要" />
        </el-form-item>
        <el-form-item label="正文">
          <el-input v-model="articleForm.content" type="textarea" :rows="6" placeholder="请输入正文" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveArticle">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useArticleStore } from '../stores/article.js'

defineProps(['isDark'])

// storeToRefs 解构 state 与 getters，保持响应式
const articleStore = useArticleStore()
const { articleList, articleCount } = storeToRefs(articleStore)

const dialogVisible = ref(false)
const editingId = ref(null)
const articleForm = reactive({
  title: '',
  category: '',
  author: '',
  date: '',
  summary: '',
  content: ''
})

const openAdd = () => {
  editingId.value = null
  Object.assign(articleForm, {
    title: '',
    category: '',
    author: '',
    date: '',
    summary: '',
    content: ''
  })
  dialogVisible.value = true
}

const openEdit = (row) => {
  editingId.value = row.id
  Object.assign(articleForm, {
    title: row.title,
    category: row.category,
    author: row.author,
    date: row.date,
    summary: row.summary,
    content: row.content
  })
  dialogVisible.value = true
}

// 保存：根据是否有 editingId 决定新增还是更新（调用 Store action）
const saveArticle = () => {
  if (!articleForm.title || !articleForm.category) {
    ElMessage.warning('请填写标题和分类')
    return
  }
  const payload = { ...articleForm }
  if (editingId.value) {
    articleStore.updateArticle(editingId.value, payload)
    ElMessage.success('文章已更新')
  } else {
    articleStore.addArticle(payload)
    ElMessage.success('文章已新增')
  }
  dialogVisible.value = false
}

// 删除：二次确认后调用 Store action
const delArticle = (id) => {
  ElMessageBox.confirm('确定删除该文章吗？删除后不可恢复。', '删除确认', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      articleStore.removeArticle(id)
      ElMessage.success('文章已删除')
    })
    .catch(() => {})
}
</script>

<style scoped>
.manage-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
</style>
