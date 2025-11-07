<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCacheStore } from '@/stores/cache'
import { emitter } from '../emitter'
import { useAppStore } from '../stores/app'

const cacheStore = useCacheStore()
const appStore = useAppStore()
const blog = computed(() => {
  return appStore.articles.find(article => article.id === cacheStore.cache.articleId) || null
})
const isTitleVisible = ref(false)

emitter.on('scroll-to-current-position', (pos: boolean) => {
  isTitleVisible.value = pos
})
</script>

<template>
  <div
    class="header" :class="{
      active: isTitleVisible,
    }"
  >
    <transition name="fade">
      <div v-show="isTitleVisible">
        {{ blog?.title }}
      </div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
.header {
  min-height: 50px;
  app-region: drag;
  -moz-app-region: drag;
  padding-left: 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-end;
  &.active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  &>div {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-title-color);
    line-height: 40px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
