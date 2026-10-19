<template>
  <MyInfoCard
    v-model:show-detail="showDetail"
    :user-info="userInfo"
    :skill-list="skillList"
    :skill-count="skillCount"
    :is-dark="isDark"
    @change-theme="$emit('change-theme')"
  />
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import MyInfoCard from '../components/MyInfoCard.vue'
import { useUserStore } from '../stores/user.js'

defineEmits(['change-theme'])
defineProps(['isDark'])

// 使用 storeToRefs 解构 Store 的 state 与 getters，保持响应式
const userStore = useUserStore()
const { userInfo, skillList, skillCount } = storeToRefs(userStore)

// 传给子组件的 v-model 值
const showDetail = ref(false)
</script>
