import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import MilestoneTracker from '@/components/MilestoneTracker.vue';
import ForumView from '@/components/ForumView.vue';
import LoginView from '@/views/LoginView.vue';
import AnalyticsView from '@/components/AnalyticsView.vue';
import ProfileManage from '@/components/ProfileManage.vue';

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
  {
    path: '/analytics',
    name: 'analytics',
    component: AnalyticsView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileManage
  },
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for history mode
  routes
});

export default router;
