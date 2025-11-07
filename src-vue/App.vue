<script setup lang="ts">
import type { Component } from 'vue'
import { computed, onMounted } from 'vue'
import ContentBlog from './components/content-blog.vue'
import ContentHeader from './components/content-header.vue'
import Drawer from './components/Drawer.vue'
import ImageShow from './components/ImageShow.vue'
import SidebarActions from './components/sidebar-actions.vue'
import SidebarMenu from './components/sidebar-menu.vue'
import { useAppStore } from './stores/app'
import { useCacheStore } from './stores/cache'
import { useUserStore } from './stores/user'

const appStore = useAppStore()
const cacheStore = useCacheStore()
const userStore = useUserStore()

const components: Record<string, Component> = {
  articleList: SidebarMenu,
  moreSettings: Drawer,
}

const Sidebar = computed(() => {
  return components[cacheStore.cache.sidebar] || SidebarMenu
})

onMounted(() => {
  appStore.init()
  userStore.getUsers(true)
})
</script>

<template>
  <div class="layout">
    <ImageShow />
    <div class="sidebar">
      <SidebarActions />
      <Transition name="slide-fade" mode="out-in">
        <component :is="Sidebar" />
      </Transition>
    </div>
    <div class="content">
      <ContentHeader />
      <ContentBlog />
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;

  .sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    background-color: var(--sidebar-background-color);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 25px;
  }

  .content {
    flex: 1;
    padding: 0 0 20px 0;
    background-color: var(--content-background-color);
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
}

.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
</style>
