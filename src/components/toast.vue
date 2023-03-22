<script setup lang="ts">
import "../scss/toast.scss";
import { Toast } from "../toast";
const props = defineProps({
    data: Toast
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