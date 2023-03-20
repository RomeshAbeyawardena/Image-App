<script setup lang="ts">
import { createimageStore } from '../stores/image-store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const props = defineProps({
    filterSearch:String
});
const emit = defineEmits(["imageSelected"]);
const imageStore = createimageStore();
const { fileIndex, imageFiles } = storeToRefs(imageStore);

const filteredImageFiles = computed(() => {
    
    if(props.filterSearch == undefined){
        return imageFiles.value;
    }

    return imageFiles.value.filter(f => f.fileName.includes(props.filterSearch!));
})

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
        <li v-for="imageFile in filteredImageFiles" class="menu-item">
            <a @click="selectImage(imageFile.index)" 
            :class="setLinkClass(imageFile.index)" 
            :title="imageFile.name" href="#">{{ imageFile.name }}</a>
        </li>
    </ul>
</template>