<script setup lang="ts">

import { ref, onMounted, onUpdated } from 'vue';

const emit = defineEmits([
    "closeZoomer"
]);

const props = defineProps({
    imageUrl: String
});

const mounted = ref<boolean>(false);
const imageZoomElement = ref<HTMLElement>();

function prepareImageZoomElement() {
    if (!mounted.value) {
        return;
    }

    if (imageZoomElement.value == undefined || imageZoomElement.value == null) {
        imageZoomElement.value = document.querySelector("div.image-zoom") as HTMLElement;
    }

    if (props.imageUrl == undefined) {
        return;
    }
    const url = encodeURIComponent(props.imageUrl);

    imageZoomElement.value.style.backgroundImage = "url('"
        + url + "')";
    return imageZoomElement.value;
}

onMounted(() => {
    mounted.value = true;
    prepareImageZoomElement();
});

onUpdated(() => {
    prepareImageZoomElement();

})

function close() {
    emit("closeZoomer");
}

function zoomMove(target: HTMLElement, offsetX: number, offsetY: number) {
    const x = offsetX / target.offsetWidth * 100
    const y = offsetY / target.offsetHeight * 100
    target.style.backgroundPosition = x + '% ' + y + '%';
}

function touchZoomMove(e: TouchEvent) {
    var zoomer = e.currentTarget as HTMLElement;
    const defaultTouch = e.touches[0];
    const offsetX = defaultTouch.pageX;
    const offsetY = defaultTouch.pageY;
    zoomMove(zoomer, offsetX, offsetY);
    e.preventDefault();
}

function mouseZoomMove(e: MouseEvent) {
    var zoomer = e.currentTarget as HTMLElement;
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    zoomMove(zoomer, offsetX, offsetY);
    e.preventDefault();
}

</script>
<template>
    <div class="image-zoom" @touchmove="touchZoomMove" @mousemove="mouseZoomMove">
        <a class="btn close-btn" href="#" @click="close">
            <font-awesome-icon icon="xmark" />
        </a>
    </div>
</template>