<script setup lang="ts">
import { AiOutlineBug, AiOutlineGitlab, AiOutlineHistory, AiOutlineTwitch } from 'vue-icons-plus/ai'
import User from '@/components/dialog-user.vue'
import { usePopupStore } from '@/stores/popup'

const popupStore = usePopupStore()

function openUserDialog() {
  popupStore.openPopup(User)
}
</script>

<template>
  <div class="v-drawer">
    <div class="content-area">
      <ul>
        <li>
          <div class="menu-item">
            <span class="icon"><AiOutlineGitlab :size="15" /></span>
            <span class="label">通讯录 x </span>
          </div>
        </li>
        <li>
          <div class="menu-item">
            <span class="icon"><AiOutlineHistory :size="15" /></span>
            <span class="label">邮件历史发送 x</span>
          </div>
        </li>
        <li>
          <div class="menu-item" @click="openUserDialog">
            <span class="icon"><AiOutlineTwitch :size="15" /></span>
            <span class="label">关于</span>
          </div>
        </li>
        <li>
          <div class="menu-item">
            <span class="icon"><AiOutlineBug :size="15" /></span>
            <span class="label">应用日志 x</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.v-drawer {
    width: 100%;

    .content-area {
      width: 100%;
      padding-top: 40px;

      ul {
          width: 100%;
          list-style: none;
          padding: 0 8px;
          margin: 0;
      }
    }
}
</style>
