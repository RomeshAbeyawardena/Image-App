<script setup lang="ts">
import { createimageStore } from '../stores/image-store';
import { storeToRefs } from 'pinia';

const imageStore = createimageStore();
const { imageFiles } = storeToRefs(imageStore);

</script>
<template>
    <ul class="menu">
        <li v-for="imageFile in imageFiles" class="menu-item">{{ imageFile.name }}</li>
    </ul>
</template>