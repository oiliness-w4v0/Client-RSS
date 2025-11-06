<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import { AiOutlineRedo } from 'vue-icons-plus/ai'
import { useAppStore } from '../../stores/app'

const rssUrl = ref('https://www.ruanyifeng.com/blog/atom.xml')
const loading = ref(false)
const appStore = useAppStore()

function addRss() {
  if (loading.value)
    return
  loading.value = true

  appStore.subscribeRSS(rssUrl.value).then((res) => {
    if (res.success) {
      appStore.getAllFeedsWithArticles()
    }
  }).finally(() => {
    loading.value = false
  })
}

function selectChange(e: Event) {
  const { value, checked } = e.target as HTMLInputElement
  if (checked) {
    appStore.addSubscription(1, Number(value))
  }
  else {
    appStore.removeSubscription(1, Number(value))
  }
}
</script>

<template>
  <div class="feed-popup">
    <h2>
      {{ '弹窗' }}
    </h2>

    <div class="flex">
      <input v-model="rssUrl" type="text" class="flex-1" placeholder="搜索订阅源">
      <div class="button flex-0" @click="addRss">
        <AiOutlineRedo v-if="loading" :size="15" class="rotate" />
        订阅
      </div>
    </div>

    <div class="divider" />

    <p class="feed-subtitle">
      选择您想要订阅的源: 已选择 {{ appStore.subscriptions.length }} 个
    </p>

    <ul>
      <li v-for="(feed, index) in appStore.feedsWithArticles" :key="feed.id">
        <label :for="`feed-${index}`">
          <div class="checkbox">
            <input
              :id="`feed-${index}`"
              v-model="appStore.subscriptions"
              type="checkbox"
              :value="feed.id"
              @change="selectChange"
            >
          </div>
          <span class="title">{{ feed.title }}</span>
          <span class="publish-date">最新更新：{{ dayjs(feed.lastBuildDate).format('YYYY/MM/DD HH:mm') }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.feed-popup {
  width: 560px;
  box-sizing: border-box;
}

.divider {
  height: 1px;
  background-color: var(--divider-color);
  margin: 14px 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 300px;
  overflow-y: auto;

  li {
    border-radius: 3px;

    label {
      display: grid;
      cursor: pointer;
      border-radius: 3px;
      transition: all 0.2s;
      cursor: pointer;
      padding: 8px;
      grid-template-columns: 30px 1fr 160px;
      grid-template-areas: 'checkbox title publish-date';
    }

    &:hover {
      background-color: var(--icon-hover-background-color);
    }

    div.checkbox {
      margin-right: 8px;
      grid-area: checkbox;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    span.title {
      grid-area: title;
      font-size: 12px;
      display: flex;
      align-items: center;
    }

    span.publish-date {
      grid-area: publish-date;
      font-size: 10px;
      color: var(--text-subtitle-color);
      display: flex;
      align-items: center;
    }
  }
}
</style>
