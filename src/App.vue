<script setup lang="ts">
import { createMainStore } from './stores/main';
import { createimageStore } from './stores/image-store';
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

  document.addEventListener("touchstart", startTouch, false);
  document.addEventListener("touchmove", moveTouch, false);
  document.addEventListener("touchend", endTouch, false);

  // Swipe Up / Down / Left / Right
  let initialX: number = 0;
  let initialY: number = 0;
  let currentX: number = 0;
  let currentY: number = 0;

  function startTouch(e: TouchEvent) {
    if (isPopupShown.value) {
      return;
    }

    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };

  function moveTouch(e: TouchEvent) {
    if (isPopupShown.value) {
      return;
    }

    if (initialX === null) {
      return;
    }

    if (initialY === null) {
      return;
    }

    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
  }

  function endTouch(e: TouchEvent) {
    var diffX: number = initialX - currentX;
    var diffY: number = initialY - currentY;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > 100) {
        // swiped left
        imageStore.increment();
      } else if(diffX < -100) {
        // swiped right
        imageStore.decrement();
      }
    } else {
      // sliding vertically
      if (diffY > 0) {
        // swiped up
        imageStore.increment();
      } else {
        // swiped down
        imageStore.decrement();
      }
    }

    initialX = 0;
    initialY = 0;

    e.preventDefault();
  };

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
  <imagePreview :full-screen-mode="fullScreenMode" @toggle-full-screen-mode="toggleFullScreenMode"
    @toggle-select-popup="toggleSelectPopup"></imagePreview>
</template>