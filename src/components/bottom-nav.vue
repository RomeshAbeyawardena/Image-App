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
        <a class="btn" @click="$event => showToolbar=true" href="#">
            <font-awesome-icon icon="circle-chevron-up" />
        </a>
    </div>
    <div class="bottom-nav" v-if="!fullScreenMode && showToolbar">
        <h3>SX Viewer</h3>
        <div class="spacer">&nbsp;</div>
        <a class="btn btn-hide" @click="$event => showToolbar=false" href="#">
            <font-awesome-icon icon="circle-chevron-down" />
        </a>
    </div>

</template>