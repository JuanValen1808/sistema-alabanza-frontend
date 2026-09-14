<!-- src/components/SongViewer.vue -->
<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  composer: { type: String, default: '' },
  musicalKey: { type: String, default: '' },
  tempo: { type: String, default: '' },
  lyrics: { type: String, default: '' },
  chords: { type: String, default: '' }, // Soporte por si usas el campo chords
  youtubeLink: { type: String, default: '' },
  driveLink: { type: String, default: '' },
  showMediaLinks: { type: Boolean, default: true } // Controla si se muestran YouTube/Drive
});

// Usamos el campo chords o lyrics indistintamente
const rawContent = computed(() => props.chords || props.lyrics || '');

// Función que lee línea por línea, detecta los '//' y los formatea
const formattedLines = computed(() => {
  if (!rawContent.value) return [];
  return rawContent.value.split('\n').map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//')) {
      return {
        isChord: true,
        // Quitamos el '//' inicial y los espacios extra para que quede limpio y alineado
        content: line.replace('//', '').trimRight(),
      };
    }
    return {
      isChord: false,
      content: line,
    };
  });
});
</script>

<template>
  <div class="space-y-6">
    <!-- Encabezado de la Canción -->
    <div class="bg-[#121212] p-6 sm:p-8 rounded-2xl border border-[#262626] space-y-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#262626] pb-4">
        <div>
          <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Iglesia Misión Pentecostal</span>
          <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">{{ title }}</h1>
          <p class="text-xs text-neutral-400 mt-1" v-if="composer">Autor: {{ composer }}</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="px-3 py-1.5 rounded-lg bg-[#161616] border border-[#262626] text-xs font-mono text-neutral-300">
            Tono: <strong class="text-orange-300 font-bold">{{ musicalKey || '-' }}</strong>
          </div>
          <div class="px-3 py-1.5 rounded-lg bg-[#161616] border border-[#262626] text-xs font-mono text-neutral-300">
            BPM: <strong class="text-white font-bold">{{ tempo || '-' }}</strong>
          </div>
        </div>
      </div>

      <!-- Enlaces Multimedia (Solo si showMediaLinks es true y existen los links) -->
      <div v-if="showMediaLinks && (youtubeLink || driveLink)" class="flex flex-wrap gap-3 pt-1">
        <a 
          v-if="youtubeLink" 
          :href="youtubeLink" 
          target="_blank" 
          class="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-neutral-300 text-xs rounded-lg border border-[#333] flex items-center gap-2 transition-all"
        >
          <span>YouTube</span>
        </a>
      </div>
    </div>

    <!-- Visor de Letra y Acordes formateados línea por línea -->
    <div class="bg-[#121212] p-6 sm:p-10 rounded-2xl border border-[#262626] space-y-6">
      <h3 class="text-xs font-mono uppercase tracking-wider text-neutral-500 border-b border-[#262626] pb-3">Letra y Acordes</h3>
      
      <div class="font-mono text-xs sm:text-sm leading-relaxed space-y-1 bg-[#0f0f0f] p-6 sm:p-8 rounded-xl border border-[#1f1f1f] overflow-x-auto">
        <div v-for="(line, index) in formattedLines" :key="index">
          <!-- Línea de Acordes (Naranjita, estilo Holyrics) -->
          <div v-if="line.isChord" class="text-orange-400 font-semibold whitespace-pre">
            {{ line.content }}
          </div>
          <!-- Línea de Letra Normal -->
          <div v-else class="text-neutral-200 whitespace-pre min-h-[1.2rem]">
            {{ line.content || '&nbsp;' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>