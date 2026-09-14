<!-- src/views/AdminUsuariosView.vue -->
<template>
  <div class="min-h-screen bg-[#0c0a09] text-stone-100 flex flex-col selection:bg-amber-500 selection:text-black">
    <Navbar />

    <main class="flex-1 max-w-6xl w-full mx-auto px-6 py-10 space-y-10">
      
      <!-- Cabecera -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            <span class="w-2 h-6 bg-amber-500 rounded-full"></span>
            Gestión de Usuarios y Accesos
          </h1>
          <p class="text-xs text-stone-400 mt-1">Crea cuentas para los nuevos integrantes del equipo de alabanza y administra los accesos.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Formulario para Registrar Nuevo Usuario -->
        <div class="bg-stone-900/60 p-6 rounded-2xl border border-stone-800/80 backdrop-blur-md space-y-5 h-fit shadow-xl">
          <h2 class="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <span class="w-1.5 h-4 bg-amber-500 rounded-full"></span>
            Registrar Nuevo Miembro
          </h2>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="block text-xs text-stone-400 mb-1">Nombre Completo</label>
              <input 
                v-model="form.name" 
                type="text" 
                required 
                class="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:border-amber-500 outline-none transition-all" 
                placeholder="Ej. Hermano Juan" 
              />
            </div>

            <div>
              <label class="block text-xs text-stone-400 mb-1">Correo Electrónico</label>
              <input 
                v-model="form.email" 
                type="email" 
                required 
                class="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:border-amber-500 outline-none transition-all" 
                placeholder="hermano@iglesia.com" 
              />
            </div>

            <!-- Contraseña Temporal con opción de ver -->
            <div>
              <label class="block text-xs text-stone-400 mb-1">Contraseña Temporal</label>
              <div class="relative">
                <input 
                  v-model="form.password" 
                  :type="showPassword ? 'text' : 'password'" 
                  required 
                  class="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:border-amber-500 outline-none transition-all pr-10" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                >
                  {{ showPassword ? 'Ocultar' : 'Ver' }}
                </button>
              </div>
            </div>

            <!-- Confirmar Contraseña Temporal -->
            <div>
              <label class="block text-xs text-stone-400 mb-1">Confirmar Contraseña Temporal</label>
              <input 
                v-model="form.confirmPassword" 
                :type="showPassword ? 'text' : 'password'" 
                required 
                class="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:border-amber-500 outline-none transition-all" 
                placeholder="••••••••" 
              />
            </div>

            <div>
              <label class="block text-xs text-stone-400 mb-1">Rol en el Sistema</label>
              <select 
                v-model="form.role" 
                class="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:border-amber-500 outline-none transition-all"
              >
                <option value="user">Miembro de Alabanza</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div v-if="successMessage" class="p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-xs text-emerald-400">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-xs text-red-400">
              {{ errorMessage }}
            </div>

            <button 
              type="submit" 
              class="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-600/20"
            >
              Crear Cuenta
            </button>
          </form>
        </div>

        <!-- Tabla de Usuarios Registrados -->
        <div class="lg:col-span-2 bg-stone-900/60 p-6 rounded-2xl border border-stone-800/80 backdrop-blur-md space-y-4 shadow-xl">
          <h2 class="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <span class="w-1.5 h-4 bg-amber-500 rounded-full"></span>
            Miembros con Acceso al Sistema
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="text-stone-500 border-b border-stone-800 uppercase tracking-wider">
                <tr>
                  <th class="py-3 px-4">Nombre</th>
                  <th class="py-3 px-4">Correo</th>
                  <th class="py-3 px-4">Rol</th>
                  <th class="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-800/60 text-stone-300">
                <tr v-if="usuarios.length === 0">
                  <td colspan="4" class="py-6 text-center text-stone-500">No hay usuarios registrados o cargando...</td>
                </tr>
                <tr v-for="user in usuarios" :key="user.id" class="hover:bg-stone-800/30 transition-colors">
                  <td class="py-3.5 px-4 font-medium text-white">{{ user.name }}</td>
                  <td class="py-3.5 px-4 text-stone-400">{{ user.email }}</td>
                  <td class="py-3.5 px-4">
                    <span :class="user.role === 'admin' || user.roleId === 1 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-stone-800 text-stone-300 border-stone-700'" class="px-2.5 py-1 rounded-md border text-[10px] font-semibold uppercase">
                      {{ user.role?.name || (user.roleId === 1 ? 'admin' : 'user') }}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <button 
                      @click="eliminarUsuario(user.id, user.name)"
                      class="px-2.5 py-1 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-lg border border-red-900/50 transition-all font-medium text-[11px]"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';

// Definimos la URL base dependiendo de si estás en desarrollo o producción
const API_URL = import.meta.env.VITE_API_URL || 'https://sistema-alabanza-backend.onrender.com';

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user'
});

const showPassword = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const usuarios = ref([]);

const fetchUsuarios = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener la lista de usuarios');
    }

    const data = await response.json();
    usuarios.value = data;
  } catch (err) {
    console.error('Error:', err);
  }
};

onMounted(() => {
  fetchUsuarios();
});

const handleRegister = async () => {
  successMessage.value = '';
  errorMessage.value = '';

  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Las contraseñas no coinciden';
    return;
  }

  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar el usuario');
    }

    successMessage.value = '¡Usuario creado con éxito!';
    form.name = '';
    form.email = '';
    form.password = '';
    form.confirmPassword = '';
    form.role = 'user';
    
    fetchUsuarios();
    
  } catch (err) {
    errorMessage.value = err.message;
  }
};

// Función para eliminar usuario con confirmación
const eliminarUsuario = async (id, nombre) => {
  if (!confirm(`¿Estás seguro de que deseas eliminar el acceso para ${nombre}?`)) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar el usuario');
    }

    fetchUsuarios();
  } catch (err) {
    alert('Error al eliminar: ' + err.message);
  }
};
</script>