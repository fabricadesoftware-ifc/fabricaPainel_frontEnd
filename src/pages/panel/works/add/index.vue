<script setup>
import { ref } from 'vue'
import { useWork } from '@/stores/work'
import { useEdition } from '@/stores/edition'
import { useAuth } from '@/stores/auth'
import { steps, resetSteps } from '@/utils/steps/works'
import { useDisplay } from 'vuetify'
import router from '@/router'
const workStore = useWork()
const editionStore = useEdition()
const AuthStore = useAuth()
const actualstep = ref(0)
const openNav = ref(false)
const {width} = useDisplay()
const open_dialog = ref(false)
const useractualstep = Number(localStorage.getItem('actualstep'))

const ReturnValidatedtoDisabledBtn = computed(() => {
  if (actualstep.value === 0) {
    return workStore.WorkStorage.team?.length < (editionStore.currentEdition?.members_min || 3)
  }
  if(actualstep.value === 1){
    const fieldOk = (workStore.WorkStorage.field || []).length >= (editionStore.currentEdition?.subjects_min || 3)
    const themeOk = Object.keys(workStore.WorkStorage.cross_cutting_theme || {}).length > 0

    return !(fieldOk && themeOk)
  }
  if (actualstep.value === 2) {
    return workStore.WorkStorage.advisor?.length === 0
  }
  if (actualstep.value === 3) {
    return workStore.WorkStorage.collaborators?.length === 0
  }
  return false
})

async function DialogActive(type) {

  if (type == 'Sim') {
    workStore.WorkStorage.integrated_project = true
 
  } else if (type == 'Não') {
    workStore.WorkStorage.integrated_project = false
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
  // localStorage.setItem('actualstep', actualstep.value)
}

const StepObj = computed(() => {
  return steps.value[actualstep.value]
})

function PrevStep() {
  if (actualstep.value <= 0) return 
  
  if (actualstep.value < 4) {
    steps.value[actualstep.value].is_actual = false

    steps.value[actualstep.value].complete = false
    }
    actualstep.value--

    steps.value[actualstep.value].is_actual = true
  

  
}

onUnmounted(()=> {
  workStore.WorkStorage.team = []
  localStorage.removeItem('actualstep')
  resetSteps()

})

onMounted( async () => {
  // Primeiro, verificar se precisa abrir o dialog baseado no localStorage
  // antes de modificar o actualstep
  const shouldShowIntegratedProjectDialog = useractualstep === 0

  // Verificar se o usuário já tem uma equipe e pular para o próximo step
  // if (AuthStore.user.team && AuthStore.user.team.length > 0 && actualstep.value === 0) {
  //   // Marcar o step 0 como completo e ir para o step 1
  //   steps.value[0].complete = true
  //   steps.value[0].is_actual = false
  //   steps.value[1].is_actual = true
  //   actualstep.value = 1
  //   localStorage.setItem('actualstep', '1')
  // }

  // Só mostrar o dialog se for primeira vez (useractualstep === 0) E não tiver equipe existente
  // ou se for o step final (useractualstep === 6)
  if ((shouldShowIntegratedProjectDialog && actualstep.value === 0) || useractualstep === 6) {
    open_dialog.value = true
  }

  // Restaurar progresso do usuário se existir
  if (useractualstep && useractualstep > 0) {
    for (let i = 0; i < useractualstep; i++) {
      steps.value[i].complete = true
    }
    actualstep.value = useractualstep
  }

  //@ts-ignore
  // const newTeam = {
  //           team_members: workStore.WorkStorage.team.map((member: any) => member.id),
  //           sender_id: (AuthStore.user as any).id,
  //           edition: editionStore.currentEdition?.id,
  //         }
})
</script>
<template>
  <div style="height: 100vh; position: relative;">
    <VStepper v-model="actualstep" class="d-flex h-100 ">
      <StepbyStepHeader :steps="steps" :actualstep="actualstep"  v-if="width > 950"/>
      <VStepperWindow class="w-100 h-100">
        <StepsHeader :user="AuthStore.user" :step_num="StepObj?.value" :step_completed="StepObj?.complete" :step_value="StepObj?.title" @openNav="openNav = !openNav"/>
          <div v-if="actualstep != 6" class="w-100 d-flex justify-center align-center overflow-y-auto" style="height: 80%;">
            <div  :style="{width: width < 950 ? '100%' : '75%'}" class="d-flex justify-center align-center h-100">
              <StepOne :me="AuthStore.user" :team="workStore?.team" :isproject_integrated="workStore?.WorkStorage?.integrated_project" v-if="actualstep === 0" />
              <StepTwo v-if="actualstep === 1" />
              <StepThree v-if="actualstep === 2" />
              <StepFour v-if="actualstep === 3" />
              <StepFive v-if="actualstep === 4" />
              <FinalStep :form_work="workStore.WorkStorage" v-if="actualstep === 5"
            @submitPropose="open_dialog = !open_dialog" />
            </div>
          </div>  
          <SuccessStep v-if="actualstep === 6" to="/panel/works/"/>
        <StepsAction :actualstep="actualstep" :disabledBtn="ReturnValidatedtoDisabledBtn" @PrevStep="PrevStep"
          @NextStep="NextStep" v-if="actualstep !== 6" />
      </VStepperWindow>
    </VStepper>
    <StepDialog 
      :btn_cancel_text="actualstep === 0 ? 'Não' : 'Cancelar'"
      :btn_confirm_text="actualstep === 0 ? 'Sim' : 'Confirmar'"
      :title="actualstep === 0 ? 'Este trabalho origina de um projeto integrador?' : 'AVISO ⚠️'"
      :description="actualstep === 0 ? 'Se caso o trabalho originar de um projeto integrador, será permitido adicionar somente pessoas da mesma turma na proposta. Caso contrário, será permitido alunos de turmas e cursos divergentes' : 'Após submeter o trabalho um email será enviado para os colaboradores e para o orientador do seu projeto'"
      v-model="open_dialog"
      @confirmation="DialogActive"
    />
    <VNavigationDrawer v-model="openNav" location="right">
        <router-link to="/">
        <div class="d-flex justify-center align-center ga-3 pa-5" >
          <img src="../../../../assets/logotipo_painel_integracao.png" width="50">
          <h1>Painel</h1>
        </div>
        </router-link>
        <VDivider></VDivider>
        <VList>
            <VListItem prepend-icon="mdi-information">
                precisa de ajuda?
            </VListItem>
            <VListItem prepend-icon="mdi-account">
               <VListItemTitle>{{ AuthStore.user.name }}</VListItemTitle>
            </VListItem>
        </VList>
    </VNavigationDrawer>
  </div>
</template>
