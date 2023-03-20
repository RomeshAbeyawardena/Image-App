<script setup lang="ts">
import { createimageStore } from '../stores/image-store';
import { storeToRefs } from 'pinia';

const emit = defineEmits(["imageSelected"]);
const imageStore = createimageStore();
const { fileIndex, imageFiles } = storeToRefs(imageStore);
function selectImage(index:number){
    emit("imageSelected", index);
    fileIndex.value = index;
}

function setLinkClass(currentIndex:number):string{
    if(currentIndex == fileIndex.value)
    {
        return "highlighted"
    }

    return "";
}

</script>
<template>
    <ul class="menu">
        <li v-for="imageFile in imageFiles" class="menu-item">
            <a @click="selectImage(imageFile.index)" :class="setLinkClass(imageFile.index)" :title="imageFile.name" href="#">{{ imageFile.name }}</a>
        </li>
    </ul>
</template>