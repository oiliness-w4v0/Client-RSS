<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string
}>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    class="
    w-full px-5 py-2.5 rounded-lg bg-transparent border-2 border-gray-300
    placeholder:opacity-30
    focus:outline-none focus:border-blue-500
    dark:border-gray-600 dark:focus:border-blue-400
 disabled:opacity-50 disabled:cursor-not-allowed
    "
    spellcheck="false"
    autoComplete="off"
    @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
  >
</template>

<style scoped></style>
