<script setup lang="ts">
import type { Component } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
  list: Array<{
    label: string
    value: string
    icon?: Component
  }>
}>()

const emits = defineEmits<{
  (e: 'change', value: string): void
}>()

const open = ref(false)

function showDropdown() {
  open.value = true
}

function closeDropdown() {
  open.value = false
}
</script>

<template>
  <div class="v-dropdown">
    <div class="icons" @click="showDropdown">
      <slot />
    </div>
    <div v-if="open" class="masker transparent" @click="closeDropdown" />
    <Transition name="slide-fade">
      <div v-if="open" class="content">
        <ul>
          <li
            v-for="item in props.list" :key="item.value"
            @click="emits('change', item.value); closeDropdown()"
          >
            <span class="icon">
              <component :is="item.icon" v-if="item.icon" :size="15" />
            </span>
            <span class="label">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style lang="less" scoped>
.slide-fade-enter-active {
    transition: all 0.15s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.13s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform-origin: top;
    transform: scale(0.8);
}

.v-dropdown {
    position: relative;

    .content {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        background-color: var(--dropdown-background-color);
        border-radius: 7px;
        position: absolute;
        top: 26px;
        left: 0;
        width: 140px;
        padding: 4px;
        border: 1px solid var(--dropdown-border-color);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 54;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                padding: 5px 6px;
                cursor: pointer;
                border-radius: 4px;
                display: flex;
                align-items: center;

                &:hover {
                    background-color: var(--icon-hover-background-color);
                }

                span {
                    display: flex;
                    align-items: center;
                    &.icon {
                        width: 20px;
                        display: flex;
                        justify-content: flex-end;
                    }

                    &.label {
                        margin-left: 8px;
                    }
                }
            }
        }
    }
}
</style>
