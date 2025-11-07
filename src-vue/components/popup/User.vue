<script setup lang="ts">
import type {
  User,
  UserSelect,
  UserWithFeeds,
  UserWithProfileInfo,
} from '../../../src/db/schema'
import {
  computed,
  onMounted,
  ref,
} from 'vue'
import { AiOutlineLoading } from 'vue-icons-plus/ai'
import { useUserStore } from '@/stores/user'

const email = ref('')
const userStore = useUserStore()
const status = ref<'status-1' | 'status-2' | 'status-3'>('status-1')
const loading = ref(false)

function login() {
  if (!email.value) {
    status.value = 'status-2'
    return
  }
  // 登录逻辑
  userStore.addUser(email.value).then(() => {
    status.value = 'status-2'
    email.value = ''
  })
}

function logout() {
  status.value = 'status-1'
  // 退出登录逻辑
}

function changeUser() {
  status.value = 'status-3'
  // 切换账户逻辑
}

function selectUser(user: UserWithProfileInfo) {
  userStore.setCurrentUser(user)
  status.value = 'status-2'
  // 选择账户逻辑
}

const statusIndex = computed(() => {
  switch (status.value) {
    case 'status-1':
      return 0
    case 'status-2':
      return 1
    case 'status-3':
      return 2
    default:
      return 0
  }
})

onMounted(() => {
  if (userStore.user) {
    status.value = 'status-2'
  }
  // userStore.getUsers().then(() => {
  // if (userStore.user) {
  //   status.value = 'status-2'
  // }
  // })
})
</script>

<template>
  <div class="user-popup">
    <div class="switch-wrapper">
      <div
        class="switch-container" :style="{
          top: `-${statusIndex * 240}px`,
        }"
      >
        <div class="user-space switch-slide-1">
          <div>
            <label for="inputname" class="block text-gray-800 font-semibold text-sm">邮箱</label>
            <div class="mt-2">
              <input
                v-model="email"
                type="email"
                class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500
    "
              >
            </div>
            <label class="pt-1 block text-gray-500 text-sm">有效邮箱地址</label>
            <div class="block mt-2">
              <button class="block cursor-pointer w-96 rounded-md border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-6" type="submit" @click="login">
                注册/登录
              </button>
            </div>
          </div>
        </div>
        <div class="user-space switch-slide-2">
          <div class="avatar flex flex-col items-center justify-center">
            <div v-if="loading" class="loading">
              <AiOutlineLoading :size="16" class="rotate" />
            </div>

            <img src="https://avatars.githubusercontent.com/u/1" alt="">
          </div>
          <div class="user-list py-12">
            <div class="item">
              <h2>@ 油腻_w4v0 ~</h2>
            </div>
            <div class="item">
              {{ userStore.user?.email }}
            </div>
            <div class="item">
              只有懦弱和失败者才会四处寻找借口。
            </div>
            <div>
              <button class="button mr-8" @click="changeUser">
                切换账户
              </button>

              <button class="button" @click="logout">
                添加账号
              </button>
            </div>
          </div>
        </div>
        <div class="user-space switch-slide-3">
          <div class="switch-main">
            <div v-for="user in userStore.users" :key="user.id" class="user" @click="selectUser(user)">
              <div class="user-avatar" />
              <div><h2>{{ user.email }}</h2></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-popup {
  width: 560px;
  padding-top: 20px;

  .switch-wrapper {
    width: 100%;
    height: 240px;
    position: relative;
    overflow: hidden;

    .switch-container {
      width: 100%;
      height: calc(240px * 4);
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.3s ease;

      .switch-slide-1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .switch-slide-3 {
        .switch-main {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 24px;

          .user {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .user-avatar {
              width: 80px;
              height: 80px;
              background-color: #d1d1d1;
              border-radius: 50px;
              border: 2px solid #ccc;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s ease;

              &:hover {
                border-color: var(--primary-color);
                color: #fff;
              }
            }

              h2 {
                margin: 6px 0;
              }
          }
        }
      }
    }
  }

  .user-space {
    display: flex;
    width: 100%;
    gap: 54px;
    height: 240px;
    padding: 0 24px;

    .avatar {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      position: relative;

      img {
        width: 160px;
        height: 160px;
        object-fit: cover;
        transition: all 0.16s ease;
        border-radius: 50%;
        position: relative;
      }
    }

    .user-list {
      max-height: 400px;
      overflow-y: auto;
      flex: 1;
      display: inline-flex;
      flex-direction: column;

      .item {
        width: 100%;
        margin-bottom: 12px;
        font-size: 12px;
      }

      button {
        display: inline-block;
        width: max-content;
      }
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

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
