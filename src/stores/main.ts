import { defineStore } from "pinia";
import { ref } from "vue";
import { IToastNotification, ToastNotification } from "../toast-notification";

export const createMainStore = defineStore('main', () => {
    const isPopupShown = ref(false);
    const fullScreenMode = ref(false);
    const zoomMode = ref(false);
    const isLoading = ref(false);
    const notification = ref<IToastNotification>(new ToastNotification());

    function notify(heading:string,body:string|undefined,interval:number|null){
        const toast = new ToastNotification();
            toast.heading = heading;
            toast.body = body; 
        setNotification(toast, interval);
    }
    function setNotification(toast:IToastNotification, interval:number|null){
        notification.value = toast;
        
        if(interval != null) {
            notification.value.visible = true;
            window.setTimeout(() => {
                notification.value.visible = false;
            }, interval);
        }
    }

    return { isLoading, isPopupShown, fullScreenMode, notify, 
                notification, setNotification, zoomMode };
});