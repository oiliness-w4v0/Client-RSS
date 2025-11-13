<script setup lang="ts">
import type { Component } from 'vue'
import {
  computed,
  onMounted,
} from 'vue'
import ImageShow from './components/ImageShow.vue'
import Settings from './components/Settings.vue'
import SidebarActions from './components/sidebar-actions.vue'
import SidebarMenu from './components/sidebar-menu.vue'
import Tabs from './components/Tabs.vue'

import { useAppStore } from './stores/app'
import { useCacheStore } from './stores/cache'
import { useUserStore } from './stores/user'

const appStore = useAppStore()
const cacheStore = useCacheStore()
const userStore = useUserStore()

const components: Record<string, Component> = {
  articleList: SidebarMenu,
  moreSettings: Settings,
}

const Sidebar = computed(() => {
  return components[cacheStore.cache.sidebar!] || SidebarMenu
})

onMounted(() => {
  appStore.init()
  userStore.getUsers(true)
})
</script>

<template>
  <div
    class="layout"
    :class="{
      backdrop: cacheStore.cache.glass,
    }"
  >
    <div v-if="cacheStore.cache.glass" class="absolute w-full h-full">
      <img class="w-full h-full object-cover" :src="cacheStore.cache.bgImage" alt="">
    </div>
    <div class="backdrop-blur-lg bg-gray-50/10 absolute w-full h-full" />
    <div
      class="app-masker-2 transition-all bg-transparent absolute w-full h-full"
    />
    <ImageShow />
    <div class="sidebar">
      <SidebarActions />

      <Tabs />

      <Transition name="switch-app-menu" mode="out-in">
        <component :is="Sidebar" />
      </Transition>
    </div>
    <div class="content">
      <KeepAlive>
        <RouterView />
      </KeepAlive>
      <!-- <ContentBlog /> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;
  &.backdrop {
    .app-masker-2 {
      &.deep {
        background-color: rgba(0, 0, 0, 0.335);
      }
    }
    .sidebar {
      background-color: transparent;
    }
    .content {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    background-color: var(--sidebar-background-color);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 25px;
    position: relative;
    z-index: 2;
  }
  .content {
    flex: 1;
    padding: 0 0 20px 0;
    background-color: var(--content-background-color);
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    position: relative;
  }
}
</style>
