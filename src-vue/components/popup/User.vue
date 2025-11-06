<script setup lang="ts">
import type { User, UserSelect } from '../../../src/db/schema'
import { computed, onMounted, ref } from 'vue'
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
  userStore.addUser({
    email: email.value,
  }).then(() => {
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

function selectUser(user: UserSelect) {
  console.log('选择用户', user)
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
  userStore.getUsers()
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
          <div class="switch-main">
            <div class="mb-8">
              <input v-model="email" type="email" placeholder="请输入邮箱...">
            </div>
            <div>
              <button class="button w-full" @click="login">
                登录
              </button>
            </div>
          </div>
        </div>
        <div class="user-space switch-slide-2">
          <div class="avatar">
            <div v-if="loading" class="loading">
              <AiOutlineLoading :size="16" class="rotate" />
            </div>
            <div class="c1" />
            <div class="c2" />
            <div class="c3" />
            <div class="c4" />
            <div class="c5" />
            <img src="https://avatars.githubusercontent.com/u/1" alt="">
          </div>
          <div class="user-list">
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

        .switch-main {
          width: 300px;
          display: flex;
          flex-direction: column;
          gap: 0;

          div {
            &:first-child {
              input {
                width: 100%;
                height: 32px;
                padding: 0 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 12px;
                outline: none;
                transition: all 0.2s ease;

                &:focus {
                  border-color: var(--primary-color);
                  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                }
              }
            }
          }
        }
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
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .loading {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(26, 26, 26, 0.964);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

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
      display: inline-flex;
      flex-direction: column;
      justify-content: center;

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
