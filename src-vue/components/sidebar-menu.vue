<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { AiOutlineFolder, AiOutlineFolderOpen } from 'vue-icons-plus/ai'
import FeedPopup from '@/components/dialog-feed.vue'
import { usePopupStore } from '@/stores/popup'
import { useAppStore } from '../stores/app'

const popupStore = usePopupStore()

const appStore = useAppStore()
const opens = ref<number>()
const feedsWithArticles = computed(() => appStore.feedsWithArticles.filter(
  (feed) => {
    return appStore.subscriptions.includes(feed.id!)
  },
))

function openFeed(feedId: number) {
  const has = opens.value === feedId
  if (has) {
    opens.value = undefined
  }
  else {
    opens.value = feedId
  }
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
        <ul v-show="opens === feed.id!">
          <li
            v-for="article in feed.articles"
            :key="article.id" :class="{
              active: article.id === appStore.currentArticle?.id,
            }"
            @click="appStore.setCurrentArticle(article)"
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
      background-color: var(--sidebar-background-color);
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

  li {
    padding: 10px 20px;
    cursor: pointer;

    &.active {
      background-color: var(--menu-active-background-color) !important;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

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
