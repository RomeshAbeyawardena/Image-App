<script setup lang="ts">
import { createMainStore } from "../stores/main";
import { createimageStore } from "../stores/image-store";
import { onMounted, ref } from "vue";
import imageZoom from '../components/image-zoom.vue';
import { storeToRefs } from "pinia";
const emit = defineEmits(['toggleSelectPopup', 'toggleFullScreenMode']);

const props = defineProps({
    fullScreenMode: Boolean
});

const store = createMainStore();
const { zoomMode } = storeToRefs(store);
const imageStore = createimageStore();
const { currentImage } = storeToRefs(imageStore);

onMounted(async () => {
    document.addEventListener("keyup", (e:KeyboardEvent) => {
        if(e.key == "Escape"){
            zoomMode.value = false;
            e.preventDefault();
        }
    });
    document.addEventListener("resize", () => {
        setImagePlaceholderSize();
    });
    await imageStore.getFiles("files.json");
    setImagePlaceholderSize();
});

function setImagePlaceholderSize() {
    const imageElement = document.getElementById("image-placeholder");

    if (imageElement == null) {
        return;
    }

    imageElement.style.maxWidth = window.innerWidth + "px";
}

function setFullScreenClass(): string {
    if (props.fullScreenMode) {
        return "fullscreen";
    }

    return "";
}

function zoom_OnClick() {
    zoomMode.value = true;
}

function close_OnClick() {
    zoomMode.value = false;
}

function image_OnClick() {
    emit("toggleFullScreenMode", !props.fullScreenMode);
}

function imageSelect_OnClick() {
    emit("toggleSelectPopup");
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
    <img :alt="currentImage?.name" @click="image_OnClick" :src="currentImage?.fileName"
        id="image-placeholder" :class="setFullScreenClass()" />
    <imageZoom :image-url="currentImage?.fileName" v-if="zoomMode" @close-zoomer="close_OnClick" />
</template>