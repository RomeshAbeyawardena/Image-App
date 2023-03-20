<script setup lang="ts">
import { createimageStore } from "../stores/image-store";
import { onMounted, ref } from "vue";
import { EnvironmentVariables } from "../variables/environment-variables";

const emit = defineEmits(['toggleSelectPopup', 'toggleFullScreenMode']);

const props = defineProps({
    fullScreenMode: Boolean
});

const innerWidth = ref(window.innerWidth);

const imageStore = createimageStore();
onMounted(async () => {
    document.addEventListener("resize", () => {
        setImagePlaceholderSize();
    });
    await imageStore.getFiles(EnvironmentVariables.Default.fileList);
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

function image_OnClick() {
    emit("toggleFullScreenMode", !props.fullScreenMode);
}

function imageSelect_OnClick() {
    emit("toggleSelectPopup");
}
</script>
<template>
    <div v-if="!fullScreenMode" class="title-panel">
        <!--<p>{{ innerWidth }}</p>-->
        <h1 id="title-heading">{{ imageStore.currentImage?.name }}</h1>
        <a class="image-select" href="#" @click="imageSelect_OnClick" role="menu">Select</a>
    </div>
    <img :alt="imageStore.currentImage?.name" @click="image_OnClick" :src="imageStore.currentImage?.fileName"
        id="image-placeholder" :class="setFullScreenClass()" />
    <input type="hidden" value="-1" id="index-field" />
</template>