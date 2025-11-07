<script setup lang="ts">
import {
  computed,
  markRaw,
  onMounted,
  ref,
} from 'vue'
import {
  AiOutlineExperiment,
  AiOutlineLoading,
  AiOutlineMoon,
  AiOutlineOrderedList,
  AiOutlineRead,
  AiOutlineSun,
} from 'vue-icons-plus/ai'
import FeedPopup from '@/components/popup/Feed.vue'
import Popup from '@/components/ui/Popup.vue'
import { useAppStore } from '@/stores/app'
import { useCacheStore } from '@/stores/cache'
import { usePopupStore } from '@/stores/popup'

const popupStore = usePopupStore()
const appStore = useAppStore()
const cacheStore = useCacheStore()
const isDarkMode = ref(true) // This should be replaced with a method to get the current theme

onMounted(async () => {
  const theme = await ipcRenderer.invoke('get-native-theme')
  isDarkMode.value = theme === 'dark'
})

function toggleTheme() {
  const newTheme = isDarkMode.value ? 'light' : 'dark'
  ipcRenderer.invoke('set-native-theme', newTheme)
  isDarkMode.value = !isDarkMode.value
}

const operationButtons = ref([
  {
    icon: markRaw(AiOutlineRead),
    key: 'feed',
    tooltip: '设置订阅源',
    click: () => {
      const pre = cacheStore.cache.sidebar
      cacheStore.setSidebar('feed')
      popupStore.openPopup(FeedPopup, () => {
        cacheStore.setSidebar(pre)
      })
    },
  },
  {
    icon: markRaw(AiOutlineLoading),
    key: 'reload',
    tooltip: '重新加载数据',
    class: { rotate: true },
    click: () => {
      // Trigger data reload
    },
  },
  {
    icon: computed(() => (isDarkMode.value ? markRaw(AiOutlineSun) : markRaw(AiOutlineMoon))),
    key: 'SunOrMoon',
    tooltip: '切换主题',
    click: () => {
      toggleTheme()
    },
  },
  {
    icon: markRaw(AiOutlineOrderedList),
    key: 'articleList',
    tooltip: '文章列表',
    click: () => {
      cacheStore.setSidebar('articleList')
    },
  },
  {
    icon: markRaw(AiOutlineExperiment),
    key: 'moreSettings',
    tooltip: '更多设置',
    click: () => {
      cacheStore.setSidebar('moreSettings')
    },
  },
])

const switchIndex = computed(() => {
  const keys = operationButtons.value.map(op => op.key)
  return keys.indexOf(cacheStore.cache.sidebar)
})
</script>

<template>
  <div class="header">
    <div class="actions">
      <Transition name="slide-fade">
        <div v-if="appStore.reloadDataVisible" class="loading">
          <AiOutlineLoading :size="16" class="rotate" />
        </div>
      </Transition>
      <div
        class="switch-handle" :style="{ left: `${switchIndex * 31}px` }"
      />

      <span
        v-for="operation in operationButtons" :key="operation.key" class="icons" :class="{
          active: cacheStore.cache.sidebar === operation.key,
          ...operation.class,
        }" @click="operation.click"
      >
        <component :is="operation.icon" :size="16" />
      </span>
    </div>
    <Popup />
  </div>
</template>

<style lang="less" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.header {
  margin-bottom: 20px;
  padding: 20px 10px 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;

  -webkit-app-region: drag;
  -moz-app-region: drag;

  .actions {
    display: flex;
    align-items: center;
    gap: 5px;
    -webkit-app-region: no-drag;
    -moz-app-region: no-drag;
    position: relative;
  }

  .icons {
    position: relative;
    z-index: 2;
    cursor: pointer;

    &.active {
      color: white !important;
    }
  }

  .switch-handle {
    width: 26px;
    height: 26px;
    background-color: var(--menu-active-background-color);
    border-radius: 50px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    transition: all 0.15s;
  }
}
</style>
