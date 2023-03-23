<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { createimageStore } from '../stores/image-store';
import { createMainStore } from '../stores/main';
const store = createMainStore();
const imageStore = createimageStore();
const { isLoading, isPopupShown, fullScreenMode, zoomMode } = storeToRefs(store);
const { currentImage } = storeToRefs(imageStore);

function zoom_OnClick() {
    if (!isLoading.value) {
        zoomMode.value = true;
    }
}
function setZoomBtnIcon() {
    if (isLoading.value) {
        return "hourglass-end";
    }

    return "magnifying-glass-plus";
}
function setZoomBtnClass() {
    const baseClass = "btn zoom-btn";

    if (isLoading.value) {
        return baseClass + " disabled";
    }

    return baseClass;
}

function imageSelect_OnClick() {
    isPopupShown.value = !isPopupShown.value;
}
</script>
<template>
    <div v-if="!fullScreenMode" class="title-panel">
        <a :class="setZoomBtnClass()" href="#" @click="zoom_OnClick">
            <font-awesome-icon :icon="setZoomBtnIcon()" />
        </a>
        <h1 id="title-heading">{{ currentImage?.name }}</h1>
        <a class="btn image-select-btn" href="#" @click="imageSelect_OnClick" role="menu">Select</a>
    </div>
</template>