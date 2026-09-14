<!-- src/views/WorshipEditView.vue -->
<template>
            <Navbar/>
  <div class="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">

    <button @click="router.back()" class="text-neutral-400 hover:text-white text-xs sm:text-sm font-medium transition-colors">
      &larr; Volver a la lista
    </button>
    
    <div class="dark-card p-4 sm:p-6 space-y-6">
      <h1 class="text-xl sm:text-2xl font-semibold text-white border-b border-[#262626] pb-3">
        Editando Culto #{{ route.params.id }}
      </h1>
      
      <div v-if="service" class="space-y-6">
        <!-- Datos básicos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Título del Culto</label>
            <input v-model="service.title" type="text" class="w-full dark-input p-2.5 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Fecha</label>
            <input v-model="service.serviceDate" type="date" class="w-full dark-input p-2.5 text-sm text-neutral-200" />
          </div>
        </div>

        <div class="border-t border-[#262626] pt-4">
          <h2 class="text-base font-semibold text-white mb-3">Setlist de Canciones</h2>
          
          <!-- Canciones actuales en el culto -->
          <div class="space-y-2 mb-4">
            <div v-for="(item, index) in service.serviceSongs" :key="index" class="dark-card p-3 border border-[#262626] flex items-center justify-between gap-2">
              <div class="flex items-center gap-3 overflow-hidden">
                <span class="text-xs font-mono text-neutral-500">#{{ index + 1 }}</span>
                <span class="text-sm text-neutral-200 truncate font-medium">
                  {{ item.song?.title || 'Canción seleccionada' }} 
                  <span class="text-xs text-neutral-400 font-mono">({{ item.song?.musicalKey }})</span>
                </span>
              </div>
              <button @click="removeSong(index)" class="text-xs text-red-400 hover:text-red-300 font-medium shrink-0 px-2 py-1 bg-red-950/40 border border-red-900/50 rounded-md">
                Quitar
              </button>
            </div>
            <p v-if="!service.serviceSongs || service.serviceSongs.length === 0" class="text-xs text-neutral-500 italic py-2">
              No hay canciones en este setlist todavía. Agrega algunas abajo.
            </p>
          </div>

          <!-- Selector para agregar canciones del repertorio -->
          <div class="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center dark-card p-4 border border-[#262626] bg-[#171717]">
            <select v-model="selectedSongToAdd" class="flex-1 dark-input p-2.5 text-sm">
              <option disabled value="">Selecciona una canción del repertorio...</option>
              <option v-for="song in allSongs" :key="song.id" :value="song">
                {{ song.title }} (Tono: {{ song.musicalKey }})
              </option>
            </select>
            <button @click="addSongToSetlist" class="bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-lg text-xs font-semibold transition-all shrink-0">
              Agregar al Setlist
            </button>
          </div>
        </div>

        <button @click="saveChanges" class="w-full bg-white hover:bg-neutral-200 text-black p-3 rounded-lg text-sm font-semibold transition-all">
          Guardar Todos los Cambios
        </button>
      </div>
      <p v-else class="text-neutral-500 text-center py-6 text-sm">Cargando información del culto...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
const router = useRouter();
const service = ref(null);
const allSongs = ref([]);
const selectedSongToAdd = ref('');

const fetchData = async () => {
  try {
    // Cargamos el culto específico y la lista de canciones generales en paralelo
    const [serviceRes, songsRes] = await Promise.all([
      api.get(`/worship-services`),
      api.get('/songs')
    ]);

    const found = serviceRes.data.find(s => s.id == route.params.id);
    if (found) {
      service.value = { ...found, serviceSongs: found.serviceSongs || [] };
    }
    allSongs.value = songsRes.data;
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
};

const addSongToSetlist = () => {
  if (!selectedSongToAdd.value) return;
  
  const song = selectedSongToAdd.value;
  // Evitamos duplicadas si se desea, o permitimos repetición
  service.value.serviceSongs.push({
    songId: song.id,
    song: song,
    sequenceOutput: service.value.serviceSongs.length + 1
  });
  
  selectedSongToAdd.value = '';
};

const removeSong = (index) => {
  service.value.serviceSongs.splice(index, 1);
  // Reordenar secuencia
  service.value.serviceSongs.forEach((item, idx) => {
    item.sequenceOutput = idx + 1;
  });
};

const saveChanges = async () => {
  try {
    await api.put(`/worship-services/${route.params.id}`, {
      title: service.value.title,
      serviceDate: service.value.serviceDate,
      serviceSongs: service.value.serviceSongs.map((item, idx) => ({
        songId: item.songId || item.song.id,
        sequenceOutput: idx + 1
      }))
    });
    alert('¡Culto y setlist actualizados con éxito!');
    router.push('/admin-cultos');
  } catch (error) {
    console.error('Error al actualizar:', error);
    alert('Error al guardar los cambios en el servidor');
  }
};

onMounted(fetchData);
</script>