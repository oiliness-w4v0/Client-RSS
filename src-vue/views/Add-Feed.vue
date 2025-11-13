<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import {
  AiOutlineFileText,
  AiOutlineRedo,
} from 'vue-icons-plus/ai'
import Card from '@/components/Card.vue'
import CardItem from '@/components/CardItem.vue'
import Feed from '@/components/popup/Feed.vue'
import ThemeItem from '@/components/ThemeItem.vue'
import { usePopupStore } from '@/stores/popup'
import { useAppStore } from '../stores/app'

const rssUrl = ref('https://www.ruanyifeng.com/blog/atom.xml')
// const loading = ref(false)
const appStore = useAppStore()
const popupStore = usePopupStore()

// async function addRss() {
//   if (loading.value)
//     return
//   loading.value = true

//   await appStore.subscribeRSS(rssUrl.value)
//   await appStore.getAllFeedsWithArticles()
//   loading.value = false
// }

function openAddFeedPopup() {
  popupStore.openPopup(Feed)
  // Open another popup to add feed
}

function selectChange(e: Event) {
  const {
    value,
    checked,
  } = e.target as HTMLInputElement
  if (checked) {
    appStore.addSubscription(1, Number(value))
  }
  else {
    appStore.removeSubscription(1, Number(value))
  }
}
</script>

<template>
  <div class="feed-popup p-8 pt-18">
    <div class="results">
      <div class="results-list">
        <div class="entry" @click="openAddFeedPopup">
          <div class="icon">
            <AiOutlineFileText :size="18" />
          </div>
          <div class="desc">
            <div class="title">
              添加订阅源
            </div>
            <span>支持 RSS 2.0 协议</span>
          </div>
        </div>

        <label v-for="(feed, index) in appStore.feedsWithArticles" :key="feed.id" :for="`feed-${index}`">
          <div class="entry">
            <div class="icon">
              <input
                :id="`feed-${index}`"
                v-model="appStore.subscriptions"
                type="checkbox"
                :value="feed.id"
                @change="selectChange"
              >
            </div>
            <div class="desc">
              <div class="title">
                {{ feed.title }}
              </div>
              <span>最新更新：{{ dayjs(feed.lastBuildDate).format('YYYY/MM/DD HH:mm') }}</span>
            </div>
            <p class="badge">
              最新
            </p>
          </div>
        </label>
      </div>
    </div>
    <!-- <div>
      <Card />
    </div>
    <div>
      <CardItem />
    </div>
    <div>
      <ThemeItem />
    </div> -->

    <!-- <div class="form-container">
      <form class="form">
        <div class="form-group">
          <label class="lg">注册/登陆</label>
        </div>
        <div class="form-group">
          <label for="email">Company Email</label>
          <input id="email" type="text" name="email" required>
        </div>
        <div class="form-group">
          <label for="textarea">How Can We Help You?</label>
          <textarea id="textarea" name="textarea" rows="10" cols="50" required />
        </div>
        <button class="form-submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div> -->

    <!-- <div class="flex">
      <input
        v-model="rssUrl" type="text" class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    "
      >

      <div class="px-3 py-2 border rounded-md text-sm" @click="addRss">
        <AiOutlineRedo v-if="loading" :size="15" class="rotate" />
        订阅
      </div>
    </div> -->
  </div>
</template>

<style lang="less" scoped>
.results {
  .results-list {
    display: flex;
    flex-direction: column;

    .entry {
      cursor: pointer;
      display: grid;
      grid-template-columns: 40px 1fr 40px;
      gap: 12px;
      padding: 5px 20px;
      transition: all 0.2s cubic-bezier(0.15, 0.83, 0.66, 1);

      .badge {
        width: 40px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        background: #DDFFDE;
        border: 1px solid #08581d0e;
        border-radius: 7px;
        font-weight: 700;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #08581D;
      }

      .desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;

        .title {
          cursor: pointer;
          display: block;
          font-size: 12px;
          line-height: 15px;
          color: var(--text-title-color);
        }

        span {
          font-size: 10px;
          line-height: 12px;
          color: var(--text-subtitle-color);
        }
      }

      .icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 7px;
        transition: all 0.2s cubic-bezier(0.15, 0.83, 0.66, 1);
        color: white;
      }

      &:hover {
        background-color: var(--icon-hover-background-color);
        .title {
          color: #1763fa;
        }

        span {
          color: #7ba0eb;
        }
      }
    }
  }
}

.feed-popup {
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
