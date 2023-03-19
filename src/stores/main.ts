import { defineStore } from "pinia";
import { ref } from "vue";

export const createMainStore = defineStore('main', () => {
    const isPopupShown = ref(false);
    const fullScreenMode = ref(false);
    return { isPopupShown, fullScreenMode };
});