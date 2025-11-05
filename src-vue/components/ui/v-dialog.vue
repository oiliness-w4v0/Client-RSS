<script setup lang="ts">
import { AiOutlineLoading } from 'vue-icons-plus/ai'

const props = withDefaults(defineProps<{
  title?: string
  hasTitle?: boolean
  open?: boolean
  width?: number
  loading?: boolean
}>(), {
  hasTitle: true,
  open: false,
  width: 400,
  loading: false,
})

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

function closeEmailDialog() {
  emits('update:open', false)
}
</script>

<template>
  <div class="v-dialog">
    <div v-if="props.open" class="masker" @click="closeEmailDialog" />
    <Transition name="slide-fade">
      <div
        v-if="props.open"
        :style="{
          width: `${props.width}px`,
          padding: props.hasTitle ? '10px 20px 30px 20px' : '35px 20px',
        }"
        class="content"
      >
        <h2 v-if="props.hasTitle">
          {{ props.title || '弹窗' }}
        </h2>
        <div v-if="loading" class="loading">
          <AiOutlineLoading :size="15" class="rotate" />
        </div>
        <div class="content-core">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="less" scoped>
.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}

.slide-fade-leave-active {
  transition: opacity 0.13s cubic-bezier(1, 0.5, 0.8, 1);
  transition: transform 0.05s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

.v-dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    // position: fixed;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    position: absolute;
    width: 400px;
    padding: 10px 20px 30px 20px;
    background-color: var(--sidebar-background-color);
    border-radius: 8px;
    z-index: 101;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: initial;

    .loading {
      position: absolute;
      top: 14px;
      right: 20px;
      pointer-events: none;
    }

    h2 {
      margin-bottom: 10px;
      font-size: 12px;
    }

    .content-core {
      max-height: 400px;
      overflow-y: auto;
      padding-right: 4px;
    }
  }
}

// 无限旋转动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
