<script setup lang="ts">
import { createMainStore } from './stores/main';
import { createimageStore } from './stores/image-store';
import swipe from './components/swipe.vue';
import menuPopup from './components/menu-popup.vue';
import imagePreview from "./components/image-preview.vue";
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const store = createMainStore();
const { isPopupShown, fullScreenMode } = storeToRefs(store);
const imageStore = createimageStore();
onMounted(() => {
  document.addEventListener("keyup", (ev: KeyboardEvent) => {
    const ARROW_LEFT = "ArrowLeft";
    const ARROW_RIGHT = "ArrowRight";
    const ESCAPE = "Escape";
    if ((ev.key == ARROW_LEFT || ev.key == ARROW_RIGHT)) {
      if (ev.key == ARROW_RIGHT) {
        imageStore.increment();
      }
      else {
        imageStore.decrement();
      }
    }

    if (fullScreenMode.value && ev.key == ESCAPE) {
      fullScreenMode.value = !fullScreenMode.value;
    }
  });

});
function toggleSelectPopup() {
  isPopupShown.value = !isPopupShown.value;
}

function toggleFullScreenMode(e: boolean) {
  fullScreenMode.value = e;
}
</script>

<template>
  <menuPopup :visible="isPopupShown" parent-element-selector="a.image-select"></menuPopup>
  <imagePreview v-if="false" :full-screen-mode="fullScreenMode" @toggle-full-screen-mode="toggleFullScreenMode"
    @toggle-select-popup="toggleSelectPopup"></imagePreview>
  <swipe></swipe>
</template>