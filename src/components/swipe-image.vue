<script setup lang="ts">
import 'swiper/swiper.scss';
import { storeToRefs } from 'pinia';
import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/vue";
import { onBeforeMount, ref, watch } from "vue";
import { createimageStore } from '../stores/image-store';
import { Iterator } from '../iterator';
import { IImageFile } from '../image';
import { createMainStore } from '../stores/main';
import { EventSource } from '../event-data';

SwiperCore.use([Virtual]);

const store = createMainStore();
const { isLoading, fullScreenMode } = storeToRefs(store);
const imageStore = createimageStore();
const { fileIndex, imageFiles, lastEvent } = storeToRefs(imageStore);
const cachedImages = ref<Array<IImageFile>>();

const swiperInstance = ref<any>(null);

let getNextImages: () => Array<IImageFile>;

watch(lastEvent, (newValue) => {
    //console.log(swiperInstance);
    if(newValue != undefined 
        && !isNaN(newValue.value)
        && newValue.source == EventSource.menu)
    {
        const nextImages = Iterator<IImageFile>(imageFiles.value, 3, newValue.value);
        cachedImages.value = nextImages();
    }
    //else 
      //  console.log("bypassed");
});

onBeforeMount(async () => {
    isLoading.value = true;
    await imageStore.getFiles("files2.json");
    getNextImages = Iterator<IImageFile>(imageFiles.value, 3);
    cachedImages.value = getNextImages();
    isLoading.value = false;
});

function loadImages(swiper: SwiperCore) {
    isLoading.value = true;
    if (cachedImages.value == undefined) {
        return;
    }
    imageStore.setLastEvent(EventSource.swipe, fileIndex.value);
    fileIndex.value = swiper.activeIndex;
    if (fileIndex.value == cachedImages.value.length - 1) {
        getNextImages().forEach(i => cachedImages.value?.push(i));
    }

    isLoading.value = false;
}

function setImageClass() {
    const baseClass = "image-placeholder";

    if (fullScreenMode.value) {
        return baseClass + " fullscreen";
    }

    return baseClass;
}

function toggleFullScreen() {
    fullScreenMode.value = !fullScreenMode.value;
}

</script>
<template>
    <swiper ref="swiper" :slides-per-view="1"  :space-between="50" @active-index-change="loadImages" :virtual="true">
        <swiper-slide v-for="imageFile in cachedImages" :virtual-index="imageFile.index" :swiper-ref="SwiperCore" :ref_key="imageFile.fileName">
            <a href="#" aria-role-description="button" role="button" @click="toggleFullScreen">
                <img :class="setImageClass()" :src="imageFile.fileName" :alt="imageFile.name" />
            </a>
        </swiper-slide>
    </swiper>
</template>