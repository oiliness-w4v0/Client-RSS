<script setup lang="ts">
import { ref } from 'vue'
import ThemeSelect from '@/components/ThemeSelect.vue'
import { useCacheStore } from '@/stores/cache'

const cacheStore = useCacheStore()
const img = ref('https://cn.bing.com/th?id=OHR.TempleE_ZH-CN9455488333_UHD.jpg&pid=hp&w=2000')
</script>

<template>
  <div class="p-8 pt-18">
    <ThemeSelect />

    <div class="p-8 ">
      <label for="toggle-glass" class="flex items-center gap-2">
        <input id="toggle-glass" v-model="cacheStore.cache.glass" type="checkbox" @change="cacheStore.setGlass(cacheStore.cache.glass)">
        透明玻璃效果(实验性)
      </label>
    </div>
    <div class="p-8 ">
      <h1>设置壁纸</h1>
      <input v-model="img" type="text">
      <img :src="img" alt="img" class="w-32 h-32 object-cover mt-4">
      <button @click="cacheStore.setBgImage(img)">
        设置壁纸
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
