<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

function handleInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    spellcheck="false"
    @input="handleInput"
  >
</template>

<style lang="less" scoped>
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  transition: all 0.3s;
  border: 1px solid #ccc;

  &:focus {
    border: 1px solid var(--primary-color);
  }
}
</style>
