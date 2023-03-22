<script setup lang="ts">
import { watch, onMounted, ref } from "vue";
import { createPopper, Instance } from "@popperjs/core";
import { createMainStore } from "../stores/main";
import { storeToRefs } from "pinia";
import imageMenu from "./image-menu.vue";

const props = defineProps({
    visible: Boolean,
    parentElementSelector: String
});

const searchText = ref("");
const store = createMainStore();
const { fullScreenMode, isPopupShown } = storeToRefs(store)
const instance = ref<Instance>();

watch(fullScreenMode, async (newValue: boolean) => {
    if (!newValue) {
        isPopupShown.value = false;
        window.setTimeout(() => createPopup(), 500);
    }
});

watch(isPopupShown, async (newValue: boolean) => {
    if (newValue) {
        if (instance.value != undefined) {
            await instance.value.update();
        }
    }
});

function createPopup(parentElement: Element | null = null, popupElement: HTMLElement | null = null): Instance | undefined {

    if (props.parentElementSelector == undefined) {
        return undefined;
    }

    if (parentElement == null) {
        parentElement = document
            .querySelector(props.parentElementSelector);
    }

    if (parentElement == null) {
        return undefined;
    }

    if (popupElement == null) {
        popupElement = document.querySelector("div.menu-popup");
    }

    if (popupElement == null) {
        return undefined;
    }

    instance.value = createPopper(parentElement, popupElement, {
        placement: 'bottom-end'
    });

    return instance.value;
}

onMounted(() => {
    createPopup();
});
</script>

<template>
    <div v-show="visible" class="menu-popup">
        <div class="text-field">
            <input type="text" placeholder="Search" v-model="searchText" />
        </div>
        <imageMenu :filter-search="searchText" />
    </div>
</template>