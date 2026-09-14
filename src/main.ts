import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importamos el router
// @ts-expect-error: CSS files are handled by the bundler/Vite
import './assets/main.css';

const app = createApp(App);

app.use(router); // Activamos el router
app.mount('#app');