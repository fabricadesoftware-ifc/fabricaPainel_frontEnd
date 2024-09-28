<template>
  <v-range-slider
    :max="anos.max"
    :min="anos.min"
    :model-value="data"
    show-ticks="always"
    :step="1"
    strict
    thumb-label="always"
    tick-size="4"
    @update:model-value="updateData"
  >
    <template #thumb-label="{ modelValue }">
      <span>{{ season(modelValue) }}</span>
    </template>
  </v-range-slider>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { usefilter } from '@/stores/editions'

  const store = usefilter()
  const data = ref(store.state.yearsRange)
  const ano = store.state.years

  interface Anos {
    years: number[]
    max: number
    min: number
    seasons: { [key: number]: string }
  }

  const anos = ref<Anos>({
    years: ano.map((a: { year: number }) => a.year),
    max: Math.max(...ano.map((a: { year: number }) => a.year)),
    min: Math.min(...ano.map((a: { year: number }) => a.year)),
    seasons: ano.reduce((acc: { [key: number]: string }, a: { year: number }) => {
      acc[a.year] = a.year.toString()
      return acc
    }, {}),
  })

  const season = (modelValue: number) => {
    return anos.value.seasons[modelValue]
  }

  const updateData = (newValue: number[]) => {
    data.value = newValue
    store.state.yearsRange = newValue
  }

  watch(() => store.state.years, newYears => {
    anos.value.years = newYears.map((a: { year: number }) => a.year)
    anos.value.max = Math.max(...anos.value.years)
    anos.value.min = Math.min(...anos.value.years)
    anos.value.seasons = newYears.reduce((acc: { [key: number]: string }, a: { year: number }) => {
      acc[a.year] = a.year.toString()
      return acc
    }, {})
  })
</script>
