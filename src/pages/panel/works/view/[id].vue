<script lang="ts" setup>
// @ts-ignore
import { onMounted, reactive, computed, ref } from "vue";
// @ts-ignore
import { useRouter } from "vue-router";
import { useWork } from "@/stores/work";
import { useAuth } from "@/stores/auth";
import { useEdition } from "@/stores/edition";
import {
  orderByUserId,
  resolveStatus,
  resolveUserFunction,
  userCase,
} from "@/utils/works";
import { useCollaboratorAcceptance } from "@/stores/collaboratorAcceptance";
import { useAdvisorAcceptance } from "@/stores/advisorAcceptance";
import editions from "@/services/editions";

const router = useRouter();
const work_id = (router.currentRoute.value.params as { id: string }).id;
const authStore = useAuth();
const workStore = useWork();
const editionStore = useEdition();
const acceptanceStore = useCollaboratorAcceptance();
const advisorAcceptanceStore = useAdvisorAcceptance()
const date = new Date();

const usersValidation = reactive({
  advisor_able_to_aprove_work: false,
  evaluator_able_to_give_grade: false,
  advisor_able_to_give_grade: false,
  student_able_to_cancel: false,
});

const datesValidation = computed(() => {

  console.log('fim segunda submissao',  editionStore.currentEdition?.final_second_submission_date,
    'fim do orientador', editionStore.currentEdition?.final_second_advisor_date, 'fim do evaluator', editionStore.currentEdition?.final_evaluators_date
  )
  usersValidation.student_able_to_cancel =
    date <
    new Date(
      editionStore.currentEdition?.final_second_submission_date ?? "2100-01-01"
    );

  usersValidation.advisor_able_to_give_grade =
    date <
    new Date(
      editionStore.currentEdition?.final_second_advisor_date ?? "2100-01-01"
    );

  usersValidation.evaluator_able_to_give_grade =
    date <
    new Date(
      editionStore.currentEdition?.final_evaluators_date ?? "2100-01-01"
    );

  usersValidation.advisor_able_to_aprove_work =
    date <
    new Date(
      editionStore.currentEdition?.final_second_submission_date ?? "2100-01-01"
    ) && workStore?.currentWork.advisor_status == 2;

  return usersValidation;
});

const tokenExpired = authStore.isTokenExpired();

const uptadeWorkStatus = computed(() => workStore.currentWork?.status ?? 1);
const isLoaded = ref(false);
onMounted(async () => {
  await workStore.getWork(work_id);
  await editions.getOpenEdition();
  acceptanceStore.setCollaboratorInfo(workStore.currentWork);
  advisorAcceptanceStore.setAdvisorInfo(workStore.currentWork)
  console.log(workStore.currentWork);
   isLoaded.value = true;
});

const aprove = ref(false);
const confirmation = ref(false);

const confirmsAction = (confirm: string) => {
  if (confirm === "Confirmar") {
    if (authStore.user.is_advisor) {
      if (datesValidation.value.advisor_able_to_aprove_work) {
        console.log('realmente chego na view')
        userCase?.function && userCase.function(
          workStore.currentWork?.verification_token, workStore
        )
        aprove.value = false
      }
    } else if (authStore.user.is_evaluator) {
      console.log("evaluator give grade");
    } else {
      if (!tokenExpired) {

        userCase?.function &&
          userCase.function(
            workStore.currentWork?.id,
            workStore,
            authStore.token
          );
        router.push("/panel/works");
      }
    }
  } else if (confirm == "Rejeitar"){
    if (authStore.user.is_advisor) {
      if (datesValidation.value.advisor_able_to_aprove_work) {

        userCase?.function_two && userCase.function_two(
          workStore.currentWork?.verification_token, workStore
        )
        aprove.value = false
      }
      confirmation.value = false
    }
  }  else {
    confirmation.value = false;
  }
};
</script>

<template>
  <LayoutPanel v-if="workStore.currentWork">
    <v-container class="w-100">
       <v-fade-transition appear>
      <div class="d-flex flex-column ga-10">


        <StepDialog
          :btn_cancel_text="'Cancelar'"
          :btn_confirm_text="'Confirmar'"
          :title="'Tens a certeza que deseja cancelar esta proposta?'"
          :description="'Ao cancelar a proposta seu time será excluido e você terá até o tempo final da segunda submissão para submeter outro trabalho.'"
          v-model="confirmation"
          @confirmation="confirmsAction"
        />

        <StepDialog
          :has_backButton="true"
          :btn_cancel_text="'Rejeitar'"
          :btn_confirm_text="'Confirmar'"
          :title="'Deseja aprovar esta proposta?'"
          :description="'Ao aprovar a propsta será possível atribuir nota ao trabalho e aos estudantes.'"
          v-model="aprove"
          @confirmation="confirmsAction"
          @back="aprove = !aprove"
        />
        

        <WorkHeader v-if="isLoaded"
        :key="work_id"
          :work_status="uptadeWorkStatus"
          @buttonAction="[1,2,3].includes(uptadeWorkStatus) && resolveUserFunction(workStore?.currentWork, authStore.user) == 'STUDENT' ? confirmation = !confirmation : uptadeWorkStatus == 2 ? confirmation = !confirmation : aprove = !aprove"
          :student_able_to_cancel="datesValidation.student_able_to_cancel"
          :advisor_able_to_give_grade="datesValidation.advisor_able_to_give_grade"
          :evaluator_able_to_give_grade="datesValidation.evaluator_able_to_give_grade"
          :advisor_able_to_aprove_work="datesValidation.advisor_able_to_aprove_work"
          :user_function="resolveUserFunction(workStore.currentWork, authStore.user)"
          :grade="workStore.currentWork.feedback"
          :status_content="resolveStatus(workStore.currentWork.status)?.text || 'Não informado'"
          :status_color="resolveStatus(workStore.currentWork.status)?.color || 'Não informado'"
          :title="workStore.currentWork.title"
        />

        <div
          class="d-flex flex-column ga-3 flex-wrap w-100"
          style="max-width: 100%; flex-wrap: wrap; word-break: break-all"
        >
          <h2 class="opacity-70" style="font-weight: 700; font-size: 20px">
            Proposta de Integração
          </h2>
          <p style="font-size: 16px">{{ workStore.currentWork.abstract }}</p>
        </div>

        <SubjectsSession
          :ods="workStore.currentWork.ods"
          :subjects="workStore.currentWork.field"
          :cross_cutting_theme="workStore.currentWork.cross_cutting_theme"
        />

        <MembersContainer>
          <MembersCard
            v-for="(student, index) in orderByUserId(
              workStore.currentWork.team.team_members,
              authStore.user.id
            )"
            :member_id="student.id"
            :member="student"
            :user_id="authStore.user.id"
            :key="index"
          />
        </MembersContainer>

        <MembersContainer
          title="Orientador do Trabalho"
          attribute="Status do Aceite/Rejeite"
        >
          <MembersCard
            :status="workStore.currentWork.advisor_status"
            :member="workStore.currentWork.advisor"
            :member_id="workStore.currentWork.advisor.id"
            :user_id="authStore.user.id"
          />
        </MembersContainer>

        <MembersContainer
          title="Colaboradores do Trabalho"
          attribute="Status do Aceite/Rejeite"
        >
          <MembersCard
            v-for="(collaborator, index) in workStore.currentWork.work_collaborator"
            :member="collaborator.collaborator"
            :member_id="collaborator.collaborator.id"
            :status="collaborator.status"
            :user_id="authStore.user.id"
            :key="index"
          />
        </MembersContainer>
        
      </div>

      <acceptance-work
        v-if="acceptanceStore.state.isCollaborator && acceptanceStore.state.collaboratorStatus === 1 && uptadeWorkStatus != 4"
        :work="workStore.currentWork"
      />

      <AcceptanceAdvisorWork v-if="advisorAcceptanceStore.state.isAdvisor && workStore.currentWork.advisor_status === 1 && uptadeWorkStatus == 1 || uptadeWorkStatus == 3"
        :work="workStore.currentWork" />
</v-fade-transition>
    </v-container>
  </LayoutPanel>
  <div v-else class="d-flex align-center justify-center h-100 w-100">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
</template>
