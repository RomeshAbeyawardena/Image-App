<script setup lang="ts">

import { onMounted, ref, h } from "vue";
import { createimageStore } from '../stores/image-store';
import { storeToRefs } from 'pinia';
import { EnvironmentVariables } from "../variables/environment-variables";
import { register } from 'swiper/element/bundle';
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/vue';
register(true);

const props = defineProps({
    numberOfImagesToPreload: Number
});

const store = createimageStore();
const { files } = storeToRefs(store);

onMounted(async () => {
    await store.getFiles(EnvironmentVariables.Default.fileList);
});
function nextImage(e){
    console.log(e);
}
</script>
<template>
    <Swiper :modules="[Virtual]" :slides-per-view="1" :space-between="50" 
    @navigation-next="nextImage" virtual>
        <swiper-slide>
            <div>slide1</div>
        </swiper-slide>
        <swiper-slide>
            <div>slide2</div>
        </swiper-slide>
        <swiper-slide>
            <div>slide3</div>
        </swiper-slide>
    </Swiper>
</template>