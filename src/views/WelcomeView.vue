<!-- src/views/WelcomeView.vue -->
<template>
  <div class="min-h-screen bg-[#0c0a09] text-stone-100 flex flex-col selection:bg-amber-500 selection:text-black relative overflow-hidden">
    
    <!-- EFECTO GLASS DE FONDO CON EL LOGO GIGANTE -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <!-- Círculos de luz ambiental cálida -->
      <div class="absolute -top-32 left-1/4 w-[32rem] h-[32rem] bg-amber-600/15 rounded-full blur-[140px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] bg-orange-700/15 rounded-full blur-[160px]"></div>
      
      <!-- LOGO DE FONDO (Con menos blur para que se aprecie mejor la forma) -->
      <img 
        src="@/assets/logo-iglesia.png" 
        alt="Logo de fondo" 
        class="w-[38rem] sm:w-[48rem] md:w-[55rem] h-auto object-contain filter blur-[28px] opacity-20 transform scale-105 select-none"
      />
    </div>

    <!-- Navbar Superior con Glassmorphism -->
    <header class="w-full border-b border-stone-800/60 bg-[#0c0a09]/85 sticky top-0 z-40 backdrop-blur-md">
      <div class="w-full px-6 sm:px-10 h-16 flex items-center justify-between">
        <router-link to="/" class="text-sm sm:text-base font-semibold text-stone-100 tracking-tight flex items-center gap-3">
          <!-- LOGO DEL NAVBAR MÁS GRANDE -->
          <img src="@/assets/logo-iglesia.png" alt="Logo" class="w-9 h-9 object-contain drop-shadow-md" />
          <span>Sistema Alabanza &bull; IMP</span>
        </router-link>
        
        <div class="flex items-center gap-3">
          <router-link to="/coritos" class="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold rounded-lg transition-all shadow-lg shadow-amber-600/20">
            Ver Coritos y Acordes
          </router-link>
          <router-link to="/login" class="px-3 py-1.5 bg-stone-900/80 hover:bg-stone-800 text-stone-300 text-xs font-medium rounded-lg border border-stone-800 transition-all">
            Iniciar Sesión
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative z-10 px-6 pt-20 pb-24 md:pt-28 md:pb-32 max-w-5xl mx-auto text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-xs text-stone-300 backdrop-blur-md shadow-sm">
        <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        Iglesia Misión Pentecostal &bull; Grupo de Alabanza
      </div>
      
      <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
        Visibilizando los acordes y coritos <br class="hidden sm:inline" />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500">
          para la gloria de nuestro Dios.
        </span>
      </h1>

      <p class="max-w-2xl mx-auto text-sm sm:text-base text-stone-300 leading-relaxed font-light drop-shadow">
        Plataforma oficial concebida para consolidar el canto de alabanzas, facilitar letras y acordes de forma unificada en nuestra congregación.
      </p>

      <div class="flex items-center justify-center gap-3 pt-4">
        <router-link to="/coritos" class="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xl shadow-amber-600/25">
          Explorar Repertorio
        </router-link>
        <router-link to="/login" class="px-6 py-3 bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-800/80 rounded-xl text-xs sm:text-sm font-medium transition-all backdrop-blur-md">
          Acceso Interno
        </router-link>
      </div>
    </section>

    <!-- El Propósito de la Libreta -->
    <section class="relative z-10 border-t border-stone-900 bg-stone-950/70 py-16 px-6 backdrop-blur-md">
      <div class="max-w-4xl mx-auto bg-stone-900/70 p-8 sm:p-10 rounded-2xl border border-stone-800/80 backdrop-blur-xl relative overflow-hidden space-y-6 shadow-2xl">
        <div class="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <h2 class="text-xl sm:text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
          <span class="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          El Propósito de Nuestra Página
        </h2>
        
        <blockquote class="text-xs sm:text-sm text-stone-300 leading-relaxed italic border-l-2 border-amber-600/80 pl-4 py-1">
          “Esta recopilación de coritos cristianos, fue concebida con el propósito de consolidar el canto de alabanzas al Señor. Esta pagina dedicada a Coritos y Alabanzas de la Iglesia Misión Pentecostal tiene como finalidad proporcionar las letras de coritos y cantos espirituales para la vida cristiana, de manera que el canto sea más accesible para todos los miembros de la congregación.”
        </blockquote>
      </div>
    </section>

    <!-- Plan De Salvación Para El Hombre Y La Mujer -->
    <section class="relative z-10 py-20 px-6 max-w-6xl mx-auto space-y-10">
      <div class="text-center space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">Plan De Salvación Para El Hombre Y La Mujer</h2>
        <p class="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
          Las cuatro verdades que pueden cambiar la vida, cualquiera sea la situación de la persona que lo lea.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Tarjeta 1 -->
        <div class="bg-stone-900/60 hover:bg-stone-900/90 p-6 sm:p-8 rounded-2xl border border-stone-800/80 backdrop-blur-md space-y-4 transition-all duration-300 hover:border-amber-600/50 shadow-lg">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-mono text-amber-400 font-bold">01</div>
          <h3 class="text-base font-semibold text-white">El amor de Dios</h3>
          <p class="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-950/50 p-4 rounded-xl border border-stone-800/50 font-serif">
            “Mas Dios muestra su amor para con nosotros, en que, siendo aún pecadores, Cristo murió por nosotros.”
          </p>
          <span class="inline-block text-[11px] font-mono text-amber-500/90 uppercase tracking-wider font-semibold">Romanos 5:8</span>
        </div>

        <!-- Tarjeta 2 -->
        <div class="bg-stone-900/60 hover:bg-stone-900/90 p-6 sm:p-8 rounded-2xl border border-stone-800/80 backdrop-blur-md space-y-4 transition-all duration-300 hover:border-amber-600/50 shadow-lg">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-mono text-amber-400 font-bold">02</div>
          <h3 class="text-base font-semibold text-white">El llamado de Dios</h3>
          <p class="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-950/50 p-4 rounded-xl border border-stone-800/50 font-serif">
            “Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar. Llevad mi yugo sobre vosotros, y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas; porque mi yugo es fácil, y ligera mi carga.”
          </p>
          <span class="inline-block text-[11px] font-mono text-amber-500/90 uppercase tracking-wider font-semibold">San Mateo 11: 28-30</span>
        </div>

        <!-- Tarjeta 3 -->
        <div class="bg-stone-900/60 hover:bg-stone-900/90 p-6 sm:p-8 rounded-2xl border border-stone-800/80 backdrop-blur-md space-y-4 transition-all duration-300 hover:border-amber-600/50 shadow-lg">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-mono text-amber-400 font-bold">03</div>
          <h3 class="text-base font-semibold text-white">El perdón de Dios</h3>
          <p class="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-950/50 p-4 rounded-xl border border-stone-800/50 font-serif">
            “Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.”
          </p>
          <span class="inline-block text-[11px] font-mono text-amber-500/90 uppercase tracking-wider font-semibold">1 Juan 1:9</span>
        </div>

        <!-- Tarjeta 4 -->
        <div class="bg-stone-900/60 hover:bg-stone-900/90 p-6 sm:p-8 rounded-2xl border border-stone-800/80 backdrop-blur-md space-y-4 transition-all duration-300 hover:border-amber-600/50 shadow-lg">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-mono text-amber-400 font-bold">04</div>
          <h3 class="text-base font-semibold text-white">Tu decisión</h3>
          <p class="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-950/50 p-4 rounded-xl border border-stone-800/50 font-serif">
            “…que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.”
          </p>
          <span class="inline-block text-[11px] font-mono text-amber-500/90 uppercase tracking-wider font-semibold">Romanos 10:9</span>
        </div>

      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 mt-auto border-t border-stone-900 bg-stone-950/85 py-8 text-center text-xs text-stone-500 backdrop-blur-md">
      Iglesia Misión Pentecostal &bull; Sistema de Alabanza y Coritos
    </footer>
  </div>
</template>

<script setup>
</script>