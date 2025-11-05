<script setup lang="ts">
import { AiOutlineExperiment, AiOutlineOrderedList } from 'vue-icons-plus/ai'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
</script>

<template>
  <div class="dialog-settings">
    <div
      class="mask" :class="{
        pos1: appStore.sidebar === 'default',
        pos2: appStore.sidebar === 'settings',
      }"
    />
    <div
      class="icons"
      :class="{
        active: appStore.sidebar === 'default',
      }"
      @click="appStore.toggleSidebar('default')"
    >
      <AiOutlineOrderedList :size="16" />
    </div>
    <div
      class="icons"
      :class="{
        active: appStore.sidebar === 'settings',
      }"
      @click="appStore.toggleSidebar('settings')"
    >
      <AiOutlineExperiment :size="16" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.dialog-settings {
  display: flex;
  gap: 6px;
  position: relative;

  .mask {
    width: 26px;
    height: 26px;
    background-color: var(--menu-active-background-color);
    border-radius: 50px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    transition: all 0.15s;

    &.pos1 {
      left: 0px;
    }

    &.pos2 {
      left: 32px;
    }
  }
}

.icons {
  position: relative;
  z-index: 2;
  &.active {
    color: white;
  }
}
</style>
