import { defineStore } from "pinia";
import { ref } from "vue";
import { IToast, Toast } from "../toast";

export const createMainStore = defineStore('main', () => {
    const isPopupShown = ref(false);
    const fullScreenMode = ref(false);
    const zoomMode = ref(false);
    const isLoading = ref(false);
    const notification = ref<IToast>(new Toast());

    function notify(heading:string,body:string|undefined,interval:number|null){
        const toast = new Toast();
            toast.heading = heading;
            toast.body = body; 
        setNotification(toast, interval);
    }
    function setNotification(toast:IToast, interval:number|null){
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