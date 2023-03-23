<script setup lang="ts">
    import { storeToRefs } from "pinia";
import { ref } from "vue";
import { createMainStore } from "../stores/main";
    const store = createMainStore();
    const { fullScreenMode, showBottomToolbar } = storeToRefs(store);
    
</script>
<template>
    <div class="btn-bottom-tab" v-if="!fullScreenMode && !showBottomToolbar">
        <a class="btn" @click="$event => showBottomToolbar=true" href="#">
            <font-awesome-icon icon="circle-chevron-up" />
        </a>
    </div>
    <div class="bottom-nav" v-if="!fullScreenMode && showBottomToolbar">
        <h3>SX Viewer</h3>
        <div class="spacer">&nbsp;</div>
        <a class="btn btn-hide" @click="$event => showBottomToolbar=false" href="#">
            <font-awesome-icon icon="circle-chevron-down" />
        </a>
    </div>

</template>