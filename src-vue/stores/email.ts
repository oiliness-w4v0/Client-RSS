import { defineStore } from 'pinia'

export const useEmailStore = defineStore('dialog-email', {
  state: () => ({
    open: false,
  }),
  actions: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
    },
  },
})
