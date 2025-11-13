<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue'
import { useCacheStore } from '@/stores/cache'

const cacheStore = useCacheStore()

const tabs = ref([
  {
    label: '订阅',
    key: 'articleList',
  },
  {
    label: '更多设置',
    key: 'moreSettings',
  },
  {
    label: '邮件',
    key: 'email',
  },
])
const tabIndex = computed(() => {
  return tabs.value.findIndex(tab => tab.key === cacheStore.cache.sidebar)
})
</script>

<template>
  <div
    class="tab-container"
    :class="{
      glass: cacheStore.cache.glass,
    }"
  >
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="tab"
      :class="{ active: cacheStore.cache.sidebar === tab.key }"
      @click="cacheStore.setSidebar(tab.key)"
    >
      {{ tab.label }}
    </div>

    <div v-if="cacheStore.cache.sidebar" class="indicator" :style="{ left: `${90 * tabIndex + 2}px` }" />
  </div>
</template>

<style lang="less" scoped>
.tab-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2px;
    margin: 0 8px 18px 8px;
    background-color: var(--tabs-bg-color);
    border-radius: 9px;
    &.glass {
        background-color: var(--tabs-glass-bg-color);
        backdrop-filter: blur(10px);
    }
    .indicator {
        width: 90px;
        height: 28px;
        background: var(--tabs-indicator-color);
        position: absolute;
        top: 2px;
        left: 2px;
        z-index: 1;
        border: 0.5px solid rgba(0, 0, 0, 0.04);
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
        border-radius: 7px;
        transition: all 0.2s ease-out;
    }
    .tab {
        flex: 1;
        height: 28px;
        position: relative;
        z-index: 2;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        font-size: 0.85rem;
        opacity: 0.6;
        cursor: pointer;
        user-select: none;
        &.active {
            opacity: 1;
        }
    }
}
</style>
