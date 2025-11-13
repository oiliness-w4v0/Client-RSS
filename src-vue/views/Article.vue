<script setup lang="ts">
import dayjs from 'dayjs'
import {
  computed,
  onMounted,
  ref,
} from 'vue'
import { useCacheStore } from '@/stores/cache'
import DialogEmail from '../components/popup/Email.vue'
import { useAppStore } from '../stores/app'
import { useImgStore } from '../stores/img'
import { usePopupStore } from '../stores/popup'

const popupStore = usePopupStore()
const imgStore = useImgStore()
const appStore = useAppStore()
const cacheStore = useCacheStore()
const articles = computed(() => {
  return appStore.feedsWithArticles.find(feed => feed.id === cacheStore.cache.feedId)?.articles || []
})
const blog = computed(() => {
  return articles.value.find(article => article.id === cacheStore.cache.articleId) || null
})
const blogContentRef = ref<HTMLDivElement | null>(null)

const isTitleVisible = ref(false)

function openEmailPopup() {
  popupStore.openPopup(DialogEmail)
}

function scrollEvent(event: Event) {
  // Placeholder for scroll event handling
  const scrollTop = (event.target as HTMLElement)?.scrollTop || 0
  if (scrollTop < 100) {
    isTitleVisible.value = false
  }
  else {
    isTitleVisible.value = true
  }
}

onMounted(() => {
  if (blogContentRef.value) {
    blogContentRef.value.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (target.tagName.toLowerCase() === 'img') {
        imgStore.setImg(target as HTMLImageElement)
      }
    })
  }
})
</script>

<template>
  <div
    class="header" :class="{
      active: isTitleVisible,
    }"
  >
    <transition name="fade">
      <div v-show="isTitleVisible" class="title">
        {{ blog?.title }}
      </div>
    </transition>
  </div>

  <div class="blog" @scroll="scrollEvent">
    <div v-if="!blog" class="page-404">
      请选择你想阅读的文章
    </div>
    <h1>{{ blog?.title }}</h1>
    <div v-if="blog" class="actions-bar">
      <button class="action-button">
        {{ dayjs(blog?.publishedAt).format('YYYY-MM-DD HH:mm') }}
      </button>
      <div class="divider" />
      <button class="action-button" @click="openEmailPopup()">
        分享文章
      </button>
      <div class="divider" />
      <a class="action-button" :href="blog?.url" target="_blank" rel="noopener">
        原文链接
      </a>
    </div>
    <div ref="blogContentRef" class="html-render" v-html="blog?.content" />
  </div>
</template>

<style lang="less">
.header {
  min-height: 50px;
  app-region: drag;
  -moz-app-region: drag;
  padding-left: 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  &.active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: var(--text-title-color);
    margin-top: 5px;
  }
}

.blog {
  height: 100%;
  overflow-y: auto;
  padding-top: 8px;

  .page-404 {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: var(--text-subtitle-color);
  }

  .actions-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 26px;
    gap: 8px;

    .divider {
      width: 1px;
      background-color: var(--divider-color);
      height: 16px;
    }

    button.action-button {
      border: none;
      font-size: 12px;
      cursor: pointer;
      background-color: transparent;
    }
  }

  & > h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-title-color);
    padding: 0 16px 16px 16px;
    text-align: center;
  }

  img {
    max-width: 280px;
  }

  .html-render {
    padding: 0 24px 24px 30px;
    text-indent: 2rem;
    line-height: 1.8;

    code {
      // 换行
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
