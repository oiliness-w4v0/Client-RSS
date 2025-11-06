import type { Component } from 'vue'
import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const usePopupStore = defineStore('popup', () => {
  const isOpen = ref(false) // 是否打开
  const content = shallowRef<Component | string | undefined>(undefined) // 弹窗内容（可以是字符串、Vue组件或对象）
  const onCloseCallback = ref<(() => void) | undefined>(undefined) // 关闭时的回调函数

  /**
   * 打开弹窗
   * @param {any} newContent - 弹窗内容
   * @param {Function} [callback] - 关闭时的回调（可选）
   */
  const openPopup = (newContent: Component | string, callback?: () => void) => {
    isOpen.value = true
    content.value = newContent
    onCloseCallback.value = callback
  }

  /**
   * 关闭弹窗，并执行回调
   */
  const closePopup = () => {
    if (onCloseCallback.value) {
      onCloseCallback.value() // 执行回调
      onCloseCallback.value = undefined // 清空回调
    }
    isOpen.value = false
    content.value = undefined
  }

  return {
    isOpen,
    content,
    onCloseCallback,
    openPopup,
    closePopup,
  }
})
