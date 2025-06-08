<script setup>
import { ref } from 'vue'
import { CardUser, StepDialog, StepFive, StepFour, StepThree, StepTwo, StepsAction, StepbyStepHeader, StepOne, StepsHeader } from '@/components/index'
import { useAuth } from '@/stores/auth'
import { useWork } from '@/stores/work'
import { steps } from '@/utils/steps'
const AuthStore = useAuth()
const workStore = useWork()
const actualstep = ref(0)
const open_dialog = ref(false)

const ReturnValidatedtoDisabledBtn = computed(() => {
  if (actualstep.value === 0) {
    return workStore.WorkStorage.team?.length < 3
  }
  if (actualstep.value === 1) {
    return workStore.WorkStorage.field?.length < 3 && !workStore.WorkStorage.cross_cutting_theme
  }
  if (actualstep.value === 2) {
    return workStore.WorkStorage.advisor?.length === 0
  }
  if (actualstep.value === 3) {
    return workStore.WorkStorage.co_advisor?.length === 0
  }
  return false
})

async function DialogActive(type) {
  if (type == 'Sim') {
    workStore.WorkStorage.integrated_project = true
    console.log(workStore.work)
  }
  else if (type == 'Confirmar') {
    await workStore.sendWork()
    NextStep()
  }
  open_dialog.value = !open_dialog
}

function NextStep() {
  if (actualstep.value <= 3) {
    steps.value[actualstep.value].complete = true
    steps.value[actualstep.value].is_actual = false
    steps.value[actualstep.value + 1].is_actual = true
  }
  else if (actualstep.value === 4) {
    steps.value[actualstep.value].complete = true
    steps.value[actualstep.value].is_actual = false
  }
  actualstep.value++
  localStorage.setItem('actualstep', actualstep.value)
}

function PrevStep() {
  if(actualstep.value === 5){
    steps.value[actualstep.value - 1].is_actual = true
  }
  else{
    steps.value[actualstep.value].is_actual = false
    steps.value[actualstep.value - 1].is_actual = true
  }
  actualstep.value--
  localStorage.setItem('actualstep', actualstep.value)
}

onMounted(() => {
  const useractualstep = Number(localStorage.getItem('actualstep'))
  if (actualstep.value === 0) {
    open_dialog.value = true
  }
  if (useractualstep) {
    for (let i = 0; i < useractualstep; i++) {
      steps.value[i].complete = true
    }
    actualstep.value = useractualstep
  }
  AuthStore.GetMe()
  console.log(actualstep.value)
})
</script>
<template>
  <div style="height: 100vh;">
    <VStepper v-model="actualstep" mobile class="d-flex h-100">
      <StepbyStepHeader :steps="steps" :actualstep="actualstep" />
      <VStepperWindow class="w-100 h-100">
        <StepsHeader :user="AuthStore.user" />
        <VContainer class="d-flex justify-center flex-column align-center h-100">
          <StepOne :me="AuthStore?.user" :team="workStore?.team"  v-if="actualstep === 0" />
          <StepTwo v-if="actualstep === 1" />
          <StepThree v-if="actualstep === 2" />
          <StepFour v-if="actualstep === 3" />
          <StepFive v-if="actualstep === 4" />
          <FinalStep :form_work="workStore.WorkStorage" v-if="actualstep === 5"
            @submitPropose="open_dialog = !open_dialog" />
          <SuccessStep v-if="actualstep === 6" />
        </VContainer>
        <StepsAction :actualstep="actualstep" :disabledBtn="ReturnValidatedtoDisabledBtn" @PrevStep="PrevStep"
          @NextStep="NextStep" v-if="actualstep !== 6" />
      </VStepperWindow>
    </VStepper>
    <StepDialog :btn_cancel_text="actualstep === 0 ? 'Não' : 'Cancelar'"
      :btn_confirm_text="actualstep === 0 ? 'Sim' : 'Confirmar'"
      :title="actualstep === 0 ? 'Este trabalho origina de um projeto integrador?' : 'AVISO ⚠️'"
      :description="actualstep === 0 ? '<p>Se caso o trabalho originar de um projeto integrador, será permitido adicionar somente pessoas da mesma turma na proposta. Caso contrário, será permitido alunos de turmas e cursos divergentes</p>.' : '<p>Após submeter o trabalho um email será enviado para os <b>colaboradores</b> e para o <b>orientador</b> do seu projeto</p>'"
      v-model="open_dialog" @confirmation="DialogActive" />
  </div>
</template>