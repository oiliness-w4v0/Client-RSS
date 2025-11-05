import { createMemoryHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      redirect: '/rss-source',
      children: [
        // {
        //   path: 'setting',
        //   components: {
        //     nav: Rss,
        //     content: DarkTheme,
        //   },
        // },
        // {
        //   path: 'rss-source',
        //   components: {
        //     nav: Rss,
        //     content: Article,
        //   },
        // },
      ],
    },
  ],
})
