<script setup lang="ts">
import type { ArticleSelect } from '../../src/db/schema'
import dayjs from 'dayjs'
import { computed } from 'vue'
import {
  AiOutlineFolder,
  AiOutlineFolderOpen,
} from 'vue-icons-plus/ai'
import { useRouter } from 'vue-router'
import FeedPopup from '@/components/popup/Feed.vue'
import { usePopupStore } from '@/stores/popup'
import { useAppStore } from '../stores/app'
import { useCacheStore } from '../stores/cache'

const router = useRouter()
const popupStore = usePopupStore()
const appStore = useAppStore()
const cacheStore = useCacheStore()
const opens = computed(() => cacheStore.cache.feedId)
const feedsWithArticles = computed(() => appStore.feedsWithArticles.filter(
  (feed) => {
    return appStore.subscriptions.includes(feed.id!)
  },
))
const currentArticle = computed(() => cacheStore.cache.articleId)

function openFeed(feedId: number) {
  cacheStore.setFeedId(feedId)
}

function toggleArticle(article: ArticleSelect) {
  router.push({
    name: 'Article',
    params: { id: article.id },
  })
  cacheStore.setArticleId(article.id)
}

function jumpToFeedView() {
  popupStore.openPopup(FeedPopup)
}
</script>

<template>
  <div class="menu">
    <div v-show="feedsWithArticles.length === 0" class="feed-empty">
      <button @click="jumpToFeedView">
        去添加订阅
      </button>
    </div>
    <div v-for="feed in feedsWithArticles" :key="feed.id" class="feed">
      <div class="feed-item" @click="openFeed(feed.id!)">
        <AiOutlineFolder v-if="opens !== feed.id!" :size="15" />
        <AiOutlineFolderOpen v-if="opens === feed.id!" :size="15" />
        <span>{{ feed.title }}</span>
      </div>
      <Transition name="slide-fade" mode="out-in">
        <ul
          v-show="opens === feed.id!"
          :class="{
            backdrop: appStore.glass,
          }"
        >
          <li
            v-for="article in feed.articles"
            :key="article.id" :class="{
              active: article.id === currentArticle,
            }"
            @click="toggleArticle(article)"
          >
            <div class="title">
              {{ article.title }}
            </div>
            <div class="pub-date">
              {{ dayjs(article.publishedAt).format('ddd, DD MMM YYYY HH:mm:ss ZZ') }}
            </div>
            <div class="summary ellipsis-multi">
              {{ article.summary }}
            </div>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style lang="less">
.menu {
  flex: 1;
  position: relative;
  overflow-y: auto;

  .feed-empty {
    padding: 20px;
    min-height: 100px;
    color: var(--text-subtitle-color);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-actions {
    padding: 0 8px;
    position: sticky;
    top: 0;
    background-color: var(--sidebar-background-color);
  }

  .feed {

    .feed-item {
      padding: 4px 10px;
      position: sticky;
      top: 0;
      display: flex;
      gap: 8px;
      align-items: center;
      cursor: pointer;
      z-index: 5;
    }

    ul {
      padding: 0;
    }
  }
}

@media (prefers-color-scheme: light) {
  li {
    &.active {
      .title {
        color: #ffffff !important;
      }

      .pub-date {
        color: #999999 !important;
      }

      .summary {
        color: #cccccc !important;
      }
    }
  }
}
</style>

<style lang="less" scoped>
ul {
  margin: 0;
  list-style: none;
  &.backdrop {
    li {
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  li {
    padding: 10px 20px;
    cursor: pointer;

    &.active {
      background-color: var(--menu-active-background-color) !important;
      box-shadow: 10px 0 10px rgba(0, 0, 0, 0.6);

      .title {
        color: var(--text-title-color);
      }

      .pub-date {
        color: var(--text-normal-color);
      }

      .summary {
        color: var(--text-subtitle-color);
      }
    }

    &:hover {
      background-color: var(--menu-hover-background-color);
    }

    .title {
      font-weight: bold;
      color: var(--text-title-color);
      margin-bottom: 2px;
    }

    .pub-date {
      font-size: 12px;
      color: var(--text-normal-color);
      margin-bottom: 2px;
    }

    .summary {
      color: var(--text-subtitle-color);
    }
  }
}

.slide-fade-enter-active {
  transition: all 0s ease-out;
}

.slide-fade-leave-active {
  transition: all 0ms ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20%);
}
</style>
