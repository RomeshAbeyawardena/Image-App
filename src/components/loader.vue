<script setup lang="ts">
import "../scss/loader.scss";
import { storeToRefs } from 'pinia';
import { createMainStore } from '../stores/main';
const store = createMainStore();
const { isLoading } = storeToRefs(store);
</script>
<template>
    <div class="loader">
        <div class="lds-roller" v-if="isLoading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>