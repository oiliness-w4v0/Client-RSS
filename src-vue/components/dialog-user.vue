<script setup lang="ts">
import { ref } from 'vue'
import { AiOutlineTwitch } from 'vue-icons-plus/ai'
import vDialog from './ui/v-dialog.vue'

const loading = ref(false)
const open = ref(false)

function openDialog() {
  open.value = true
}
</script>

<template>
  <li>
    <div class="menu-item" @click="openDialog">
      <span class="icon">
        <AiOutlineTwitch :size="15" />
      </span>
      <span>关于</span>
    </div>

    <v-dialog v-model:open="open" :width="600" :has-title="false" :loading="loading">
      <div class="user-space">
        <div class="avatar">
          <div class="c1" />
          <div class="c2" />
          <div class="c3" />
          <div class="c4" />
          <div class="c5" />
          <img src="https://avatars.githubusercontent.com/u/1" alt="">
        </div>
        <div class="user-list">
          <div>
            <div class="item">
              @ 油腻_w4v0 ~
            </div>
            <div class="item">
              18267094443@163.com
            </div>
            <div class="item">
              只有懦弱和失败者才会四处寻找借口。
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
  </li>
</template>

<style lang="less" scoped>
.user-space {
  display: flex;
  gap: 54px;
  height: 100%;
  padding: 0 24px;

  .avatar {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .c1,
    .c2,
    .c3,
    .c4,
    .c5 {
      width: 160px;
      height: 160px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: 8;
      // 向外扩散的动画效果
      animation: pulse 2s infinite;
    }

    .c1 {
      animation-delay: 0ms;
      border: 1px solid rgba(135, 135, 135, 0.6);
    }

    .c2 {
      animation-delay: 500ms;
      border: 1px solid rgba(211, 3, 152, 0.83);
    }

    .c3 {
      animation-delay: 1000ms;
      border: 1px solid rgba(4, 104, 134, 0.6);
    }

    .c4 {
      animation-delay: 1500ms;
      border: 1px solid rgba(125, 199, 14, 0.6);
    }

    .c5 {
      animation-delay: 2000ms;
      border: 1px solid rgb(213, 30, 30, 0.6);
    }

    img {
      width: 160px;
      height: 160px;
      object-fit: cover;
      transition: all 0.16s ease;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
      position: relative;
    }
  }

  .user-list {
    max-height: 400px;
    overflow-y: auto;
    flex: 1;
    display: flex;
    align-items: center;

    .item {
      width: 100%;
      margin-bottom: 12px;
      font-size: 12px;
    }
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0;
  }
}
</style>
