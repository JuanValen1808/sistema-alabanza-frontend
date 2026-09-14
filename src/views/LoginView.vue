<!-- src/views/LoginView.vue -->
<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="dark-card p-6 sm:p-8 max-w-md w-full space-y-6 border border-[#262626]">
      <div class="text-center space-y-1">
        <h1 class="text-xl font-semibold text-white tracking-tight">Acceso al Sistema</h1>
        <p class="text-xs text-neutral-400">Ingresa tus credenciales para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Correo electrónico</label>
          <input v-model="email" type="email" required class="w-full dark-input p-2.5 text-sm" placeholder="tu@correo.com" />
        </div>

        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Contraseña</label>
          <input v-model="password" type="password" required class="w-full dark-input p-2.5 text-sm" placeholder="••••••••" />
        </div>

        <button type="submit" class="w-full bg-white hover:bg-neutral-200 text-black p-3 rounded-lg text-xs font-semibold transition-all mt-2">
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });
    
    // Guarda el token y los datos del usuario (incluyendo su rol)
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    // Redirige según el rol (Admin o Músico)
    if (response.data.user.role === 'admin') {
      router.push('/admin-cultos');
    } else {
      router.push('/repertorio');
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    alert('Credenciales inválidas o error en el servidor.');
  }
};
</script>