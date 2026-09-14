<!-- src/views/MusicianView.vue -->
<template>
  <Navbar/>
  <div class="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
    <!-- Banner del Culto Más Cercano -->
    <div v-if="nearestService" class="dark-card p-5 border border-[#333] bg-[#121212] space-y-3 relative overflow-hidden rounded-xl">
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
      class="w-full bg-[#121212] border border-[#262626] text-white p-3 text-sm rounded-xl outline-none focus:border-white transition-all"
    />

    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Lista de Canciones (4 columnas) -->
      <div class="md:col-span-4 bg-[#121212] border border-[#262626] p-4 rounded-2xl overflow-y-auto max-h-[600px] space-y-2">
        <h2 class="font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-3">Catálogo General</h2>
        <div class="space-y-1">
          <div 
            v-for="song in filteredSongs" 
            :key="song.id" 
            @click="selectSong(song)"
            class="p-3 rounded-lg cursor-pointer transition-all border border-transparent flex justify-between items-center text-xs"
            :class="selectedSong?.id === song.id ? 'bg-[#1f1f1f] border-[#404040] text-white font-medium' : 'hover:bg-[#171717] hover:border-[#262626] text-neutral-300'"
          >
            <span class="truncate pr-2">{{ song.title }}</span>
            <span class="font-mono text-[11px] text-neutral-400 shrink-0">{{ song.musicalKey || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Detalle de la Canción con SongViewer (8 columnas) -->
      <div class="md:col-span-8">
        <SongViewer 
          v-if="selectedSong"
          :title="selectedSong.title"
          :composer="selectedSong.composer"
          :musicalKey="selectedSong.musicalKey"
          :tempo="selectedSong.tempo"
          :chords="selectedSong.chords"
          :lyrics="selectedSong.lyrics"
          :youtubeLink="selectedSong.youtubeLink"
          :driveLink="selectedSong.driveLink"
          :showMediaLinks="true"
        />

        <div v-else class="bg-[#121212] border border-[#262626] rounded-2xl text-center text-neutral-500 py-24 text-sm">
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
import SongViewer from '@/components/SongViewer.vue';

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
    if (songs.value.length > 0 && !selectedSong.value) {
      selectedSong.value = songs.value[0];
    }
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

onMounted(() => {
  fetchNearestService();
  fetchSongs();
});
</script>