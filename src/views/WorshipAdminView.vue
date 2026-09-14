<!-- src/views/WorshipAdminView.vue -->
<template>
        <Navbar/>
  <div class="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
    
    <!-- Cabecera principal -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark-card p-5">
      <div>
        <h1 class="text-xl sm:text-2xl font-semibold tracking-tight text-white">Programación de Cultos</h1>
        <p class="text-xs sm:text-sm text-neutral-400 mt-0.5">Gestión de servicios y setlists de alabanza.</p>
      </div>
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <button @click="showTypesModal = true" class="flex-1 sm:flex-none bg-[#1f1f1f] hover:bg-[#2b2b2b] text-neutral-200 border border-[#333] px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all">
          Gestionar Tipos
        </button>
        <button @click="showCreateModal = true" class="flex-1 sm:flex-none bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all">
          Nuevo Culto
        </button>
      </div>
    </div>

    <!-- Banner informativo / automático -->
    <div class="dark-card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-2 border-l-neutral-400">
      <p class="text-xs sm:text-sm text-neutral-300">Los cultos de Jueves y Domingo se generan automáticamente cada inicio de mes.</p>
      <button @click="generateAutomatic" class="w-full sm:w-auto bg-[#1f1f1f] hover:bg-[#2b2b2b] text-neutral-200 border border-[#333] px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0">
        Forzar Generación Mensual
      </button>
    </div>

    <!-- Modal para Gestionar Tipos de Culto -->
    <div v-if="showTypesModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="dark-card p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl border border-[#333]">
        <h2 class="text-lg font-semibold text-white border-b border-[#262626] pb-3">Administrar Tipos de Culto</h2>
        
        <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
          <div v-for="type in serviceTypes" :key="type.id" class="flex items-center justify-between bg-[#171717] p-2.5 rounded-lg border border-[#262626]">
            
            <!-- Vista normal vs Edición -->
            <div v-if="editingTypeId !== type.id" class="flex items-center justify-between flex-1 mr-2">
              <span class="text-xs text-neutral-200 font-medium">{{ type.name }}</span>
              <div class="flex items-center gap-1">
                <button @click="startEditingType(type)" class="p-1.5 hover:bg-[#262626] text-neutral-400 hover:text-white rounded transition-all text-xs">
                  Editar
                </button>
                <button @click="deleteServiceType(type.id)" class="p-1.5 hover:bg-red-950/40 text-red-400 rounded transition-all text-xs">
                  Eliminar
                </button>
              </div>
            </div>

            <!-- Input al editar -->
            <div v-else class="flex items-center gap-2 flex-1">
              <input v-model="editingTypeName" type="text" class="flex-1 dark-input p-1.5 text-xs" />
              <button @click="updateServiceType(type.id)" class="px-2.5 py-1 bg-white text-black rounded text-xs font-semibold hover:bg-neutral-200">
                Guardar
              </button>
              <button @click="editingTypeId = null" class="px-2 py-1 bg-[#262626] text-neutral-300 rounded text-xs">
                X
              </button>
            </div>

          </div>
        </div>

        <div class="flex justify-end pt-3 border-t border-[#262626]">
          <button @click="showTypesModal = false" class="px-4 py-2 bg-white text-black hover:bg-neutral-200 rounded-lg text-xs font-semibold transition-all">
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para Crear Culto Único -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="dark-card p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl border border-[#333]">
        <h2 class="text-lg font-semibold text-white border-b border-[#262626] pb-3">Programar Nuevo Culto</h2>
        
        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Título del Culto</label>
          <input v-model="newService.title" type="text" placeholder="Ej. Culto de Jóvenes" class="w-full dark-input p-2.5 text-sm" />
        </div>

        <div>
          <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Fecha</label>
          <input v-model="newService.serviceDate" type="date" class="w-full dark-input p-2.5 text-sm text-neutral-200" />
        </div>

        <!-- Tipo de Culto -->
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <label class="block text-xs font-medium uppercase tracking-wider text-neutral-400">Tipo de Culto</label>
            <button @click="toggleNewTypeSection" type="button" class="text-xs text-neutral-300 hover:text-white underline">
              {{ showNewTypeInput ? 'Seleccionar existente' : '+ Crear nuevo tipo' }}
            </button>
          </div>

          <select v-if="!showNewTypeInput" v-model="newService.serviceTypeId" class="w-full dark-input p-2.5 text-sm">
            <option disabled value="">Selecciona un tipo...</option>
            <option v-for="t in serviceTypes" :key="t.id" :value="t.id">{{ t.name }}</option>
          </select>

          <div v-else class="flex gap-2">
            <input v-model="newTypeName" type="text" placeholder="Nombre (Ej. Vigilia)" class="flex-1 dark-input p-2 text-sm" />
            <button @click="createNewType" type="button" class="bg-neutral-200 hover:bg-white text-black px-3 py-2 rounded-lg text-xs font-semibold transition-all">
              Guardar
            </button>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-3 border-t border-[#262626]">
          <button @click="showCreateModal = false" class="px-4 py-2 bg-[#1f1f1f] text-neutral-300 hover:text-white rounded-lg text-xs font-medium transition-all">
            Cancelar
          </button>
          <button @click="createSingleService" class="px-4 py-2 bg-white text-black hover:bg-neutral-200 rounded-lg text-xs font-semibold transition-all">
            Guardar Culto
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Cultos -->
    <div class="dark-card p-4 sm:p-6 space-y-4">
      <h2 class="text-base sm:text-lg font-semibold text-white border-b border-[#262626] pb-3">Próximos Cultos</h2>
      
      <div class="space-y-3">
        <div v-for="service in services" :key="service.id" class="dark-card p-4 border border-[#262626] flex flex-col gap-3 transition-colors hover:border-[#404040]">
          
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 class="font-semibold text-base text-white">{{ service.title }}</h3>
              <p class="text-xs text-neutral-400 mt-0.5">
                Fecha: <span class="text-neutral-200 font-medium">{{ service.serviceDate }}</span> &bull; 
                Tipo: <span class="text-neutral-200 font-medium bg-[#1f1f1f] px-2 py-0.5 rounded border border-[#2b2b2b]">{{ service.serviceType?.name || 'Culto General' }}</span>
              </p>
            </div>

            <!-- Botones de Acción -->
            <div class="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
              <button @click="editService(service)" class="flex-1 sm:flex-none px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#2b2b2b] text-neutral-200 text-xs font-medium rounded-lg border border-[#333] transition-all text-center">
                Editar Setlist
              </button>
              <button @click="deleteService(service.id)" class="flex-1 sm:flex-none px-3 py-1.5 bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-medium rounded-lg border border-red-900/50 transition-all text-center">
                Eliminar
              </button>
            </div>
          </div>

          <!-- Setlist -->
          <div class="bg-[#171717] p-3 rounded-lg border border-[#222]">
            <h4 class="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Setlist del Culto</h4>
            <ul class="flex flex-wrap gap-2">
              <li v-for="item in service.serviceSongs" :key="item.id" class="bg-[#1f1f1f] border border-[#2b2b2b] px-2.5 py-1 text-xs rounded-md flex items-center gap-2">
                <span class="text-neutral-500 font-mono">#{{ item.sequenceOrder }}</span>
                <span class="text-neutral-200 font-medium">{{ item.song.title }}</span>
                <span class="text-neutral-400 font-mono text-[11px]">({{ item.song.musicalKey }})</span>
              </li>
            </ul>
            <p v-if="!service.serviceSongs || service.serviceSongs.length === 0" class="text-xs text-neutral-500 italic">
              No hay canciones asignadas todavía.
            </p>
          </div>

        </div>

        <p v-if="services.length === 0" class="text-xs text-neutral-500 italic text-center py-6">
          No hay cultos programados actualmente.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();
const services = ref([]);
const serviceTypes = ref([]);
const showCreateModal = ref(false);
const showTypesModal = ref(false);
const showNewTypeInput = ref(false);
const newTypeName = ref('');

// Estados para edición inline de tipos de culto
const editingTypeId = ref(null);
const editingTypeName = ref('');

const newService = ref({
  title: '',
  serviceDate: '',
  serviceTypeId: ''
});

const fetchData = async () => {
  try {
    const [servicesRes, typesRes] = await Promise.all([
      api.get('/worship-services'),
      api.get('/service-types')
    ]);
    services.value = servicesRes.data;
    serviceTypes.value = typesRes.data;
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

const generateAutomatic = async () => {
  try {
    await api.post('/worship-services/generate-automatic');
    alert('Cultos generados con éxito.');
    fetchData();
  } catch (error) {
    console.error('Error al generar cultos:', error);
  }
};

const toggleNewTypeSection = () => {
  showNewTypeInput.value = !showNewTypeInput.value;
  newTypeName.value = '';
};

const createNewType = async () => {
  if (!newTypeName.value.trim()) return;

  try {
    const res = await api.post('/service-types', { name: newTypeName.value.trim() });
    serviceTypes.value.push(res.data);
    newService.value.serviceTypeId = res.data.id;
    newTypeName.value = '';
    showNewTypeInput.value = false;
  } catch (error) {
    console.error('Error al crear el tipo de culto:', error);
    alert('No se pudo crear el tipo de culto.');
  }
};

const startEditingType = (type) => {
  editingTypeId.value = type.id;
  editingTypeName.value = type.name;
};

const updateServiceType = async (id) => {
  if (!editingTypeName.value.trim()) return;

  try {
    const res = await api.patch(`/service-types/${id}`, { name: editingTypeName.value.trim() });
    const index = serviceTypes.value.findIndex(t => t.id === id);
    if (index !== -1) {
      serviceTypes.value[index] = res.data;
    }
    editingTypeId.value = null;
    editingTypeName.value = '';
    fetchData(); // Actualizar lista de cultos por si cambió el nombre reflejado
  } catch (error) {
    console.error('Error al actualizar el tipo de culto:', error);
    alert('No se pudo actualizar el tipo de culto.');
  }
};

const deleteServiceType = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este tipo de culto? Podría fallar si hay cultos asociados.')) return;

  try {
    await api.delete(`/service-types/${id}`);
    serviceTypes.value = serviceTypes.value.filter(t => t.id !== id);
  } catch (error) {
    console.error('Error al eliminar el tipo de culto:', error);
    alert('No se pudo eliminar. Asegúrate de que ningún culto esté usando este tipo.');
  }
};

const createSingleService = async () => {
  if (!newService.value.title || !newService.value.serviceDate || !newService.value.serviceTypeId) {
    alert('Por favor completa todos los campos.');
    return;
  }

  try {
    await api.post('/worship-services', {
      title: newService.value.title,
      serviceDate: newService.value.serviceDate,
      serviceTypeId: newService.value.serviceTypeId
    });
    alert('Culto creado con éxito.');
    showCreateModal.value = false;
    newService.value = { title: '', serviceDate: '', serviceTypeId: '' };
    fetchData();
  } catch (error) {
    console.error('Error al crear el culto:', error);
    alert('Error al registrar el culto en el servidor.');
  }
};

const deleteService = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este culto?')) return;

  try {
    await api.delete(`/worship-services/${id}`);
    fetchData();
  } catch (error) {
    console.error('Error al eliminar el culto:', error);
    alert('No se pudo eliminar el culto.');
  }
};

const editService = (service) => {
  router.push(`/admin-cultos/editar/${service.id}`);
};

onMounted(fetchData);
</script>