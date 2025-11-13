<script setup lang="ts">
import { ref } from 'vue'
import { AiOutlineRedo } from 'vue-icons-plus/ai'
import { useAppStore } from '../../stores/app'
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'

const rssUrl = ref('https://www.ruanyifeng.com/blog/atom.xml')
const loading = ref(false)
const appStore = useAppStore()

async function addRss() {
  if (loading.value)
    return
  loading.value = true

  await appStore.subscribeRSS(rssUrl.value)
  await appStore.getAllFeedsWithArticles()
  loading.value = false
}

function formSubmit(e: Event) {
  e.preventDefault()
  // addRss()
  loading.value = true
}

function selectCommonRss(url: string) {
  if (loading.value)
    return
  rssUrl.value = url
}
</script>

<template>
  <div class="feed-popup">
    <!-- <h2>
      {{ '弹窗' }}
    </h2>

    <div class="flex">
      <input v-model="rssUrl" type="text" class="flex-1" placeholder="搜索订阅源">
      <div class="button flex-0" @click="addRss">
        <AiOutlineRedo v-if="loading" :size="15" class="rotate" />
        订阅
      </div>
    </div> -->

    <div class="form-container">
      <form class="form" @submit="formSubmit">
        <div class="form-group">
          <label class="lg">添加订阅源</label>
        </div>
        <div class="form-group">
          <label for="rss-url">RSS Feed URL</label>
          <Input id="rss-url" v-model="rssUrl" :disabled="loading" type="text" name="rss-url" required placeholder="123" />
        </div>
        <div class="form-group">
          <label for="textarea">常用订阅源</label>
          <ul>
            <li @click="selectCommonRss('https://www.ruanyifeng.com/blog/atom.xml')">
              <span>阮一峰的网络日志</span>
            </li>
            <li
              @click="selectCommonRss('https://www.zhangxinxu.com/wordpress/feed/')"
            >
              <span>张鑫旭-鑫空间-鑫生活</span>
            </li>
          </ul>
          <!-- <textarea id="textarea" name="textarea" rows="10" cols="50" /> -->
        </div>
        <div class="flex justify-end">
          <Button type="submit" :disabled="loading">
            添加 <AiOutlineRedo v-if="loading" :size="15" class="rotate" />
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="less" scoped>
ul {
  li {
    margin-bottom: 6px;
    cursor: pointer;
    display: inline-block;
    margin-right: 8px;
    padding: 4px 8px;
    border-radius: 2px;
    &:hover {
      background-color: var(--icon-hover-background-color);
    }
  }
}
.form-container {
  width: 400px;
}

.form-container button:active {
  scale: 0.95;
}

.form-container .form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 12px;

  &.lg {
    font-size: 14px;
  }
}
</style>
