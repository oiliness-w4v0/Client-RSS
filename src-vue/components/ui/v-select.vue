<script setup lang="ts">
import { computed, ref } from 'vue'
import { AiOutlineFunction } from 'vue-icons-plus/ai'

const props = defineProps<{
  list: Array<{
    label: string
    value: string
  }>
  value?: string
}>()

const emits = defineEmits<{
  (e: 'update:value', value: string): void
}>()

const open = ref(false)

function showDropdown() {
  open.value = true
}

function closeDropdown() {
  open.value = false
}

const selectedLabel = computed(() => {
  const selectedItem = props.list.find(item => item.value === props.value)
  return selectedItem ? selectedItem.label : ''
})
</script>

<template>
  <div class="v-dropdown">
    <div class="icons icons-2" @click="showDropdown">
      {{ selectedLabel }}
    </div>
    <div v-if="open" class="masker transparent" @click="closeDropdown" />
    <Transition name="slide-fade">
      <div v-if="open" class="content">
        <ul>
          <li v-for="item in props.list" :key="item.value" @click="emits('update:value', item.value); closeDropdown()">
            {{ item.label }}
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

.icons-2 {
  padding: 5px 12px;
  font-size: 10px;
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
        z-index: 42;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                padding: 5px 6px;
                cursor: pointer;
                border-radius: 4px;

                &:hover {
                    background-color: var(--icon-hover-background-color);
                }
            }
        }
    }
}
</style>
