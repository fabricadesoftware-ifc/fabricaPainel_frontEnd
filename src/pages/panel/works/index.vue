<script setup>
import { useWork } from '@/stores/work';
import router from '@/router';


import { useEdition } from '@/stores/edition';
import { useAuth } from '@/stores/auth';

const workStore = useWork()
const EditionStore = useEdition()
const UserStore = useAuth()

const year = new Date().getFullYear()

const SubmissionVerify = computed(() => {
  const work = workStore.userWorks[0]
  if (!work || !work.edition) return null;

  if (work.edition.year === year) {
    return {
      work: work.edition.final_submission_date,
      status: work.status,
      id: work.id
    }
  }
  return null;
})

const verifySubmitWork = computed(() => {
  const works = workStore.userWorks
  if (works.length === 0) return []

  if (works[0]?.edition?.year !== year) {
    return works
  } else {
    return works.slice(1)
  }
})

const is_submit = computed(() => {
  return workStore.userWorks[0]?.edition?.year === year
})

onMounted(async () => {
  await workStore.fetchUserWorks()
  await EditionStore.fetchCurrentEdition()

})
</script>

<template>
  <LayoutPanel>
    <v-container class="w-100">
      <div class="d-flex justify-space-between align-center text-h6">
        <h1 class="font-weight-bold" style="font-size: 40px;">Submissões</h1>
        <VChip :class="is_submit ? 'bg-green' : 'bg-red'">
          {{ is_submit ? 'trabalho submetido' : 'trabalho ainda não submetido' }}
        </VChip>
      </div>

      <div class="d-flex pa-10 flex-column w-100 justify-space-between align-center">
        <CardSubmission
          v-if="SubmissionVerify"
          :actual_title="EditionStore.currentEdition.theme"
          :work_id="SubmissionVerify.id"
          :work="SubmissionVerify.work"
          :work_status="SubmissionVerify.status"
        />
      </div>

      <div class="d-flex justify-space-between align-center text-h6">
        <h1 class="font-weight-bold" style="font-size: 30px;">Edições anteriores</h1>
      </div>

      <div>
        <div v-if="verifySubmitWork.length > 0">
          <CardSubmission
            v-for="works in verifySubmitWork"
            :key="works.id"
            :work="works.edition.final_submission_date"
            :work_status="2"
            :edition_title="works.edition.theme"
          />
        </div>
        <div class="pa-5" v-else>
          <h1 class="text-h6 text-center">Você não tem trabalhos submetidos em edições anteriores</h1>
        </div>
      </div>
    </v-container>
  </LayoutPanel>
</template>
