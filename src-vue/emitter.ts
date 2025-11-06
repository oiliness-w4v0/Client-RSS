import mitt from 'mitt'

export const emitter = mitt<{
  'scroll-to-current-position': boolean
  'close-feed-dialog': (() => void) | undefined
}>()
