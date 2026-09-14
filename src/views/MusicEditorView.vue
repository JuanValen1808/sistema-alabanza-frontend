<!-- src/views/MusicEditorView.vue -->
<template>
  <Navbar />
  <div class="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-xl sm:text-2xl font-semibold tracking-tight text-white">Gestión y Edición de Alabanzas</h1>
    </div>

    <!-- Layout de Dos Columnas -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- COLUMNA IZQUIERDA: Buscador y Lista Compacta con Scroll (4 columnas) -->
      <div class="lg:col-span-4 dark-card p-4 space-y-3 lg:sticky lg:top-20">
        <h2 class="text-sm font-semibold text-white tracking-wider uppercase border-b border-[#262626] pb-2.5">
          Catálogo ({{ filteredSongs.length }})
        </h2>

        <!-- Barra de Búsqueda (Lupita) -->
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar por título..." 
            class="w-full dark-input pl-9 pr-3 py-2 text-xs sm:text-sm"
          />
        </div>

        <!-- Lista con Scroll y sin Overflow -->
        <div class="max-h-[500px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
          <div 
            v-for="song in filteredSongs" 
            :key="song.id" 
            @click="editSong(song)"
            class="p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-xs group"
            :class="editingId === song.id ? 'bg-[#222] border-white/40 text-white font-medium' : 'bg-[#161616] border-[#262626] text-neutral-300 hover:bg-[#1f1f1f] hover:border-[#333]'"
          >
            <span class="truncate pr-2">{{ song.title }}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#202020] text-neutral-400 group-hover:text-white">
              {{ song.musicalKey || '-' }}
            </span>
          </div>

          <!-- Estado vacío si la búsqueda no arroja resultados -->
          <div v-if="filteredSongs.length === 0" class="text-center py-6 text-xs text-neutral-500">
            No se encontraron alabanzas
          </div>
        </div>

        <!-- Botón para limpiar selección / crear nueva -->
        <button 
          v-if="editingId" 
          @click="resetForm" 
          class="w-full bg-[#1f1f1f] hover:bg-[#2b2b2b] text-neutral-300 hover:text-white p-2 rounded-lg text-xs font-medium border border-[#333] transition-all"
        >
          + Registrar Nueva Alabanza
        </button>
      </div>

      <!-- COLUMNA DERECHA: Formulario de Creación / Edición (8 columnas) -->
      <div class="lg:col-span-8">
        <form @submit.prevent="saveSong" class="dark-card p-4 sm:p-6 space-y-4">
          <div class="flex justify-between items-center border-b border-[#262626] pb-3">
            <h2 class="text-base font-semibold text-white">
              {{ editingId ? 'Editando: ' + form.title : 'Registrar Nueva Alabanza' }}
            </h2>
            <button 
              v-if="editingId" 
              type="button" 
              @click="deleteSong(editingId)" 
              class="text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/40 px-2.5 py-1 rounded border border-red-900/50 transition-all"
            >
              Eliminar Alabanza
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Título</label>
              <input v-model="form.title" type="text" required class="w-full dark-input p-2.5 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Compositor / Autor</label>
              <input v-model="form.composer" type="text" class="w-full dark-input p-2.5 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Tono (Ej: G, Am)</label>
              <input v-model="form.musicalKey" type="text" class="w-full dark-input p-2.5 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Tiempo / Ritmo (BPM)</label>
              <input v-model="form.tempo" type="text" class="w-full dark-input p-2.5 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Enlace de YouTube</label>
              <input v-model="form.youtubeLink" type="url" placeholder="https://youtube.com/..." class="w-full dark-input p-2.5 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Enlace Pistas Google Drive</label>
              <input v-model="form.driveTrackLink" type="url" placeholder="https://drive.google.com/..." class="w-full dark-input p-2.5 text-sm" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Letra y Acordes</label>
            <textarea v-model="form.chords" rows="10" class="w-full dark-input p-3 text-xs sm:text-sm font-mono leading-relaxed" placeholder="[G] Santo, [D] santo..."></textarea>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#262626]">
            <button type="submit" class="bg-white hover:bg-neutral-200 text-black px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all">
              {{ editingId ? 'Actualizar Alabanza' : 'Guardar Alabanza' }}
            </button>
            <button v-if="editingId" type="button" @click="resetForm" class="bg-[#1f1f1f] text-neutral-300 hover:text-white px-4 py-2.5 rounded-lg text-xs font-medium border border-[#333] transition-all">
              Cancelar Selección
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';
import Navbar from '@/components/Navbar.vue';

const songs = ref([]);
const editingId = ref(null);
const searchQuery = ref('');

const form = ref({
  title: '',
  composer: '',
  musicalKey: '',
  tempo: '',
  youtubeLink: '',
  driveTrackLink: '',
  chords: '',
});

// Filtrar las canciones de manera reactiva según lo que se escriba en la lupita
const filteredSongs = computed(() => {
  if (!searchQuery.value.trim()) return songs.value;
  const query = searchQuery.value.toLowerCase();
  return songs.value.filter(song => song.title.toLowerCase().includes(query));
});

const fetchSongs = async () => {
  try {
    const res = await api.get('/songs');
    songs.value = res.data;
  } catch (error) {
    console.error('Error al cargar canciones:', error);
  }
};

const saveSong = async () => {
  try {
    if (editingId.value) {
      await api.put(`/songs/${editingId.value}`, form.value);
      alert('Alabanza actualizada con éxito.');
    } else {
      await api.post('/songs', form.value);
      alert('Alabanza creada con éxito.');
    }
    resetForm();
    fetchSongs();
  } catch (error) {
    console.error('Error al guardar:', error);
    alert('Ocurrió un error al guardar la alabanza.');
  }
};

const editSong = (song) => {
  editingId.value = song.id;
  form.value = { ...song };
};

const deleteSong = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta alabanza?')) {
    try {
      await api.delete(`/songs/${id}`);
      resetForm();
      fetchSongs();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }
};

const resetForm = () => {
  editingId.value = null;
  form.value = { title: '', composer: '', musicalKey: '', tempo: '', youtubeLink: '', driveTrackLink: '', chords: '' };
};

onMounted(fetchSongs);
</script>