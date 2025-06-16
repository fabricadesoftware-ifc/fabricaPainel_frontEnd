<script lang="ts" setup>
const props = defineProps({
    loading: {
        type: Boolean
    }
})
</script>
<template>
    <div v-if="props.loading" style="background-color: rgba(0, 0, 0, 0.7); z-index: 999; height: 100vh;" class="d-flex  justify-center align-center position-absolute w-100 top-0">
      <v-progress-circular indeterminate color="primary" size="64" />
      </div>
</template>