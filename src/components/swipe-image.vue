<script setup lang="ts">
import 'swiper/swiper.scss';
import { storeToRefs } from 'pinia';
import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/vue";
import { onBeforeMount, ref, watch } from "vue";
import { createimageStore } from '../stores/image-store';
import collect from "collect.js";
import { IImageFile } from '../image';
import { createMainStore } from '../stores/main';
import { EventSource } from '../event-data';
import { Dom7 } from 'dom7';

SwiperCore.use([Virtual]);

const store = createMainStore();
const { isLoading, fullScreenMode } = storeToRefs(store);
const imageStore = createimageStore();
const { fileIndex, imageFiles, lastEvent } = storeToRefs(imageStore);
const cachedImages = ref<Array<IImageFile>>();

const swiperInstance = ref<SwiperCore>();

function getImages(next: boolean, currentIndex: number, takeCurrent: boolean) {
    const c = collect(imageFiles.value);
    console.log(currentIndex);
    const m = currentIndex == 0 ? c : c.skip(takeCurrent ? currentIndex : currentIndex + 1);
    const a = m!.take(next ? 3 : -3).toArray() as Array<IImageFile>;
    return a;
}

watch(lastEvent, (newValue, oldValue) => {
    //console.log(swiperInstance);
    if (oldValue != undefined
        && newValue != undefined
        && !isNaN(newValue.value)
        && newValue.source == EventSource.menu) {
        if (cachedImages.value?.at(newValue.value) == undefined) {
            populateImageFiles(getImages(true, newValue.value, true));
            console.log(newValue.value, cachedImages.value?.filter(f => f != undefined));
        }
         if (swiperInstance.value != undefined) {
        //     console.log(newValue.value);
        //     const el = document.querySelector(".image-placeholder[alt='" + newValue + "']");

        //     if (el != null) {
        //         (el.parentElement as HTMLElement).parentElement?.parentElement;
        //     }
            setTimeout(() => swiperInstance.value!.slideTo(newValue.value), 1000);
        }
        //const images = nextImages();
        //cachedImages.value?.splice(0, 0, ...images);
    }
    //else 
    //  console.log("bypassed");
});

function populateImageFiles(imageFiles: IImageFile[]) {
    let firstElement: IImageFile | undefined;
    //console.log("populateImageFiles");
    if (cachedImages.value == undefined || (firstElement = imageFiles.at(0)) == undefined) {
        //console.log("Failed");
        return;
    }
    //console.log(firstElement.index);
    cachedImages.value.splice(firstElement.index, 0, ...imageFiles);
}

onBeforeMount(async () => {
    isLoading.value = true;
    await imageStore.getFiles("files2.json");

    cachedImages.value = new Array<IImageFile>(imageFiles.value.length);
    populateImageFiles(getImages(true, 0, false));
    isLoading.value = false;
    imageStore.setLastEvent(EventSource.swipe, fileIndex);
});

function loadImages(swiper: SwiperCore) {
    isLoading.value = true;
    if (cachedImages.value == undefined) {
        return;
    }
    imageStore.setLastEvent(EventSource.swipe, fileIndex.value);

    const isNext = fileIndex.value < swiper.activeIndex;

    fileIndex.value = swiper.activeIndex;
    if (isNext && cachedImages.value.at(fileIndex.value + 1) == undefined) {
        populateImageFiles(getImages(true, fileIndex.value, false));
    }
    else if (cachedImages.value.at(fileIndex.value - 1) == undefined) {
        populateImageFiles(getImages(false, fileIndex.value, false));
    }
    imageStore.setLastEvent(EventSource.swipe, fileIndex);
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

function initSwiper(swiper: SwiperCore) {
    swiperInstance.value = swiper;
}

</script>
<template>
    <swiper @init="initSwiper" :slides-per-view="1" :space-between="50" @active-index-change="loadImages" :virtual="true">
        <swiper-slide v-for="imageFile in cachedImages?.filter(f => f != undefined)" :virtual-index="imageFile.index"
            :swiper-ref="SwiperCore" :ref_key="imageFile.fileName">
            <a href="#" aria-role-description="button" role="button" :data-type="imageFile.index" @click="toggleFullScreen">
                <img :class="setImageClass()" :src="imageFile.fileName" :alt="imageFile.name" />
            </a>
        </swiper-slide>
    </swiper>
</template>