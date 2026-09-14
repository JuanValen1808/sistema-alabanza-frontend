// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import PublicSongsView from '../views/PublicSongsView.vue';
import MusicianView from '../views/MusicianView.vue';
import MusicEditorView from '../views/MusicEditorView.vue';
import WorshipAdminView from '../views/WorshipAdminView.vue';
import WorshipEditView from '../views/WorshipEditView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import AdminUsuariosView from '../views/AdminUsuariosView.vue'; // 👈 Nueva vista de administración de usuarios

const routes = [
  { 
    path: '/', 
    name: 'welcome', 
    component: WelcomeView,
    meta: { requiresAuth: false } 
  },
  { 
    path: '/coritos', 
    name: 'public-songs', 
    component: PublicSongsView,
    meta: { requiresAuth: false } 
  },
  { 
    path: '/repertorio', 
    name: 'musician', 
    component: MusicianView,
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    name: 'login', 
    component: LoginView 
  },
  { 
    path: '/perfil', 
    name: 'profile', 
    component: ProfileView,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/editor', 
    name: 'editor', 
    component: MusicEditorView,
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  { 
    path: '/admin-cultos', 
    name: 'admin-cultos', 
    component: WorshipAdminView,
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  { 
    path: '/admin-cultos/editar/:id', 
    name: 'admin-cultos-editar', 
    component: WorshipEditView,
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  { 
    path: '/admin-usuarios', 
    name: 'admin-usuarios', 
    component: AdminUsuariosView,
    meta: { requiresAuth: true, requiresAdmin: true } // 👈 Solo accesible por el administrador
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.meta.requiresAdmin && user.role !== 'admin' && user.role_id !== 1) {
    alert('Acceso restringido solo para administradores.');
    next('/');
  } else {
    next();
  }
});

export default router;