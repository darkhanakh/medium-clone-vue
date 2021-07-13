import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/Register';
import Home from '@/views/Home';
import Login from '@/views/Login';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
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
