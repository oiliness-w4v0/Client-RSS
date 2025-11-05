<script setup lang="ts">
import { computed, ref } from 'vue'
import { AiOutlineRedo, AiOutlineShareAlt } from 'vue-icons-plus/ai'
import vDialog from './ui/v-dialog.vue'

const loading = ref(false)

const open = ref(false)

function openDialog() {
  open.value = true
}

const tos = ref<string[]>([])

async function sendEmail() {
  if (loading.value)
    return
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

const userList = ref([
  { id: '1', img: 'https://fiddle.electronjs.org/electron-logo.svg', email: '18267094443@163.com' },
  { id: '2', img: 'https://www.antdv.com/vue.png', email: 'example2@163.com' },
  { id: '3', img: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', email: 'example3@163.com' },
  { id: '4', img: 'https://vuejs.org/images/logo.png', email: 'example4@163.com' },
])

function addUser(id: string) {
  const index = tos.value.indexOf(id)
  if (index === -1) {
    tos.value.push(id)
  }
  else {
    tos.value.splice(index, 1)
  }
}

const emails = computed(() => {
  return tos.value
    .map((id) => {
      const user = userList.value.find(u => u.id === id)
      return user ? user.email : null
    })
    .filter(email => email !== null)
    .join(',')
})
</script>

<template>
  <div>
    <button class="share" @click="openDialog">
      <AiOutlineShareAlt :size="15" />分享给朋友
    </button>
    <v-dialog v-model:open="open" title="分享文章">
      <p>请选择需要分享的朋友，我们会将文章转载给他们。</p>
      <div class="users">
        <button
          v-for="user in userList" :key="user.id" :class="{
            active: tos.includes(user.id),
          }" class="action-button" @click="addUser(user.id)"
        >
          <div class="user-icon">
            <img :src="user.img" alt="img">
          </div>
          {{ user.email }}
        </button>
      </div>
      <input v-model="emails" type="text" placeholder="或输入邮箱，用逗号分隔">
      <button class="send-email" @click="sendEmail">
        <AiOutlineRedo v-if="loading" :size="15" class="rotate" />
        发送
      </button>
    </v-dialog>
  </div>
</template>

<style lang="less" scoped>
button.share {
  border: none;
  font-size: 12px;
  cursor: pointer;
  gap: 5px;
  background-color: transparent;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--menu-active-background-color) !important;
    font-weight: bold;
  }
}

.users {
  display: flex;
  margin-bottom: 20px;
  gap: 5px;
  flex-wrap: wrap;

  button.action-button {
    padding: 6px 12px;
    border: none;
    border-radius: 50px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(198, 198, 198, 0.15);

    .user-icon {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 12px;
        height: 12px;
        object-fit: cover;
      }
    }

    &:hover {
      background-color: rgba(100, 100, 100, 0.15);
    }

    &.active {
      background-color: rgb(0, 77, 177);
      color: white;
    }
  }
}

p {
  margin-bottom: 20px;
}

button.send-email {
  width: 100%;
  padding: 10px;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: #333;
  }
}
</style>
