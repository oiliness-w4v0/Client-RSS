<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import { AiOutlineRedo } from 'vue-icons-plus/ai'
import { useAppStore } from '../../stores/app'

const rssUrl = ref('https://www.ruanyifeng.com/blog/atom.xml')
const loading = ref(false)
const appStore = useAppStore()

async function addRss() {
  if (loading.value)
    return
  loading.value = true

  await appStore.subscribeRSS(rssUrl.value)
  await appStore.getAllFeedsWithArticles()
  loading.value = false
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

function formSubmit(e: Event) {
  e.preventDefault()
  console.log(e)
  // Handle form submission logic here
  // addRss()}
}
</script>

<template>
  <div class="feed-popup">
    <!-- <h2>
      {{ '弹窗' }}
    </h2> -->

    <!-- <div class="flex">
      <input v-model="rssUrl" type="text" class="flex-1" placeholder="搜索订阅源">
      <div class="button flex-0" @click="addRss">
        <AiOutlineRedo v-if="loading" :size="15" class="rotate" />
        订阅
      </div>
    </div> -->

    <div class="form-container">
      <form class="form" @submit="formSubmit">
        <div class="form-group">
          <label class="lg">注册/登陆</label>
        </div>
        <div class="form-group">
          <label for="email">Company Email</label>
          <input id="email" v-model="rssUrl" type="text" name="email" required>
        </div>
        <div class="form-group">
          <label for="textarea">How Can We Help You?</label>
          <textarea id="textarea" name="textarea" rows="10" cols="50" />
        </div>
        <button class="form-submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.feed-popup {
  width: 560px;
  box-sizing: border-box;
}

.divider {
  height: 1px;
  background-color: var(--divider-color);
  margin: 14px 0;
}

.form-container {
  width: 400px;
}

.form-container button:active {
  scale: 0.95;
}

.form-container .form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  display: block;
  margin-bottom: 5px;
  color: #717171;
  font-weight: 600;
  font-size: 12px;

  &.lg {
    font-size: 14px;
  }
}


.form-container .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  resize: none;
  color: #fff;
  height: 96px;
  border: 1px solid #414141;
  background-color: transparent;
  font-family: inherit;
}

.form-container .form-group input::placeholder {
  opacity: 0.5;
}

.form-container .form-group input:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-group textarea:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-submit-btn {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  font-family: inherit;
  color: #717171;
  font-weight: 600;
  width: 40%;
  background: #313131;
  border: 1px solid #414141;
  padding: 10px 16px;
  font-size: inherit;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 6px;
}

.form-container .form-submit-btn:hover {
  background-color: #fff;
  border-color: #fff;
}
</style>
