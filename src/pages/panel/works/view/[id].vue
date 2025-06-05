
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

onMounted(async()=> {
    await workStore.getWork(work_id)
    await editions.getOpenEdition()
})

</script>
<template>
     <LayoutPanel>
    <v-container class="w-100" v-if="workStore.currentWork">
        <div class="d-flex flex-column ga-10">
       
            <WorkHeader @buttonAction="userCase?.function && userCase.function(workStore.currentWork?.id, workStore, authStore.refresh)" :student_able_to_cancel="datesValidation.student_able_to_canel" :advisor_able_to_give_grade="datesValidation.advisor_able_to_give_grade" :evaluator_able_to_give_grade="datesValidation.evaluator_able_to_give_grade" :user_function="resolveUserFunction(authStore.user?.is_advisor, authStore.user?.is_evaluator, authStore.user?.is_collaborator)" :grade="workStore.currentWork.feedback" :status_content="resolveStatus(workStore.currentWork.status)?.text" :status_color="resolveStatus(workStore.currentWork.status)?.color" :title="workStore.currentWork.title" />
      

        <div class="d-flex flex-column ga-3">
            <h2 class="opacity-70 " style="font-weight: 700; font-size: 20px;">Proposta de Integração</h2>
            <p style="font-size: 16px;">{{ workStore.currentWork.abstract }}</p>
        </div>

       <SubjectsSession :subjects="workStore.currentWork.field" :cross_cutting_theme="workStore.currentWork.cross_cutting_theme" />

        <MembersContainer>
          <MembersCard v-for="(student, index) in orderByUserId(workStore.currentWork.team.team_members, authStore.user.id)" :member="student" :user_id="authStore.user.id" :key="index" />
        </MembersContainer>

        <MembersContainer title="Orientador do Trabalho" attribute="Status do Aceite/Rejeite">
          <MembersCard :member="workStore.currentWork.advisor" />
        </MembersContainer>

        </div> 
    </v-container>
    <v-container v-else>
        <p>Carregando Submissão de Proposta</p>
    </v-container>
    </LayoutPanel>
</template>