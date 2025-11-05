import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    open: false,
    list: [
      {
        label: 'Settings',
        value: 'settings',
      },
      {
        label: 'Settings2',
        value: 'settings2',
      },
      {
        label: 'Settings3',
        value: 'settings3',
      },
    ],
  }),
  actions: {
    openDrawer() {
      this.open = true
    },
    closeDrawer() {
      this.open = false
    },
  },
})
