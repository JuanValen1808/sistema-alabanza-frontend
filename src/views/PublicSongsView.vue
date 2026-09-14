<!-- src/views/PublicSongsView.vue -->
<template>
  <div class="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col selection:bg-white selection:text-black">
    
    <!-- Navbar simple para volver al inicio o iniciar sesión -->
    <header class="h-16 border-b border-[#262626] bg-[#0d0d0d] px-6 flex items-center justify-between z-10">
      <div class="flex items-center gap-4">
        <router-link to="/" class="text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver al Inicio
        </router-link>
        <span class="text-[#262626]">|</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-white">Repertorio Público &bull; Iglesia Misión Pentecostal</span>
      </div>

      <router-link to="/login" class="px-4 py-2 bg-[#161616] hover:bg-[#202020] text-neutral-200 border border-[#262626] rounded-lg text-xs font-medium transition-all">
        Iniciar Sesión
      </router-link>
    </header>

    <!-- Layout principal: Barra lateral izquierda (1/5) y Visor derecho (4/5) -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
      
      <!-- COLUMNA IZQUIERDA: Lista vertical fija de Coritos (1/5 de la pantalla) -->
      <aside class="lg:col-span-3 border-r border-[#262626] bg-[#0d0d0d] flex flex-col h-[calc(100vh-4rem)] lg:sticky lg:top-16">
        
        <!-- Cabecera de búsqueda con lupita -->
        <div class="p-4 border-b border-[#262626] space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-neutral-400">Coritos y Alabanzas</h2>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1f1f] text-neutral-400">
              {{ filteredSongs.length }}
            </span>
          </div>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Buscar corito..." 
              class="w-full bg-[#121212] border border-[#262626] focus:border-white text-white rounded-lg pl-9 pr-3 py-1.5 text-xs outline-none transition-all placeholder:text-neutral-600"
            />
          </div>
        </div>

        <!-- Lista scrolleable de arriba hacia abajo -->
        <div class="flex-1 overflow-y-auto p-3 space-y-1">
          <div 
            v-for="song in filteredSongs" 
            :key="song.id"
            @click="selectSong(song)"
            class="p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between group text-xs"
            :class="selectedSong?.id === song.id ? 'bg-[#222] border-white/40 text-white font-medium shadow-sm' : 'bg-[#121212] border-[#222] text-neutral-400 hover:bg-[#181818] hover:text-neutral-200 hover:border-[#333]'"
          >
            <span class="truncate pr-2">{{ song.title }}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1a1a1a] text-neutral-400 group-hover:text-white shrink-0">
              {{ song.musicalKey || '-' }}
            </span>
          </div>

          <div v-if="filteredSongs.length === 0" class="text-center py-8 text-xs text-neutral-600">
            No se encontraron coritos
          </div>
        </div>
      </aside>

      <!-- COLUMNA DERECHA: Visor de Letra y Acordes (4/5 de la pantalla) -->
      <main class="lg:col-span-9 p-6 sm:p-10 bg-[#0a0a0a] overflow-y-auto">
        <div v-if="selectedSong" class="max-w-4xl mx-auto space-y-8">
          
          <!-- Encabezado del corito -->
          <div class="bg-[#121212] p-6 sm:p-8 rounded-2xl border border-[#262626] space-y-4">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#262626] pb-4">
              <div>
                <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Iglesia Misión Pentecostal</span>
                <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">{{ selectedSong.title }}</h1>
                <p class="text-xs text-neutral-400 mt-1" v-if="selectedSong.composer">Autor: {{ selectedSong.composer }}</p>
              </div>

              <div class="flex items-center gap-2">
                <div class="px-3 py-1.5 rounded-lg bg-[#161616] border border-[#262626] text-xs font-mono text-neutral-300">
                  Tono: <strong class="text-white font-bold">{{ selectedSong.musicalKey || '-' }}</strong>
                </div>
                <div class="px-3 py-1.5 rounded-lg bg-[#161616] border border-[#262626] text-xs font-mono text-neutral-300">
                  BPM: <strong class="text-white font-bold">{{ selectedSong.tempo || '-' }}</strong>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-3 pt-1">
              <a 
                v-if="selectedSong.youtubeLink" 
                :href="selectedSong.youtubeLink" 
                target="_blank" 
                class="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-neutral-300 text-xs rounded-lg border border-[#333] flex items-center gap-2 transition-all"
              >
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <!-- Letra y Acordes formateados estilo Hoyrics -->
          <div class="bg-[#121212] p-6 sm:p-10 rounded-2xl border border-[#262626] space-y-6">
            <h3 class="text-xs font-mono uppercase tracking-wider text-neutral-500 border-b border-[#262626] pb-3">Letra y Acordes</h3>
            <pre class="font-mono text-xs sm:text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed bg-[#0f0f0f] p-6 rounded-xl border border-[#1f1f1f]">{{ selectedSong.chords }}</pre>
          </div>

        </div>

        <!-- Estado vacío -->
        <div v-else class="h-full flex flex-col items-center justify-center text-center py-20 text-neutral-500 space-y-2">
          <svg class="w-10 h-10 stroke-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
          </svg>
          <p class="text-sm">Selecciona un corito de la barra lateral izquierda para ver su letra y acordes.</p>
        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const songs = ref([]);
const searchQuery = ref('');
const selectedSong = ref(null);

const filteredSongs = computed(() => {
  if (!searchQuery.value.trim()) return songs.value;
  const q = searchQuery.value.toLowerCase();
  return songs.value.filter(s => s.title.toLowerCase().includes(q));
});

const fetchSongs = async () => {
  try {
    // Si tu API permite listar canciones sin token (público), esto funcionará directo.
    // Si requiere autenticación para el endpoint general, puedes crear un endpoint público en tu backend tipo /songs/public
    const res = await api.get('/songs');
    songs.value = res.data;
    if (songs.value.length > 0 && !selectedSong.value) {
      selectedSong.value = songs.value[0];
    }
  } catch (error) {
    console.error('Error al cargar coritos públicos:', error);
  }
};

const selectSong = (song) => {
  selectedSong.value = song;
};

onMounted(fetchSongs);
</script>