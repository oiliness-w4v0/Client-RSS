<script setup lang="ts">
import { computed } from 'vue'
import { usePopupStore } from '@/stores/popup' // 调整路径

const store = usePopupStore()
const isOpen = computed(() => store.isOpen)
const content = computed(() => store.content)

const isComponent = computed(() => typeof content.value === 'object' && content.value !== null) // 假设内容是组件时为对象

function closePopup() {
  store.closePopup()
}
</script>

<template>
  <div v-if="isOpen" class="popup-overlay" @click="closePopup" />
  <Transition name="slide-fade">
    <div v-if="isOpen" class="popup-wrapper">
      <div class="popup-content rounded-lg shadow-lg overflow-hidden" @click.stop>
        <!-- <div class="popup-content-mask absolute top-0 left-0 w-full h-full backdrop-blur-lg bg-gray-70/10 bg-opacity-10" /> -->
        <!-- 渲染内容：根据 content 类型动态渲染 -->
        <component :is="content" v-if="isComponent" />
        <div v-else-if="typeof content === 'string'" v-html="content" />
        <div v-else>
          无效内容
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
}
.popup-content {
  padding: 10px 20px 30px 20px;
  max-width: 600px;
  position: relative;
  pointer-events: initial;
  background: var(--content-background-color);
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}
.slide-fade-leave-active {
  transition: all 0s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
