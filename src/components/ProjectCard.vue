<template>
  <div class="project-card" :class="{dark:isDark}">
    <!-- 具名插槽：标题区域 -->
    <slot name="card-title">
      <h4>默认项目标题</h4>
    </slot>

    <div class="card-body">
      <!-- 默认插槽：卡片主体简介 -->
      <slot>
        <p>这里是默认简介，父组件不传插槽内容就显示我</p>
      </slot>
    </div>

    <!-- 作用域插槽：子组件抛出project数据给父组件 -->
    <div class="card-tag-area">
      <slot name="tag" :item="project"></slot>
    </div>

    <!-- 具名插槽：操作按钮区域 -->
    <div class="card-action">
      <slot name="card-actions"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project:{
    type: Object,
    default: ()=>({})
  },
  isDark:{
    type:Boolean,
    default:false
  }
})
</script>

<style scoped>
.project-card {
  background: rgba(255,255,255,0.9);
  border-radius:16px;
  padding:22px;
  box-shadow: 0 6px 20px rgba(180,210,255,0.3);
  margin-bottom:20px;
}
.project-card.dark{
  background:rgba(40,48,65,0.9);
  color:#eee;
}
.card-body{
  margin:14px 0;
}
.card-tag-area{
  margin:12px 0;
}
.card-action{
  margin-top:16px;
  display:flex;
  gap:10px;
}
</style>
