<script setup lang="ts">
import { useCacheStore } from '@/stores/cache'

const cacheStore = useCacheStore()
</script>

<template>
  <div>
    <fieldset class="theme-selector">
      <div class="radio-group">
        <label class="theme-option" for="toggle-theme-light" @click="cacheStore.setTheme('light')">
          <input
            id="toggle-theme-light" v-model="cacheStore.cache.theme" type="radio" name="theme-select" value="light"
            class="radio-input"
          >
          <div class="theme-box light-theme" />
          <span class="option-label">
            <svg class="icon check-icon" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <svg class="icon minus-icon" viewBox="0 0 24 24">
              <path d="M5 12h14" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <span class="label-text">Light</span>
          </span>
        </label>

        <label class="theme-option" for="toggle-theme-dark" @click="cacheStore.setTheme('dark')">
          <input
            id="toggle-theme-dark" v-model="cacheStore.cache.theme" type="radio" name="theme-select" value="dark"
            class="radio-input"
          >
          <div class="theme-box dark-theme" />
          <span class="option-label">
            <svg class="icon check-icon" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <svg class="icon minus-icon" viewBox="0 0 24 24">
              <path d="M5 12h14" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <span class="label-text">Dark</span>
          </span>
        </label>

        <label class="theme-option" for="toggle-theme-system" @click="cacheStore.setTheme('system')">
          <input
            id="toggle-theme-system" v-model="cacheStore.cache.theme" type="radio" name="theme-select"
            value="system" class="radio-input"
          >
          <div class="theme-box system-theme" />
          <span class="option-label">
            <svg class="icon check-icon" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <svg class="icon minus-icon" viewBox="0 0 24 24">
              <path d="M5 12h14" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            <span class="label-text">System</span>
          </span>
        </label>
      </div>
    </fieldset>
  </div>
</template>

<style scoped>
.theme-selector {
  border: none;
}

.legend {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.radio-input {
  position: absolute;
  opacity: 0;
}

.theme-box {
  width: 88px;
  height: 70px;
  border-radius: 6px;
  border: 1px solid #555;
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

/* Fake themes */
.light-theme {
  background: linear-gradient(to bottom, #fff 60%, #e5e5e5 40%);
}

.dark-theme {
  background: linear-gradient(to bottom, #1a1a1a 60%, #333 40%);
}

.system-theme {
  background: repeating-linear-gradient(45deg,
      #ccc,
      #ccc 10px,
      #999 10px,
      #999 20px);
}

.radio-input:checked+.theme-box {
  border-color: #6366f1;
  background-color: rgba(99, 102, 241, 0.1);
  outline: 3px solid rgba(99, 102, 241, 0.4);
}

.option-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #ccc;
}

.label-text {
  color: rgb(38, 0, 255);
}

.theme-option input:checked~.option-label .check-icon {
  display: inline-block;
}

.theme-option input:not(:checked)~.option-label .check-icon {
  display: none;
}

.theme-option input:checked~.option-label .minus-icon {
  display: none;
}

.theme-option input:not(:checked)~.option-label .minus-icon {
  display: inline-block;
}

.icon {
  width: 16px;
  height: 16px;
  color: #6366f1;
}
</style>
