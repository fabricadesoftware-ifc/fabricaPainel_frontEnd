
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useWork } from '@/stores/work';
import { useAuth } from '@/stores/auth';
import { useEdition } from '@/stores/edition';
import { useRouter } from 'vue-router';
import { orderByUserId, resolveStatus, resolveUserFunction, userCase } from '@/utils/works';
import editions from '@/services/editions';
const router = useRouter()
const work_id = (router.currentRoute.value.params as { id: string }).id;
const authStore = useAuth()
const workStore = useWork()
const editionStore = useEdition()
const date = new Date()

const datesValidation = reactive({
    student_able_to_canel: (date < new Date(editionStore.currentEdition?.final_second_submission_date ?? '2100-01-01')),
    advisor_able_to_give_grade: (date < new Date(editionStore.currentEdition?.final_second_advisor_date ?? '2100-01-01')),
    evaluator_able_to_give_grade: (date < new Date(editionStore.currentEdition?.final_evaluators_date ?? '2100-01-01'))
})

const tokenExpired = authStore.isTokenExpired()

onMounted(async()=> {
    await workStore.getWork(work_id)
    await editions.getOpenEdition()

    console.log(workStore.currentWork)
})

//
const confirmation = ref(false)
const confirmsAction = (confirm:String) => {
    if (confirm == 'Confirmar') {
    if (authStore.user.is_advisor) {
        console.log('advisor give grade')
    } else if (authStore.user.is_evaluator) {
        console.log('evaluator give grade')
    } else {
      
        
        if (!tokenExpired) {
       userCase?.function && userCase.function(workStore.currentWork?.id, workStore, authStore.token)
       router.push('/panel/works')
        }
    }
    } else {
        confirmation.value = false
    }
}
</script>
<template>
      
     <LayoutPanel v-if="workStore.currentWork">
    <v-container class="w-100" >
        <div class="d-flex flex-column ga-10">
        <StepDialog :btn_cancel_text="'Cancelar'"
      :btn_confirm_text="'Confirmar'"
      :title="'Tens a certeza que deseja cancelar esta proposta?'"
      :description="'Ao cancelar a proposta seu time será excluido e você terá até o tempo final da segunda submissão para submeter outro trabalho.'"

      v-model="confirmation" @confirmation="confirmsAction" />

            <WorkHeader @buttonAction="confirmation = !confirmation" :student_able_to_cancel="datesValidation.student_able_to_canel" :advisor_able_to_give_grade="datesValidation.advisor_able_to_give_grade" :evaluator_able_to_give_grade="datesValidation.evaluator_able_to_give_grade" :user_function="resolveUserFunction(workStore.currentWork, authStore.user)" :grade="workStore.currentWork.feedback" :status_content="resolveStatus(workStore.currentWork.status)?.text" :status_color="resolveStatus(workStore.currentWork.status)?.color" :title="workStore.currentWork.title" />
      

        <div class="d-flex flex-column ga-3 flex-wrap w-100" style="max-width: 100%; flex-wrap: wrap; word-break: break-all;">
            <h2 class="opacity-70 " style="font-weight: 700; font-size: 20px;">Proposta de Integração</h2>
            <p style="font-size: 16px;">{{ workStore.currentWork.abstract }}</p>
        </div>

       <SubjectsSession :ods="workStore.currentWork.ods" :subjects="workStore.currentWork.field" :cross_cutting_theme="workStore.currentWork.cross_cutting_theme" />

        <MembersContainer>
          <MembersCard v-for="(student, index) in orderByUserId(workStore.currentWork.team.team_members, authStore.user.id)" :member_id="student.id" :member="student" :user_id="authStore.user.id" :key="index" />
        </MembersContainer>

        <MembersContainer title="Orientador do Trabalho"  attribute="Status do Aceite/Rejeite">
          <MembersCard :status="workStore.currentWork.advisor_status" :member="workStore.currentWork.advisor" :member_id="workStore.currentWork.advisor.id" :user_id="authStore.user.id" />
        </MembersContainer>

        <MembersContainer title="Colaboradores do Trabalho" attribute="Status do Aceite/Rejeite">
          <MembersCard v-for="(collaborator, index) in workStore.currentWork.work_collaborator" :member="collaborator.collaborator" :member_id="collaborator.collaborator.id" :status="collaborator.status" :user_id="authStore.user.id" :key="index" />
        </MembersContainer>

        </div> 
    </v-container>
   
    </LayoutPanel>
     <div v-else class="d-flex align-center justify-center h-100 w-100">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
</template>