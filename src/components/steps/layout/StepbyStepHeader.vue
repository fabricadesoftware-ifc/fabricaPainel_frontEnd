<script setup>
const props = defineProps({
  steps: {
    type: Array,
    required: true
  },
  actualstep: {
    type: Number,
    required: true
  }
})
</script>
<template>
  <VStepperHeader class="d-flex flex-column align-start justify-start w-25"
    style="border-top-right-radius: 60px; box-shadow: 1px 1px 20px 1px rgba(33, 148, 236, 0.18)">
    <div class="d-flex align-center pa-10 mb-10">
      <router-link class="text-decoration-none d-flex align-center text-black" to="/">
        <img src="../../../assets/sepe_logo.png" width="75" />
        <h1 class="font-weight-medium">Painel</h1>
      </router-link>
    </div>
    <div>
      <div v-for="(step, i) in steps" class="d-flex flex-column justify-center" :key="i">
        <VStepperItem :value="step.value" :complete="step.complete"
          :color="actualstep === i ? 'blue' : (step.complete ? 'success' : 'grey')" class="pa-2 ms-5">
          <p :class="[
            actualstep === i ? 'text-blue font-weight-bold' :
              (step.complete ? 'text-grey' : 'text-black')
          ]" class="ms-2">
            {{ step.title }}
          </p>
        </VStepperItem>
        <div :class="i !== 4 ? 'ms-10' : 'd-none'">
          <VDivider vertical style="height: 50px; width: 2px;" class="pa-0"></VDivider>
        </div>
      </div>
    </div>
  </VStepperHeader>
</template>