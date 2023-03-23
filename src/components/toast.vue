<script setup lang="ts">
import "../scss/toast.scss";
import { ToastNotification } from "../toast-notification";
const props = defineProps({
    data: ToastNotification
});


</script>
<template>
    <Transition>
        <div class="toast" v-if="data?.visible">
            <h4 class="toast-heading">{{ props.data?.heading }}</h4>
            <p class="toast-body">{{ props.data?.body }}</p>
        </div>
    </Transition>
</template>