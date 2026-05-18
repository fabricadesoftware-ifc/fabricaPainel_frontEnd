<script setup> 
  import { StepsEdition } from '@/utils/steps/editions';
  import { useEdition } from '@/stores/edition';
  import { hasEditionErrors, validateEditionCreation } from '@/utils/validators/edition/edition';

  const editionStore = useEdition()
  const actualstep = ref(0)
  const imgPreview = ref(null)
  const openDialog = ref(false)

  function changeimg(e){
    imgPreview.value = URL.createObjectURL(e.target.files[0])
    editionStore.newEdtion.newedition[24].value = e.target.files[0]
  }

  const SelectedArrayItems = computed(() => {
    if(actualstep.value === 0){
      return editionStore.newEdtion.newedition.slice(0, 5)
    }
    else if(actualstep.value === 1){
      return editionStore.newEdtion.newedition.slice(5, 15)
    }
    else if(actualstep.value === 2){
      return editionStore.newEdtion.newedition.slice(15, 18)
    }
    else if(actualstep.value === 3){
      return editionStore.newEdtion.newedition.slice(18, 24)
    }
    else if(actualstep.value === 4){
      return editionStore.newEdtion.newedition[25]
    }
  })

  const validation = computed(() => validateEditionCreation(editionStore.newEdtion.newedition))

  function inputIndex(edition) {
    return editionStore.newEdtion.newedition.indexOf(edition)
  }

  function fieldError(edition) {
    return validation.value.fieldErrors[inputIndex(edition)] || ''
  }

  function qtdErrors(edition) {
    return validation.value.qtdErrors[inputIndex(edition)] || []
  }

  const selectValidator = computed(() => {
    if(actualstep.value === 0){
      return hasEditionErrors(validation.value, 0, 5)
    }
    else if(actualstep.value === 1){
      return hasEditionErrors(validation.value, 5, 15)
    }
    else if(actualstep.value === 2){
      return hasEditionErrors(validation.value, 15, 18)
    }
    else if(actualstep.value === 3){
        return hasEditionErrors(validation.value, 18, 24)
    }
    else if(actualstep.value === 4 && imgPreview.value){
      return false
    }
    return true
  })
  
  async function DialogActive(type){
    if(type == 'confirmar'){
      editionStore.createEdition()
      actualstep.value++
    }
    openDialog.value = !openDialog.value
  }

  function NextStep() {
  if (actualstep.value <= 3) {
    StepsEdition.value[actualstep.value].complete = true
    StepsEdition.value[actualstep.value].is_actual = false
    StepsEdition.value[actualstep.value + 1].is_actual = true
    actualstep.value++
  }
  else if (actualstep.value === 4) {
    openDialog.value = !openDialog.value 
  }
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
  <VStepper v-model="actualstep" class="d-flex h-100">
    <StepbyStepHeader :steps="StepsEdition" :actualstep="actualstep"/>
    <VStepperWindow class="w-100 h-100">
      <div class="d-flex flex-column justify-center align-center flex-wrap w-100 h-100 ga-7 overflow-y" v-if="actualstep < 3">
          <EditionInputs
            v-for="edition, i in SelectedArrayItems"
            :key="i"
            :placeholder="edition.placeholder"
            v-model:value="edition.value"
            :type="edition.type"
            :label="edition.label"
            :qtds="edition.qtds"
            :error="fieldError(edition)"
            :qtd-errors="qtdErrors(edition)"
          />
      </div>
      <div class="d-flex flex-column ga-10" v-else-if="actualstep === 3">
          <div class="d-flex  flex-column ga-5">
              <h3 class="ms-10">Máximo de trabalhos</h3>
              <div class="d-flex flex-wrap justify-center align-start ga-5">
                <EditionInputs
                  v-for="edition, i in SelectedArrayItems.slice(0, 3)"
                  :key="i"
                  :placeholder="edition.placeholder"
                  v-model:value="edition.value"
                  :type="edition.type"
                  :label="edition.label"
                  :qtds="edition.qtds"
                  :error="fieldError(edition)"
                  :qtd-errors="qtdErrors(edition)"
                />
              </div>  
            </div>
          <div class="d-flex ga-5 justify-center flex-column">
              <h3 class="ms-10">Configurações</h3>
              <div class="d-flex flex-wrap justify-center align-start ga-5">
                <EditionInputs
                  v-for="edition, i in SelectedArrayItems.slice(3, 6)"
                  :key="i"
                  :placeholder="edition.placeholder"
                  v-model:value="edition.value"
                  :type="edition.type"
                  :label="edition.label"
                  :qtds="edition.qtds"
                  :error="fieldError(edition)"
                  :qtd-errors="qtdErrors(edition)"
                />
              </div> 
            </div>
      </div>
      <div class="d-flex flex-column ga-10 h-75 justify-center align-center" v-else-if="actualstep === 4">
          <h3>insira o banner da edição:</h3>
          <MediaInput @changeImg="changeimg" :img="imgPreview"/>
      </div>
      <div v-else>
        <SuccessStep to="/panel/editions/"/>
      </div>
      <StepsAction :actualstep="actualstep" @PrevStep="PrevStep"
          @NextStep="NextStep" :disabledBtn="selectValidator" v-if="actualstep !== 5"/>
    </VStepperWindow>
    <StepDialog btn_cancel_text="cancelar" btn_confirm_text="confirmar" title="Tem certeza que deseja cadastrar essa edição?" v-model="openDialog" @confirmation="DialogActive"/>
  </VStepper>
</div>
</template>
