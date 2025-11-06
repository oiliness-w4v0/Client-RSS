<script setup>
import { computed } from 'vue'
import { usePopupStore } from '@/stores/popup' // 调整路径

const store = usePopupStore()
const isOpen = computed(() => store.isOpen)
const content = computed(() => store.content)

const isComponent = computed(() => typeof content.value === 'object' && content.value !== null) // 假设内容是组件时为对象

function closePopup() {
  store.closePopup()
}

function closeIfOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup() // 点击遮罩关闭
  }
}
</script>

<template>
  <div v-if="isOpen" class="popup-overlay" @click="closePopup" />
  <Transition name="slide-fade">
    <div v-if="isOpen" class="popup-wrapper">
      <div class="popup-content" @click.stop>
        <!-- 渲染内容：根据 content 类型动态渲染 -->
        <component :is="content" v-if="isComponent" />
        <div v-else-if="typeof content === 'string'" v-html="content" />
        <div v-else>
          无效内容
        </div>

        <!-- 关闭按钮 -->
        <button @click="closePopup">
          关闭
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
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
  background-color: var(--sidebar-background-color);
  padding: 10px 20px 30px 20px;
  border-radius: 8px;
  max-width: 600px;
  position: relative;
  pointer-events: initial;
}
.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}
.slide-fade-leave-active {
  /* transition: opacity 0.13s cubic-bezier(1, 0.5, 0.8, 1);
  transition: transform 0.35s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 0s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
