import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImgStore = defineStore('img', () => {
  // 图片基本信息 url/position/width/height
  const imgBaseInfo = ref({
    url: '',
    position: {
      top: 0,
      left: 0,
    },
    width: 0,
    height: 0,
  })

  function setImg(img: HTMLImageElement) {
    const rect = img.getBoundingClientRect()
    imgBaseInfo.value.url = img.src
    imgBaseInfo.value.position.top = rect.top
    imgBaseInfo.value.position.left = rect.left
    imgBaseInfo.value.width = rect.width
    imgBaseInfo.value.height = rect.height
  }

  function clear() {
    imgBaseInfo.value.url = ''
    imgBaseInfo.value.position.top = 0
    imgBaseInfo.value.position.left = 0
    imgBaseInfo.value.width = 0
    imgBaseInfo.value.height = 0
  }

  return { imgBaseInfo, setImg, clear }
})
