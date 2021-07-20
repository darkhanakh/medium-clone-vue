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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
