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
  const works = workStore.userWorks
  if (!works) return null
  else {
    return works.filter((s)=> s.edition.year == year).sort((a, b) => {
    if (a.status != 4) return -1
    if (b.id === 4) return 1
    return 0
  })
  }
})

const verifySubmitWork = computed(() => {
  const works = workStore.userWorks
  if (!Array.isArray(works) || works.length === 0) return []
  if (works.length === 0) return []

  return works.filter((s) => s.edition.year !== year )

 
})

const is_submit = computed(() => {
  const works = workStore.userWorks
  return Array.isArray(works) && works.some((s)=> s?.edition?.year === year && s.status != 4)
})

onMounted(async () => {
 await workStore.fetchUserWorks(UserStore.user.user_type, UserStore.user.id)
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

      <div>
        <div class="d-flex align-center mt-10 mb-10  ga-5 w-100">
                <h1 class="text-h5 font-weight-bold" style="font-size: 30px;">{{ EditionStore.currentEdition.edition_name }}</h1>
                        <VChip class="bg-blue d-flex justify-center align-center" pill style="width: 120px;">Em aberto
                </VChip>
        </div>
        <CardSubmission v-for="(work, index) in SubmissionVerify" :key="index" 
          v-if="SubmissionVerify"
          :work_id="work.id"
          :work="work.edition.final_submission_date"
          :work_status="work.status"
        />
      </div>

      <div class="d-flex justify-space-between align-center text-h6">
        <h1 class="font-weight-bold" style="font-size: 30px;">Edições anteriores</h1>
      </div>

      <div>
        <div v-if="verifySubmitWork.length > 0">
          <CardSubmission
            v-for="(works, index) in verifySubmitWork"
            :key="works.id"
            :work="works.edition.final_submission_date"
            :work_status="2"
            :edition_title="index == 0 ? works.edition.edition_name : ''"
          />
        </div>
        <div class="pa-5" v-else>
          <h1 class="text-h6 text-center">Você não tem trabalhos submetidos em edições anteriores</h1>
        </div>
      </div>
    </v-container>
  </LayoutPanel>
</template>