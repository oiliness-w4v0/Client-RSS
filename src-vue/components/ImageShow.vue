<script setup lang="ts">
import { ref, watch } from 'vue'
import { useImgStore } from '../stores/img'

const show = ref<boolean>(false)
const imgRef = ref<HTMLImageElement | null>(null)

const imgStore = useImgStore()
watch(
  () => imgStore.imgBaseInfo.url,
  (newUrl) => {
    if (imgRef.value) {
      imgRef.value.alt = '图片'
      imgRef.value.style.top = `${imgStore.imgBaseInfo.position.top}px`
      imgRef.value.style.left = `${imgStore.imgBaseInfo.position.left}px`
      imgRef.value.style.width = `${imgStore.imgBaseInfo.width}px`
      imgRef.value.style.height = `${imgStore.imgBaseInfo.height}px`
      imgRef.value.src = newUrl
      imgRef.value.onload = () => {
        imgRef.value!.style.opacity = '1'
        show.value = true

        // 设置图片的定位和大小 居中
        setTimeout(() => {
          imgRef.value!.style.top = `${window.innerHeight / 2 - imgRef.value!.height / 2}px`
          imgRef.value!.style.left = `${window.innerWidth / 2 - imgRef.value!.width / 2}px`
          imgRef.value!.classList.add('active')
        }, 5)
      }
      imgRef.value.onerror = () => {
        // 图片加载失败时的处理
        imgRef.value!.style.opacity = '1'
        imgRef.value!.alt = '图片加载失败'
      }
    }
  },
)

function clearUrl() {
  show.value = false
  imgStore.clear()
  imgRef.value!.classList.remove('active')
  imgRef.value!.style.opacity = '0'
  imgRef.value!.src = ''
}
</script>

<template>
  <div v-show="show" class="area9">
    <div class="masker" @click="clearUrl" />
    <img ref="imgRef" alt="图片">
  </div>
</template>

<style lang="less" scoped>
.area9 {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  transition: all 10.3s;
  z-index: 101;
  // .masker {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background-color: rgba(0, 0, 0, 0.89);
  // }
  img {
    max-width: 80%;
    max-height: 80%;
    z-index: 100;
    object-fit: contain;
    position: absolute;
    transition: all 0.3s !important;
    &.active {
      transform: scale(1.6);
    }
  }
}
</style>
