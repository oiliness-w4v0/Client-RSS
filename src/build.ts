;(() => {
  Bun.build({
    entrypoints: ['./src/main.ts', './src/preload.ts'],
    outdir: './dist',
    target: 'node',
    format: 'cjs',
    external: ['electron'],
  })
})()
