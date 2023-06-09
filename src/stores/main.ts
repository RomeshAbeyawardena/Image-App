import { defineStore } from "pinia";
import { ref } from "vue";
import { IToastNotification, ToastNotification } from "../toast-notification";

export const createMainStore = defineStore('main', () => {
    const isPopupShown = ref(false);
    const fullScreenMode = ref(false);
    const zoomMode = ref(false);
    const isLoading = ref(false);
    const notification = ref<IToastNotification>(new ToastNotification());
    const showBottomToolbar = ref(false);

    function notify(heading: string, body: string | undefined, interval: number | null) {
        const toast = ToastNotification.create(heading, body, false);
        setNotification(toast, interval);
    }
    function setNotification(toast: IToastNotification, interval: number | null) {
        notification.value = toast;

        if (interval != null) {
            notification.value.visible = true;
            window.setTimeout(() => {
                notification.value.visible = false;
            }, interval);
        }
    }

    return {
        isLoading, isPopupShown, fullScreenMode, notify,
        notification, setNotification, zoomMode, showBottomToolbar
    };
});