import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/auth/Register';
import Login from '@/views/auth/Login';
import GlobalFeed from '@/views/feed/GlobalFeed';

const routes = [
  {
    path: '/',
    component: GlobalFeed,
    name: 'globalFeed',
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/feed',
    component: GlobalFeed,
    name: 'yourFeed',
  },
  {
    path: '/tags/:slug',
    component: GlobalFeed,
    name: 'tag',
  },
  {
    path: '/article/new',
    component: GlobalFeed,
    name: 'createArticle',
  },
  {
    path: '/article/:slug',
    component: GlobalFeed,
    name: 'article',
  },
  {
    path: '/article/:slug/edit',
    component: GlobalFeed,
    name: 'editArticle',
  },
  {
    path: '/settings',
    component: GlobalFeed,
    name: 'settings',
  },
  {
    path: '/profiles/:slug',
    component: GlobalFeed,
    name: 'userProfile',
  },
  {
    path: '/profiles/:slug/favorites',
    component: GlobalFeed,
    name: 'userProfileFavorites',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
