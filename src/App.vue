<script setup lang="ts">
import { createMainStore } from './stores/main';
import { createimageStore } from './stores/image-store';
import menuPopup from './components/menu-popup.vue';
import imagePreview from "./components/image-preview.vue";
import imageMenu from './components/image-menu.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import MenuNav from './components/menu-nav.vue';
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
  document.addEventListener("touchend", endTouch, false);

  // Swipe Up / Down / Left / Right
  let initialX: number | null = null;
  let initialY: number | null = null;
  let currentX: number | null = null;
  let currentY: number | null = null;
  let startTime: number | null = null;

  function resetFields() {
    initialX = null;
    initialY = null;
    startTime = null;
  }

  function startTouch(e: TouchEvent) {
    if (isPopupShown.value) {
      return;
    }
    startTime = new Date().getTime();
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };


  function endTouch(e: TouchEvent) {
    if (isPopupShown.value || initialX == null || initialY == null || startTime == null) {
      resetFields();
      return;
    }

    const offset = 0;
    const timeOffSet = 200;
    var changedTouch = e.changedTouches[0];
    
    currentX = changedTouch.clientX;
    currentY = changedTouch.clientY;

    let diffX: number = initialX - currentX;
    let diffY: number = initialY - currentY;
    let currentTime = new Date().getTime();

    let elapsedTime = currentTime - startTime;

    let bypass: boolean = true;

    if (elapsedTime < timeOffSet && Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > offset) {
        // swiped left
        bypass = false;
        imageStore.increment();
      } else if (diffX < -offset) {
        // swiped right
        bypass = false;
        imageStore.decrement();
      }
    }

    if (!bypass) {
      e.preventDefault();
    }

    resetFields();
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
  <menuPopup :visible="isPopupShown" parent-element-selector="a.image-select-btn" />
  <MenuNav />
  <imagePreview />
  <div class="text-field">
    <input type="text" placeholder="Comment" />
  </div>
</template>