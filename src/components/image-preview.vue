<script setup lang="ts">
import { createMainStore } from "../stores/main";
import { createimageStore } from "../stores/image-store";
import { onMounted, ref } from "vue";
import imageZoom from '../components/image-zoom.vue';
import { storeToRefs } from "pinia";

const store = createMainStore();
const {  fullScreenMode, zoomMode } = storeToRefs(store);
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
    if (fullScreenMode) {
        return "fullscreen";
    }

    return "";
}

function close_OnClick() {
    zoomMode.value = false;
}

function image_OnClick() {
    fullScreenMode.value = !fullScreenMode.value;
}

</script>
<template>
    <img :alt="currentImage?.name" @click="image_OnClick" :src="currentImage?.fileName"
        id="image-placeholder" :class="setFullScreenClass()" />
    <imageZoom :image-url="currentImage?.fileName" v-if="zoomMode" @close-zoomer="close_OnClick" />
</template>