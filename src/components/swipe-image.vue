<script setup lang="ts">
import 'swiper/swiper.scss';
import { storeToRefs } from 'pinia';
import SwiperCore, { Virtual, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/vue";
import { onBeforeMount, ref } from "vue";
import { createimageStore } from '../stores/image-store';
import { Iterator } from '../iterator';
import { IImageFile } from '../image';
import { createMainStore } from '../stores/main';

const store = createMainStore();
const { isLoading } = storeToRefs(store);
const imageStore = createimageStore();
const { imageFiles } = storeToRefs(imageStore);
const cachedImages = ref<Array<IImageFile>>();
let getNextImages: () => Array<IImageFile>;

onBeforeMount(async () => {
    isLoading.value = true;
    await imageStore.getFiles("files2.json");
    getNextImages = Iterator<IImageFile>(imageFiles.value, 3)
    cachedImages.value = getNextImages();
    isLoading.value = false;
});
function loadImage(swiper: SwiperCore) {
    isLoading.value = true;
    if (cachedImages.value == undefined) {
        return;
    }
    
    if (swiper.activeIndex == cachedImages.value.length - 1) {
        getNextImages().forEach(i => cachedImages.value?.push(i));
    }
    isLoading.value = false;
}

</script>
<template>
    <swiper :slides-per-view="1" :space-between="50" @active-index-change="loadImage">
        <swiper-slide 
            v-for="(imageFile, i) in cachedImages" 
            :swiper-ref="SwiperCore"
            :ref_key="imageFile.fileName">
            <img :src="imageFile.fileName" :alt="imageFile.name" />
        </swiper-slide>
    </swiper>
</template>
<style lang="scss">
.slide {
    height: 300px;
    background-color: red;
}
</style>