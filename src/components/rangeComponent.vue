<template>
  <v-range-slider
    :max="ano.max"
    :min="ano.min"
    :model-value="data"
    show-ticks="always"
    :step="1"
    strict
    thumb-label="always"
    tick-size="4"
  >
    <template #thumb-label="{ modelValue }">
      <span>{{ season(modelValue) }}</span>
    </template>
  </v-range-slider>
</template>

<script setup lang="ts">
  const props: any = defineProps({
    ano: {
      type: Object,
      required: true,
    },
  })
  const data = ref([2012, 2013])

  const season = (modelValue: any) => {
    return props.ano.seasons[modelValue]
  }

</script>
