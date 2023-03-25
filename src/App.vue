<script setup lang="ts">
import { createMainStore } from './stores/main';
import { createimageStore } from './stores/image-store';
import menuPopup from './components/menu-popup.vue';
import imagePreview from "./components/image-preview.vue";
import loader from './components/loader.vue';
import { onMounted, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import MenuNav from './components/menu-nav.vue';
import Toast from './components/toast.vue';
import bottomNav from './components/bottom-nav.vue';
import swipeImage from './components/swipe-image.vue';
const store = createMainStore();
const { isLoading, isPopupShown, fullScreenMode, notification } = storeToRefs(store);
const imageStore = createimageStore();

const { currentImage } = storeToRefs(imageStore);

watch(currentImage, () => {
  isLoading.value = true;
});


const timeOutId = ref(0)
function comment_onBlur() {
  currentImage.value.lastUpdated = new Date();
  if (timeOutId.value) {
    clearTimeout(timeOutId.value);
    timeOutId.value = 0;
  }

  timeOutId.value = setTimeout(imageStore.saveChanges, 1500);
}

</script>

<template>
  <Toast :data="notification" />
  <loader />
  <menuPopup :visible="isPopupShown" parent-element-selector="a.image-select-btn" />
  <MenuNav />
 <div class="container">
  <swipeImage />
  <div v-if="!fullScreenMode" class="text-field search-field">
    <input type="text" v-model="currentImage.comment" 
          tabindex="-1"  
          @keyup="comment_onBlur" placeholder="Comment" />
  </div>
</div>
  <bottomNav />
</template>