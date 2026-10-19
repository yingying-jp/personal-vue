<template>
  <div class="container" :class="{ dark: isDark }">
    <!-- 基本信息卡片：el-card + el-row/el-col 布局 + el-avatar -->
    <el-card shadow="hover" class="info-card">
      <el-row :gutter="24" align="middle">
        <el-col :xs="24" :sm="8" class="avatar-col">
          <el-avatar :size="110" :src="userInfo.avatar" />
        </el-col>
        <el-col :xs="24" :sm="16">
          <h2>{{ userInfo.name }}</h2>
          <p>学号：{{ userInfo.studentId }}</p>
          <p>专业班级：{{ userInfo.className }}</p>
          <p>方向：Web前端开发</p>
        </el-col>
      </el-row>
    </el-card>

    <!-- 个人简介 -->
    <el-button round class="toggle-btn" @click="showDetail = !showDetail">
      {{ showDetail ? '收起个人简介' : '展开个人简介' }}
    </el-button>
    <el-card v-show="showDetail" class="detail-card" shadow="never">
      <h4 class="block-title">个人简介</h4>
      <p class="block-text">{{ userInfo.desc }}</p>
    </el-card>

    <!-- 技能搜索与列表：el-input + el-tag -->
    <el-input
      v-model="searchKeyword"
      class="search-input"
      placeholder="输入关键词搜索技能..."
      clearable
    />
    <el-card class="detail-card" shadow="never">
      <template #header>
        <span>技能列表（共 {{ skillCount }} 项）</span>
      </template>
      <div class="skill-wrap">
        <el-tag
          v-for="(skill, index) in filterSkillList"
          :key="index"
          effect="plain"
          round
          size="large"
        >
          {{ skill }}
        </el-tag>
        <el-empty v-if="!filterSkillList.length" description="没有匹配的技能" :image-size="60" />
      </div>
    </el-card>

    <!-- 成长时间线：el-timeline + el-timeline-item -->
    <el-card class="detail-card" shadow="never">
      <template #header>
        <span>成长时间线</span>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in timelineList"
          :key="index"
          :timestamp="item.time"
          placement="top"
          :type="item.type"
        >
          <el-card shadow="never" class="timeline-card">
            <h4 class="block-title">{{ item.title }}</h4>
            <p class="block-text">{{ item.desc }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  userInfo: Object,
  skillList: Array,
  skillCount: Number,
  isDark: {
    type: Boolean,
    default: false
  }
})
defineEmits(['change-theme'])

// 核心：defineModel('showDetail') 实现命名 v-model 双向绑定
const showDetail = defineModel('showDetail', {
  type: Boolean,
  default: false
})

const searchKeyword = ref('')
const filterSkillList = computed(() => {
  if (!searchKeyword.value) return props.skillList
  return props.skillList.filter((item) =>
    item.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 成长时间线数据（学习经历、获奖、证书等）
const timelineList = [
  {
    time: '2024年9月',
    type: 'primary',
    title: '入学重庆工程学院',
    desc: '就读计算机科学与技术专业，加入班级并担任组宣委员。'
  },
  {
    time: '2024年12月',
    type: 'success',
    title: '通过大学英语四级考试',
    desc: '坚持背单词与听力训练，一次通过英语四级。'
  },
  {
    time: '2025年6月',
    type: 'success',
    title: '通过计算机二级考试',
    desc: '系统学习 C 语言与数据库基础，考取计算机二级证书。'
  },
  {
    time: '2025年12月',
    type: 'warning',
    title: '获得优秀学生奖学金',
    desc: '大一学年获得三等奖学金，大二学年进步至二等奖学金。'
  },
  {
    time: '2026年6月',
    type: 'primary',
    title: '完成大学生积分管理系统',
    desc: '基于 Java + SpringBoot + MySQL 独立开发的纯后端项目。'
  },
  {
    time: '2026年10月',
    type: 'info',
    title: '完成智慧仓储与个人主页项目',
    desc: '完成智慧仓储管理系统，并持续迭代 Vue3 个人主页项目。'
  }
]
</script>

<style scoped>
.container {
  max-width: 860px;
  margin: 0 auto;
}
.info-card {
  margin-bottom: 20px;
}
.avatar-col {
  text-align: center;
}
.info-card h2 {
  font-size: 26px;
  margin-bottom: 10px;
  color: #1f2937;
}
.container.dark .info-card h2 {
  color: #f3f4f6;
}
.info-card p {
  font-size: 15px;
  margin: 4px 0;
  color: #4b5563;
}
.container.dark .info-card p {
  color: #cbd5e1;
}
.toggle-btn {
  margin-bottom: 20px;
}
.detail-card {
  margin-bottom: 20px;
}
.block-title {
  margin-bottom: 8px;
  font-size: 16px;
  color: #4f467a;
}
.container.dark .block-title {
  color: #e0d8ff;
}
.block-text {
  line-height: 1.8;
  font-size: 15px;
  color: #4b5563;
}
.container.dark .block-text {
  color: #cbd5e1;
}
.search-input {
  margin-bottom: 20px;
}
.skill-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.timeline-card {
  background: transparent;
  box-shadow: none;
}
</style>
