import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 96 }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/field/:categoryId?',
      name: 'field',
      component: () => import('@/views/FieldView.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('@/views/ArticleView.vue'),
    },
    {
      path: '/scenarios/:id?',
      name: 'scenarios',
      component: () => import('@/views/ScenariosView.vue'),
    },
    {
      path: '/atlas/:id?',
      name: 'atlas',
      component: () => import('@/views/AtlasView.vue'),
    },
    {
      path: '/kit',
      name: 'kit',
      component: () => import('@/views/KitView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
