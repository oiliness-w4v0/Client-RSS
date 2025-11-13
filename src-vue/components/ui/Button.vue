<script setup lang="ts">

</script>

<template>
  <button
    v-bind="$attrs" class="
 bg-blue-600 text-white px-4.5 py-2 rounded-lg h-max cursor-pointer
 hover:bg-blue-700 active:scale-97 transition-all duration-100 flex items-center gap-2
  "
  >
    <slot />
  </button>
</template>

<style scoped></style>
