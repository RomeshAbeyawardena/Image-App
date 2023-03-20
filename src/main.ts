import { createApp } from 'vue';
import { createPinia } from "pinia";
import eruda from "eruda";
import './scss/index.scss';
import App from './App.vue';



window.addEventListener("DOMContentLoaded", (event) => {
    if (!/eruda=true/.test(window.location.toString()) && localStorage.getItem('active-eruda') != 'true') return;
    eruda.init();
});

createApp(App)
    .use(createPinia())
    .mount('#app')
