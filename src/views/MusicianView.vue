<!-- src/views/MusicianView.vue -->
<template>
        <Navbar/>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
    <!-- Banner del Culto Más Cercano del Momento -->
    <div v-if="nearestService" class="dark-card p-5 border border-[#333] bg-[#121212] space-y-3 relative overflow-hidden">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#262626] pb-3">
        <div>
          <span class="text-[10px] uppercase tracking-wider bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">Próximo Culto</span>
          <h2 class="text-lg font-semibold text-white mt-1">{{ nearestService.title }}</h2>
        </div>
        <div class="text-xs text-neutral-400 font-mono">
          Fecha: <span class="text-neutral-200 font-bold">{{ nearestService.serviceDate }}</span>
        </div>
      </div>

      <div>
        <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Setlist Programado:</h3>
        <div class="flex flex-wrap gap-2">
          <div v-for="item in nearestService.serviceSongs" :key="item.id" class="bg-[#171717] border border-[#2b2b2b] px-3 py-1.5 rounded-md text-xs flex items-center gap-2">
            <span class="text-neutral-500 font-mono">#{{ item.sequenceOrder }}</span>
            <span class="text-neutral-200 font-medium">{{ item.song.title }}</span>
            <span class="text-neutral-400 font-mono text-[11px]">({{ item.song.musicalKey }})</span>
          </div>
          <p v-if="!nearestService.serviceSongs || nearestService.serviceSongs.length === 0" class="text-xs text-neutral-500 italic">
            Aún no hay canciones asignadas a este culto.
          </p>
        </div>
      </div>
    </div>

    <!-- Buscador de canciones -->
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Buscar por título, compositor o tono..." 
      class="w-full dark-input p-3 text-sm"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Lista de Canciones -->
      <div class="col-span-1 dark-card p-4 overflow-y-auto max-h-[500px] space-y-2">
        <h2 class="font-semibold text-sm text-neutral-400 uppercase tracking-wider mb-3">Catálogo General</h2>
        <div class="space-y-1">
          <div 
            v-for="song in filteredSongs" 
            :key="song.id" 
            @click="selectSong(song)"
            class="p-3 rounded-lg cursor-pointer transition-all border border-transparent flex justify-between items-center"
            :class="selectedSong?.id === song.id ? 'bg-[#1f1f1f] border-[#404040]' : 'hover:bg-[#171717] hover:border-[#262626]'"
          >
            <div>
              <p class="font-medium text-sm text-neutral-200">{{ song.title }}</p>
              <p class="text-xs text-neutral-400 mt-0.5">Tono: <span class="text-neutral-200 font-mono font-bold">{{ song.musicalKey || 'N/A' }}</span></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detalle de la Canción Seleccionada -->
      <div class="col-span-2 dark-card p-4 sm:p-6 space-y-6">
        <div v-if="selectedSong" class="space-y-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#262626] pb-4">
            <div>
              <h2 class="text-xl font-semibold text-white">{{ selectedSong.title }}</h2>
              <p class="text-xs text-neutral-400 mt-0.5">Autor: {{ selectedSong.composer || 'Desconocido' }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="bg-[#1f1f1f] border border-[#2b2b2b] text-neutral-200 px-2.5 py-1 rounded-md font-mono text-xs">Tono: {{ selectedSong.musicalKey }}</span>
              <span class="bg-[#1f1f1f] border border-[#2b2b2b] text-neutral-400 px-2.5 py-1 rounded-md text-xs">BPM: {{ selectedSong.tempo || 'Libre' }}</span>
            </div>
          </div>

          <!-- Letra y Acordes -->
          <div class="space-y-2">
            <h3 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Letra y Acordes</h3>
            <pre class="dark-card bg-[#171717] p-4 text-xs sm:text-sm font-mono text-neutral-300 border border-[#222] leading-relaxed">{{ selectedSong.chords || selectedSong.lyrics || 'Sin contenido registrado.' }}</pre>
          </div>
        </div>
        <div v-else class="text-center text-neutral-500 py-16 text-sm">
          <p>Selecciona una alabanza de la lista para ver sus acordes y detalles.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();
const songs = ref([]);
const nearestService = ref(null);
const searchQuery = ref('');
const selectedSong = ref(null);

const fetchNearestService = async () => {
  try {
    const res = await api.get('/worship-services/nearest');
    nearestService.value = res.data;
  } catch (error) {
    console.error('Error al cargar el culto más cercano:', error);
  }
};

const fetchSongs = async () => {
  try {
    const res = await api.get('/songs');
    songs.value = res.data;
  } catch (error) {
    console.error('Error al cargar canciones:', error);
  }
};

const filteredSongs = computed(() => {
  if (!searchQuery.value) return songs.value;
  const q = searchQuery.value.toLowerCase();
  return songs.value.filter(s => 
    s.title?.toLowerCase().includes(q) || 
    s.composer?.toLowerCase().includes(q) || 
    s.musicalKey?.toLowerCase().includes(q)
  );
});

const selectSong = (song) => {
  selectedSong.value = song;
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};

onMounted(() => {
  fetchNearestService();
  fetchSongs();
});
</script>