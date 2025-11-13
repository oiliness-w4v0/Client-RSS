import {
  createRouter,
  createWebHistory,
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('@/views/Article.vue'),
    },
    {
      path: '/address-book',
      name: 'AddressBook',
      component: () => import('@/views/Address-Book.vue'),
    },
    {
      path: '/toggle-theme',
      name: 'ToggleTheme',
      component: () => import('@/views/Toggle-Theme.vue'),
    },
    {
      path: '/add-feed',
      name: 'AddFeed',
      component: () => import('@/views/Add-Feed.vue'),
    },
  ],
})

export default router
