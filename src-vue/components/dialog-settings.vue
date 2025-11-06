<script setup lang="ts">
import { AiOutlineExperiment, AiOutlineOrderedList } from 'vue-icons-plus/ai'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
</script>

<template>
  <div class="dialog-settings">
    
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
