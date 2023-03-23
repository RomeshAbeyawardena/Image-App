<script setup lang="ts">
    import { storeToRefs } from "pinia";
import { ref } from "vue";
import { createMainStore } from "../stores/main";
    const store = createMainStore();
    const { fullScreenMode } = storeToRefs(store);
    const showToolbar = ref(false);
    
</script>
<template>
    <div class="btn-bottom-tab" v-if="!fullScreenMode && !showToolbar">
        <a class="btn" @click="$event => showToolbar=true" href="#">View toolbar</a>
    </div>
    <div class="bottom-nav" v-if="!fullScreenMode && showToolbar">
        <h3>SX Viewer</h3>
        <div class="spacer">&nbsp;</div>
        <a class="btn btn-hide" @click="$event => showToolbar=false" href="#">Hide</a>
    </div>

</template>