<script lang="ts" setup>
import { onMounted, reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useWork } from "@/stores/work";
import { useAuth } from "@/stores/auth";
import { useEdition } from "@/stores/edition";
import { useCollaboratorAcceptance } from "@/stores/collaboratorAcceptance";
import { useAdvisorAcceptance } from "@/stores/advisorAcceptance";
import { useAssessmentStore } from "@/stores/assessment";
import { useStudentAssessment } from "@/stores/studentAssessment";
import editions from "@/services/editions";

import { buildUserValidations} from "@/utils/work_view/validations";

import { handleWorkHeaderActionFn, confirmsActionFn } from "@/utils/work_view/workHeaderAction";

import {
  giveWorkGradeFn } from "@/utils/work_view/grades";

import { resolveStatus, resolveUserFunction, orderByUserId, userCase } from "@/utils/works";
import { useDisplay } from "vuetify";

const router = useRouter();
const work_id = (router.currentRoute.value.params as { id: string }).id;
const {width} = useDisplay()

const authStore = useAuth();
const workStore = useWork();
const editionStore = useEdition();
const acceptanceStore = useCollaboratorAcceptance();
const advisorAcceptanceStore = useAdvisorAcceptance();
const assesmentStore = useAssessmentStore();
const studentAssesment = useStudentAssessment();

const date = new Date();
const assesmentWork = ref(null)

const usersValidation = reactive(
  buildUserValidations(date, editionStore, workStore)
);

const tokenExpired = authStore.isTokenExpired();
const uptadeWorkStatus = computed(() => workStore.currentWork?.status ?? 1);
const isLoaded = ref(false);

onMounted(async () => {
  await workStore.getWork(work_id);
  await editions.getOpenEdition();
  await assesmentStore.getAssessmentsByWork(workStore?.currentWork?.id)
  assesmentWork.value = assesmentStore.currentAssessment[0]?.grade
  acceptanceStore.setCollaboratorInfo(workStore?.currentWork);
  advisorAcceptanceStore.setAdvisorInfo(workStore?.currentWork);
  isLoaded.value = true;
});

const aprove = ref(false);
const workGrade = ref(false);
const confirmation = ref(false);
const userGrade = ref(false)
const memberGrade = ref<any>(null)

const confirmsAction = (confirm: string) => {
  confirmsActionFn(
    confirm,
    authStore,
    usersValidation,
    workStore,
    userCase,
    tokenExpired,
    router,
    {
      confirmation: () => (confirmation.value = false),
      aprove: () => (aprove.value = false),
    }
  );
};

interface Grade {
  work_grade: number;
  is_work_grade: boolean;
}

const giveWorkGrade = async (grade: Grade) => {
  await giveWorkGradeFn(
    grade.work_grade,
    workStore,
    authStore,
    date,
    work_id,
    assesmentStore,
    studentAssesment,
    memberGrade.value,
    grade.is_work_grade,

    () => (grade.is_work_grade ? workGrade.value = false : userGrade.value = false)
  );

  if (grade.is_work_grade) {
   await assesmentStore.getAssessmentsByWork(workStore?.currentWork?.id)
   assesmentWork.value = assesmentStore.currentAssessment[0].grade
  } else {
    await studentAssesment.fetchAssessment(memberGrade.value.name, workStore?.currentWork?.id)
  }
};

const handleWorkHeaderAction = () => {
  handleWorkHeaderActionFn(workStore, authStore, uptadeWorkStatus.value, {
    confirmation: () => (confirmation.value = !confirmation.value),
    workGrade: () => (workGrade.value = !workGrade.value),
    aprove: () => (aprove.value = !aprove.value),
  });

 
};

 const openUserGrade = (member: object) => {
    userGrade.value = !userGrade.value
    memberGrade.value = member
  }
</script>

<template>
  <LayoutPanel v-if="workStore.currentWork && isLoaded">
    <v-container class="w-100">
      <v-fade-transition appear>
        <div class="d-flex flex-column ga-10">
          <WorkGrade @giveGrade="giveWorkGrade" @close="workGrade = !workGrade" v-model="workGrade" />

          <IndividualGrade :user="memberGrade" @giveGrade="giveWorkGrade" @close="userGrade = !userGrade" v-model="userGrade" />

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

          <WorkHeader
            v-if="isLoaded"
            :key="work_id"
            :work_status="uptadeWorkStatus"
            @buttonAction="handleWorkHeaderAction"
            :student_able_to_cancel="usersValidation.student_able_to_cancel"
            :advisor_able_to_give_grade="usersValidation.advisor_able_to_give_grade"
            :evaluator_able_to_give_grade="usersValidation.evaluator_able_to_give_grade"
            :advisor_able_to_aprove_work="usersValidation.advisor_able_to_aprove_work"
            :user_function="resolveUserFunction(workStore.currentWork, authStore.user)"
            :grade="assesmentWork"
            :status_content="resolveStatus(workStore.currentWork.status)?.text || 'Não informado'"
            :status_color="resolveStatus(workStore.currentWork.status)?.color || 'Não informado'"
            :title="workStore.currentWork.title"
          />
          

          <div
            class="d-flex flex-column ga-3 flex-wrap w-100"
            style="max-width: 100%; flex-wrap: wrap; word-break: break-all"
          >
            <h2 class="opacity-70" :style="{fontWeight: '700', fontSize: width > 780 ? '20px' : '15px'}">
              Proposta de Integração
            </h2>
            <p :style="{fontSize: width > 780 ? '16px': '12px'}">{{ workStore.currentWork.abstract }}</p>
          </div>

          <SubjectsSession
            :ods="workStore.currentWork.ods"
            :subjects="workStore.currentWork.field"
            :cross_cutting_theme="workStore.currentWork.cross_cutting_theme"
          />

          <MembersContainer :attribute="width <= 780 ? '' : ['ADVISOR'].includes(resolveUserFunction(workStore?.currentWork, authStore?.user)) && assesmentStore?.currentAssessment[0]?.grade ? 'Nota Individual' : ['STUDENT'].includes(resolveUserFunction(workStore?.currentWork, authStore?.user)) ? 'Nota Individual' : ''">
            <MembersCard
              v-for="(student, index) in orderByUserId(workStore.currentWork.team.team_members, authStore.user.id)"
              :member_id="student.id"
              :member="student"
              :user_id="authStore.user.id"
              :key="index"
              :work_advisor="workStore?.currentWork?.advisor ?? null"
              :is_student="true"
              @open-student-assesment="openUserGrade(student)"
            />
          </MembersContainer>

          <MembersContainer
            title="Orientador do Trabalho"
            :attribute="width > 780 ? 'Status do Aceite/Rejeite' : ''"
          >
            <MembersCard
              :status="workStore?.currentWork?.advisor_status"

              :member="workStore.currentWork.advisor"
              :member_id="workStore.currentWork.advisor.id"
              :user_id="authStore.user.id"
              :work_advisor="workStore?.currentWork?.advisor ?? null"
            />
          </MembersContainer>

          <MembersContainer
            title="Colaboradores do Trabalho"
            :attribute="width > 780 ? 'Status do Aceite/Rejeite' : ''"
          >
            <MembersCard
              v-for="(collaborator, index) in workStore.currentWork.work_collaborator"
              :member="collaborator.collaborator"
              :member_id="collaborator.collaborator.id"
              :status="collaborator.status"
              :user_id="authStore.user.id"
              :work_advisor="workStore?.currentWork?.advisor ?? null"
              :key="index"
            />
          </MembersContainer>
        </div>
      </v-fade-transition>

      <acceptance-work
        v-if="
          acceptanceStore.state.isCollaborator &&
          acceptanceStore.state.collaboratorStatus === 1 &&
          uptadeWorkStatus != 4
        "
        :work="workStore.currentWork"
      />

      <AcceptanceAdvisorWork
        v-if="
          advisorAcceptanceStore.state.isAdvisor &&
          (workStore?.currentWork?.advisor_status === 1 && uptadeWorkStatus == 1 || uptadeWorkStatus == 3)

        "
        :work="workStore?.currentWork"
      />
      
    </v-container>
  </LayoutPanel>

  <div v-else class="d-flex align-center justify-center h-100 w-100">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
</template>