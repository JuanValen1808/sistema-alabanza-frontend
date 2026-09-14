<!-- src/components/Navbar.vue -->
<template>
  <!-- El header ocupa el 100% del ancho de la pantalla -->
  <header class="w-full border-b border-[#262626] bg-[#121212] sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
    <!-- Este div interno limita y alinea el contenido con el resto de la app -->
    <div class="w-full px-6 sm:px-10 h-16 flex items-center justify-between">
      
      <!-- Logo y Enlaces -->
      <div class="flex items-center gap-6">
        <router-link to="/" class="text-sm sm:text-base font-semibold text-white tracking-tight flex items-center gap-2.5">
          <img src="@/assets/logo-imp.png" alt="Logo" class="w-8 h-8 object-contain" />
          <span>Sistema Alabanza</span>
        </router-link>
        
        <nav v-if="isAdmin" class="hidden sm:flex items-center gap-4 text-xs">
          <router-link to="/editor" class="text-neutral-400 hover:text-white transition-colors">Editor de Canciones</router-link>
          <router-link to="/admin-cultos" class="text-neutral-400 hover:text-white transition-colors">Gestión de Cultos</router-link>
          <router-link to="/admin-usuarios" class="text-neutral-400 hover:text-white transition-colors">Gestión de Usuarios</router-link>
        </nav>
      </div>

      <!-- Acciones de Usuario -->
      <div class="flex items-center gap-2.5">
        <template v-if="!isLoggedIn">
          <router-link to="/login" class="px-3.5 py-1.5 bg-[#1f1f1f] hover:bg-[#2b2b2b] text-neutral-200 text-xs font-medium rounded-lg border border-[#333] transition-all">
            Iniciar Sesión
          </router-link>
        </template>

        <template v-else>
          <span class="hidden md:inline-block text-xs text-neutral-400 mr-2">
            Hola, <strong class="text-neutral-200">{{ userName }}</strong>
          </span>
          <router-link to="/perfil" class="px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#2b2b2b] text-neutral-200 text-xs font-medium rounded-lg border border-[#333] transition-all">
            Editar Perfil
          </router-link>
          <button @click="logout" class="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-medium rounded-lg border border-red-900/50 transition-all">
            Cerrar Sesión
          </button>
        </template>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);
const isAdmin = ref(false);
const userName = ref('');

onMounted(() => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (token) {
    isLoggedIn.value = true;
    userName.value = user.name || user.email || 'Usuario';
    isAdmin.value = user.role === 'admin' || user.role_id === 1;
  }
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  isLoggedIn.value = false;
  isAdmin.value = false;
  router.push('/'); // Redirige a la página de bienvenida (raíz)
};
</script>