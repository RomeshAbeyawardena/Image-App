<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { createimageStore } from '../stores/image-store';
import { createMainStore } from '../stores/main';
    const store = createMainStore();
    const imageStore = createimageStore();
    const { isPopupShown, fullScreenMode, zoomMode } = storeToRefs(store);
    const { currentImage } = storeToRefs(imageStore);

    function zoom_OnClick() {
        zoomMode.value = true;
    }

    function imageSelect_OnClick() {
        isPopupShown.value = !isPopupShown.value;
    }
</script>
<template>
    <div v-if="!fullScreenMode" class="title-panel">
        <a class="btn zoom-btn" href="#" @click="zoom_OnClick">
            <font-awesome-icon icon="magnifying-glass-plus" />
        </a>
        <h1 id="title-heading">{{ currentImage?.name }}</h1>
        <a class="btn image-select-btn" href="#" @click="imageSelect_OnClick" role="menu">Select</a>
    </div>
</template>