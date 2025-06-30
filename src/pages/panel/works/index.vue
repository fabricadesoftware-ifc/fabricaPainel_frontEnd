<script setup>
import { ref, computed, onMounted } from "vue";
import { useWork } from "@/stores/work";
import router from "@/router";
import { useEdition } from "@/stores/edition";
import { useAuth } from "@/stores/auth";
import { resolveUserFunction } from "@/utils/works";

const workStore = useWork();
const EditionStore = useEdition();
const UserStore = useAuth();

const year = new Date().getFullYear();
const loading = ref(true);
const submissionsCurrent = ref([]);
const submissionsPast = ref([]);

const orderByStatusAndYear = (work, actualYear) => {
  return work
    .filter((s) => actualYear ? s.edition.year === year : s.edition.year !== year)
    .sort((a, b) => {
      if (a.status !== 4) return -1;
      if (b.status === 4) return 1;
      return 0;
    });
};

const loadSubmissions = async () => {
  loading.value = true;
  await workStore.fetchUserWorks(UserStore.user.user_type, UserStore.user.id);
  await EditionStore.fetchCurrentEdition();

  const type = UserStore.user.user_type;

  if (type === "STUDENT") {
    const works = workStore.userWorks;
    submissionsCurrent.value = orderByStatusAndYear(works, true);
    submissionsPast.value = orderByStatusAndYear(works, false);
  } else {
   
    submissionsCurrent.value = {
      advisorWorks: orderByStatusAndYear(workStore.advisorWorks, true),
      collaboratorWorks: orderByStatusAndYear(workStore.collaboratorWorks, true),
      evaluatorWorks: orderByStatusAndYear(workStore.evaluatorWorks, true),
    };

    console.log((workStore.evaluatorWorks))
    submissionsPast.value = {
      advisorWorks: orderByStatusAndYear(workStore.advisorWorks, false),
      collaboratorWorks: orderByStatusAndYear(workStore.collaboratorWorks, false),
      evaluatorWorks: orderByStatusAndYear(workStore.evaluatorWorks, false),
    };
  }

  loading.value = false;
};

const is_submit = computed(() => {
  const works = workStore.userWorks;
  return (
    Array.isArray(works) &&
    works.some((s) => s?.edition?.year === year && s.status != 4)
  );
});

const tokenExpired = UserStore.isTokenExpired();

onMounted(async () => {
  if (!tokenExpired) {
    await loadSubmissions();
  }

  console.log(workStore.evaluatorWorks)
});
</script>

<template>
  <LayoutPanel v-if="!tokenExpired && !loading">
    <v-container class="w-100">
      <div v-if="UserStore.user.user_type == 'STUDENT'" class="d-flex justify-space-between align-center text-h6">
        <h1 class="font-weight-bold" style="font-size: 40px">Submissões</h1>
        <VChip :class="is_submit ? 'bg-green' : 'bg-red'">
          {{
            is_submit ? "trabalho submetido" : "trabalho ainda não submetido"
          }}
        </VChip>
      </div>

      <div class="mb-10">
        <div class="d-flex align-center mt-10 mb-10 ga-5 w-100">
          <h1 class="text-h5 font-weight-bold" style="font-size: 30px">
            {{ EditionStore.currentEdition.edition_name }}
          </h1>
          <VChip
            class="bg-blue d-flex justify-center align-center"
            pill
            style="width: 120px"
            >Em aberto
          </VChip>
        </div>

        <CreateWork
          v-if="!is_submit && UserStore.user.user_type == 'STUDENT'"
          :date="
            new Date() <
            new Date(EditionStore.currentEdition.final_second_submission_date)
          "
        />

        <v-lazy
  :min-height="200"
  :options="{'threshold':0.5}"
  transition="fade-transition"
>
        <CardSubmission
          v-if="UserStore.user.user_type == 'STUDENT'"
          v-for="(work, index) in submissionsCurrent"
          :key="index"
          :work_id="work.id"
          :work="work.edition.final_submission_date"
          :work_status="work.status"
        />

        <TeacherContainer
          v-else
          :works="submissionsCurrent"
          :user_type="UserStore.user.user_type"
        >
          <template #evaluate>
            <CardSubmission
              v-for="(work, index) in submissionsCurrent.evaluatorWorks"
              :key="index"
              :work_id="work.id"
              :work="work.edition.final_submission_date"
              :work_status="work.status"
            />
          </template>

          <template #advise>
            <CardSubmission
              v-for="(work, index) in submissionsCurrent.advisorWorks"
              :key="index"
              :work_id="work.id"
              :work="work.edition.final_submission_date"
              :work_status="work.status"
              :user="UserStore.user"
              :work_data="work"
              
            />
          </template>

          <template #collaborate>
            <CardSubmission
              v-for="(work, index) in submissionsCurrent.collaboratorWorks"
              :key="index"
              :work_id="work.id"
              :work="work.edition.final_submission_date"
              :work_status="work.status"
              :user="UserStore.user"
              :work_data="work"
            />
          </template>
        </TeacherContainer>
        </v-lazy>
      </div>

      <div class="d-flex justify-space-between align-center text-h6 pb-10">
        <h1 class="font-weight-bold" style="font-size: 30px">
          Edições anteriores
        </h1>
      </div>

      <div>
           <v-lazy
  :min-height="200"
  :options="{'threshold':0.5}"
  transition="fade-transition"
>
        <div
          v-if="
            submissionsPast.length > 0 &&
            UserStore.user.user_type == 'STUDENT'
          "
        >
        
     
          <CardSubmission
            v-for="(works, index) in submissionsPast"
            :key="works.id"
            :work="works.edition.final_submission_date"
            :work_id="works.id"
            :work_status="works.status"
            :edition_title="index == 0 ? works.edition.edition_name : ''"
          />
        </div>

        <TeacherContainer
          v-else-if="UserStore.user.user_type != 'STUDENT'"
          :works="submissionsPast"
          :user_type="UserStore.user.user_type"
        >
          <template #evaluate>
            <CardSubmission
              v-for="(work, index) in submissionsPast.evaluatorWorks"
              :key="index"
              :work_id="work.id"
              :work="work.edition.final_submission_date"
              :work_status="work.status"
            />
          </template>

          <template #advise>
            <CardSubmission
              v-for="(work, index) in submissionsPast.advisorWorks"
              :key="index"
              :work_id="work.id"
              :work="work.edition.final_submission_date"
              :work_status="work.status"
            />
          </template>

          <template #collaborate>
            <CardSubmission
              v-for="(work, index) in submissionsPast.collaboratorWorks"
              :key="index"
              :work_id="work.id"
              :work="work.edition.final_submission_date"
              :work_status="work.status"
            />
          </template>
        </TeacherContainer>
</v-lazy>
        <div
          class="pa-5"
          v-if="
            submissionsPast.length <= 0 && UserStore.user.user_type == 'STUDENT'
          "
        >
          <h1 class="text-h6 text-center">
            Você não tem trabalhos submetidos em edições anteriores
          </h1>
        </div>
      </div>
      
    </v-container>
  </LayoutPanel>

  <div v-else class="d-flex align-center justify-center h-100 w-100">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
</template>
