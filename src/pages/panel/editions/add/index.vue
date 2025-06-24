<script setup> 
  import { StepsEdition } from '@/utils/steps/editions';
  import { useEdition } from '@/stores/edition';
  const editionStore = useEdition()
  const actualstep = ref(0)


  const SelectedArrayItems = computed(() => {
    if(actualstep.value === 0){
      return editionStore.newEdtion.newedition.slice(0, 3)
    }
    else if(actualstep.value === 1){
      return editionStore.newEdtion.newedition.slice(3, 15)
    }
  })

  function NextStep() {
  if (actualstep.value <= 3) {
    StepsEdition.value[actualstep.value].complete = true
    StepsEdition.value[actualstep.value].is_actual = false
    StepsEdition.value[actualstep.value + 1].is_actual = true
  }
  else if (actualstep.value === 4) {
    StepsEdition.value[actualstep.value].complete = true
    StepsEdition.value[actualstep.value].is_actual = false
  }
  actualstep.value++
}

function PrevStep() {
  if(actualstep.value === 5){
    StepsEdition.value[actualstep.value - 1].is_actual = true
  }
  else{
    StepsEdition.value[actualstep.value].is_actual = false
    StepsEdition.value[actualstep.value - 1].is_actual = true
  }
  actualstep.value--
}
</script>
<template>
<div style="height: 100vh;">
  <VStepper class="d-flex h-100">
    <StepbyStepHeader :steps="StepsEdition" :actualstep="actualstep" :is_edition="true"/>
    <VStepperWindow class="w-100 h-100">
      <div class="d-flex flex-column flex-wrap w-100 h-100 ga-5">
          <EditionInputs v-for="edition, i in SelectedArrayItems" :key="i" :placeholder="edition.placeholder" v-model:value="edition.value" :type="edition.type" :label="edition.label"/>
      </div>
      <StepsAction :actualstep="actualstep"  @PrevStep="PrevStep"
          @NextStep="NextStep"/>
    </VStepperWindow>
  </VStepper>
</div>
</template>