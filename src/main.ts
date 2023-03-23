import { createApp } from 'vue';
import { createPinia } from "pinia";
import eruda from "eruda";
import './scss/index.scss';
import App from './App.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faMagnifyingGlassPlus, faXmark, faHourglassEnd, faCircleChevronDown, faCircleChevronUp } 
    from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faMagnifyingGlassPlus, faXmark, faHourglassEnd, faCircleChevronDown, faCircleChevronUp);

window.addEventListener("DOMContentLoaded", (event) => {
    if (!/eruda=true/.test(window.location.toString()) 
        && localStorage.getItem('active-eruda') != 'true') return;
    eruda.init();
});

createApp(App)
    .use(createPinia())
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
