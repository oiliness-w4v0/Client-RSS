<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AiOutlineLoading, AiOutlineMoon, AiOutlineSun } from 'vue-icons-plus/ai'
import Settings from '../components/dialog-settings.vue'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
const isDarkMode = ref(true) // This should be replaced with a method to get the current theme

onMounted(async () => {
  const theme = await window.ipcRenderer.getNativeTheme()
  isDarkMode.value = theme === 'dark'
})

function toggleTheme() {
  const newTheme = isDarkMode.value ? 'light' : 'dark'
  window.ipcRenderer.setNativeTheme(newTheme)
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div class="header">
    <div class="actions">
      <Transition name="slide-fade">
        <div v-if="appStore.reloadDataVisible" class="loading">
          <AiOutlineLoading :size="16" class="rotate" />
        </div>
      </Transition>
      <div class="icons" @click="toggleTheme">
        <AiOutlineSun v-if="isDarkMode" :size="16" />
        <AiOutlineMoon v-else :size="16" />
      </div>
      <Settings />
    </div>
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
  app-region: drag;
  -moz-app-region: drag;

  .actions {
    display: flex;
    align-items: center;
    gap: 5px;
    app-region: no-drag;
    -moz-app-region: no-drag;
  }
}
</style>
