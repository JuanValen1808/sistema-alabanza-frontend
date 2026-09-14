<!-- src/views/ProfileView.vue -->
<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="dark-card p-6 sm:p-8 max-w-md w-full space-y-6 border border-[#262626]">
      <div class="text-center space-y-1">
        <h1 class="text-xl font-semibold text-white tracking-tight">Editar Perfil</h1>
        <p class="text-xs text-neutral-400">Actualiza tus datos personales y contraseña</p>
      </div>

      <form @submit.prevent="handleUpdate" class="space-y-4">
        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Nombre</label>
          <input v-model="name" type="text" required class="w-full dark-input p-2.5 text-sm" />
        </div>

        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Correo electrónico</label>
          <input v-model="email" type="email" required class="w-full dark-input p-2.5 text-sm" />
        </div>

        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Nueva Contraseña (Opcional)</label>
          <input v-model="password" type="password" class="w-full dark-input p-2.5 text-sm" placeholder="Dejar en blanco para mantener la actual" />
        </div>

        <button type="submit" class="w-full bg-white hover:bg-neutral-200 text-black p-3 rounded-lg text-xs font-semibold transition-all mt-2">
          Guardar Cambios
        </button>
      </form>

      <div class="text-center pt-2 border-t border-[#262626]">
        <router-link to="/" class="text-xs text-neutral-400 hover:text-white transition-colors">Volver al inicio</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const userId = ref(null);

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.id) {
    userId.value = user.id;
    name.value = user.name || '';
    email.value = user.email || '';
  }
});

const handleUpdate = async () => {
  try {
    const res = await api.patch(`/users/profile/${userId.value}`, {
      name: name.value,
      email: email.value,
      password: password.value || undefined
    });

    // Actualizamos el localStorage con los nuevos datos
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    currentUser.name = res.data.name;
    currentUser.email = res.data.email;
    localStorage.setItem('user', JSON.stringify(currentUser));

    alert('Perfil actualizado con éxito.');
    router.push('/');
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    alert(error.response?.data?.message || 'Error al actualizar los datos.');
  }
};
</script>