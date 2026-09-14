<!-- src/views/RegisterView.vue -->
<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="dark-card p-6 sm:p-8 max-w-md w-full space-y-6 border border-[#262626]">
      <div class="text-center space-y-1">
        <h1 class="text-xl font-semibold text-white tracking-tight">Crear una Cuenta</h1>
        <p class="text-xs text-neutral-400">Regístrate para acceder al repertorio y cultos</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Nombre (Opcional)</label>
          <input v-model="name" type="text" class="w-full dark-input p-2.5 text-sm" placeholder="Tu nombre" />
        </div>

        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Correo electrónico</label>
          <input v-model="email" type="email" required class="w-full dark-input p-2.5 text-sm" placeholder="tu@correo.com" />
        </div>

        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Contraseña</label>
          <input v-model="password" type="password" required class="w-full dark-input p-2.5 text-sm" placeholder="••••••••" />
        </div>

        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Confirmar Contraseña</label>
          <input v-model="confirmPassword" type="password" required class="w-full dark-input p-2.5 text-sm" placeholder="••••••••" />
        </div>

        <p v-if="passwordError" class="text-xs text-red-400">{{ passwordError }}</p>

        <button type="submit" class="w-full bg-white hover:bg-neutral-200 text-black p-3 rounded-lg text-xs font-semibold transition-all mt-2">
          Registrarse
        </button>
      </form>

      <div class="text-center pt-2 border-t border-[#262626]">
        <p class="text-xs text-neutral-400">
          ¿Ya tienes una cuenta? 
          <router-link to="/login" class="text-white hover:underline font-medium ml-1">Inicia sesión</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordError = ref('');

const handleRegister = async () => {
  passwordError.value = '';

  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    await api.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    });
    
    alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
    router.push('/login');
  } catch (error) {
    console.error('Error en el registro:', error);
    alert(error.response?.data?.message || 'Error al registrar la cuenta.');
  }
};
</script>