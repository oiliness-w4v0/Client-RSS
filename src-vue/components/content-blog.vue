<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { emitter } from '../emitter'
import { useAppStore } from '../stores/app'
import { useImgStore } from '../stores/img'
import ContentActions from './content-actions.vue'

const imgStore = useImgStore()
const appStore = useAppStore()
const blog = computed(() => {
  return appStore.currentArticle
})
const blogContentRef = ref<HTMLDivElement | null>(null)
function scrollEvent(event: Event) {
  // Placeholder for scroll event handling
  const scrollTop = (event.target as HTMLElement)?.scrollTop || 0
  if (scrollTop < 100) {
    emitter.emit('scroll-to-current-position', false)
  }
  else {
    emitter.emit('scroll-to-current-position', true)
  }
}

onMounted(() => {
  console.log('blogContentRef', blogContentRef.value)
  if (blogContentRef.value) {
    blogContentRef.value.addEventListener('click', (event) => {
      console.log('点击事件触发')
      const target = event.target as HTMLElement
      if (target.tagName.toLowerCase() === 'img') {
        console.log('点击了图片', target)
        imgStore.setImg(target as HTMLImageElement)
      }
    })
  }
})
</script>

<template>
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
      <ContentActions />
      <div class="divider" />
      <a class="action-button" :href="blog?.url" target="_blank" rel="noopener">
        原文链接
      </a>
    </div>
    <div ref="blogContentRef" class="html-render" v-html="blog?.content" />
  </div>
</template>

<style lang="less">
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
</style>
