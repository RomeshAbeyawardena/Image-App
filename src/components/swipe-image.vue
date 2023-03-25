<script setup lang="ts">
import 'swiper/swiper.scss';
import { storeToRefs } from 'pinia';
import SwiperCore, { Virtual, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/vue";
import { onBeforeMount, ref } from "vue";
import { createimageStore } from '../stores/image-store';
const imageStore = createimageStore();
const { imageFiles } = storeToRefs(imageStore);

onBeforeMount(async () => {
    await imageStore.getFiles("files2.json")
    console.log("done");
});
function loadImage(swiper: SwiperCore) {
    console.log("Load", swiper);
}

</script>
<template>
    <swiper :slides-per-view="1" :space-between="50" @active-index-change="loadImage">
        
    </swiper>
</template>
<style lang="scss">
.slide {
    height:300px;
    background-color: red;
}
</style>