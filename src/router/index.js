import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import MilestoneTracker from '@/components/MilestoneTracker.vue';
import ForumView from '@/components/ForumView.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/milestone-tracker',
    name: 'milestone-tracker',
    component: MilestoneTracker
  },
  {
    path: '/forum-view',
    name: 'forum-view',
    component: ForumView
  },
  {
    path: '/login',
    name: 'login-view',
    component: LoginView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
