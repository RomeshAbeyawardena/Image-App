<script setup lang="ts">
    import { watch, onMounted, ref } from "vue";
    import { createPopper, Instance } from "@popperjs/core";
    import { createMainStore } from "../stores/main";
    import { storeToRefs } from "pinia";
    const props = defineProps({
        visible:Boolean,
        parentElementSelector:String
    });

    const store = createMainStore();
    const { isPopupShown } = storeToRefs(store)
    const instance = ref<Instance>();
    watch(isPopupShown, (newValue:boolean) => {
        if(newValue)
        {
            instance.value?.update();
        }
    });
    onMounted(() => {
        const popupElement:HTMLElement = document
            .querySelector("div.menu-popup") as HTMLElement;
        
        if(popupElement == null) {
                return;
        }
        
        if(props.parentElementSelector != undefined) {
            const parentElement = document
                .querySelector(props.parentElementSelector);
            
            if(parentElement == null){
                return;
            }

            instance.value = createPopper(parentElement, popupElement, {
                placement: 'bottom-end'
            });
        }
    });
</script>

<template>
  <div v-show="visible" class="menu-popup">
        <ul class="menu">
            
        </ul>
    </div>
</template>