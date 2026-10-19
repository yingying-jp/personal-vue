<template>
  <div class="admin-wrap" :class="{ dark: isDark }">
    <el-card shadow="hover">
      <template #header>
        <div class="card-head">
          <span>后台管理</span>
          <el-button type="danger" round plain size="small" @click="logout">退出登录</el-button>
        </div>
      </template>

      <!-- 选项卡：个人信息 / 项目管理 -->
      <el-tabs v-model="activeTab">
        <!-- 个人信息编辑：el-form -->
        <el-tab-pane label="个人信息" name="profile">
          <el-form :model="editUser" label-width="80px" style="max-width: 520px">
            <el-form-item label="姓名">
              <el-input v-model="editUser.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="editUser.studentId" placeholder="请输入学号" />
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="editUser.className" placeholder="请输入班级" />
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input v-model="editUser.desc" type="textarea" :rows="3" placeholder="请输入个人简介" />
            </el-form-item>
            <el-form-item label="技能列表">
              <el-input v-model="skillText" placeholder="用逗号分隔，如 HTML,CSS,Vue3" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="saveUser">保存个人信息</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 项目管理：el-table 展示 + 弹窗新增/编辑 -->
        <el-tab-pane label="项目管理" name="project">
          <div class="tab-toolbar">
            <span>共 {{ projectCount }} 个项目</span>
            <el-button type="primary" round size="small" @click="openAdd">+ 新增项目</el-button>
          </div>
          <el-table :data="projectList" stripe>
            <el-table-column prop="id" label="ID" width="60" />
            <el-table-column prop="name" label="项目名称" min-width="150" />
            <el-table-column prop="desc" label="简介" min-width="200" show-overflow-tooltip />
            <el-table-column label="技术栈" min-width="180">
              <template #default="{ row }">
                <el-tag v-for="t in row.tags" :key="t" size="small" round class="tag-item">
                  {{ t }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right">
              <template #default="{ row }">
                <el-button size="small" @click="openEdit(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delProj(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 项目新增/编辑弹窗：el-dialog + el-form -->
    <el-dialog
      v-model="projDialog"
      :title="editingId ? '编辑项目' : '新增项目'"
      width="520px"
      destroy-on-close
    >
      <el-form :model="projForm" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="projForm.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input v-model="projForm.desc" type="textarea" :rows="2" placeholder="请输入项目简介" />
        </el-form-item>
        <el-form-item label="技术栈">
          <el-input v-model="projForm.tagsText" placeholder="用逗号分隔，如 Vue3,Java" />
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input v-model="projForm.detail" type="textarea" :rows="3" placeholder="请输入详细描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="projDialog = false">取消</el-button>
        <el-button type="primary" @click="saveProj">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '../stores/user.js'
import { useProjectStore } from '../stores/project.js'

defineProps(['isDark'])
const router = useRouter()

const activeTab = ref('profile')

// 用户 Store：storeToRefs 解构 state
const userStore = useUserStore()
const { userInfo, skillList } = storeToRefs(userStore)

// 项目 Store：storeToRefs 解构 state 与 getters
const projectStore = useProjectStore()
const { projectList, projectCount } = storeToRefs(projectStore)

// 个人信息编辑副本
const editUser = reactive({ ...userInfo.value })
const skillText = ref(skillList.value.join(','))

// 保存个人信息：调用用户 Store 的 action
const saveUser = () => {
  userStore.updateUserInfo(
    {
      name: editUser.name,
      studentId: editUser.studentId,
      className: editUser.className,
      desc: editUser.desc
    },
    skillText.value.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
  )
  ElMessage.success('个人信息已保存')
}

// 项目增删改
const projDialog = ref(false)
const editingId = ref(null)
const projForm = reactive({ name: '', desc: '', tagsText: '', detail: '' })

const openAdd = () => {
  editingId.value = null
  Object.assign(projForm, { name: '', desc: '', tagsText: '', detail: '' })
  projDialog.value = true
}

const openEdit = (row) => {
  editingId.value = row.id
  Object.assign(projForm, {
    name: row.name,
    desc: row.desc,
    tagsText: row.tags.join(','),
    detail: row.detail
  })
  projDialog.value = true
}

// 保存项目：根据是否有 editingId 决定新增还是更新（调用 Store action）
const saveProj = () => {
  if (!projForm.name) {
    ElMessage.warning('请填写项目名称')
    return
  }
  const tags = projForm.tagsText.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
  if (editingId.value) {
    projectStore.updateProject(editingId.value, {
      name: projForm.name,
      desc: projForm.desc,
      tags,
      detail: projForm.detail
    })
    ElMessage.success('项目已更新')
  } else {
    projectStore.addProject({
      name: projForm.name,
      desc: projForm.desc,
      tags,
      detail: projForm.detail
    })
    ElMessage.success('项目已新增')
  }
  projDialog.value = false
}

// 删除项目：二次确认后调用 Store action
const delProj = (id) => {
  ElMessageBox.confirm('确定删除该项目吗？删除后不可恢复。', '删除确认', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      projectStore.removeProject(id)
      ElMessage.success('项目已删除')
    })
    .catch(() => {})
}

// 退出登录：调用用户 Store 的 action
const logout = () => {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/home')
}
</script>

<style scoped>
.admin-wrap {
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
.tab-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  color: #6b7280;
}
.tag-item {
  margin-right: 6px;
  margin-bottom: 4px;
}
</style>
