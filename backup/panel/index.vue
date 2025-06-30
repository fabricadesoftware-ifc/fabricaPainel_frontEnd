<script  setup>
  import { useWork } from '@/stores/work';
  import router from '@/router';
  import { ref } from 'vue';
  import CardSubmission from '@/components/steps/panel/CardSubmission.vue';
  import { useEdition } from '@/stores/edition';
  const workStore = useWork()
  const EditionStore = useEdition()

  const year = new Date().getFullYear()

  const SubmissionVerify = computed(() => {
    if(workStore.userWorks[0]?.edition?.year === year ){
      return {
        work: workStore.userWorks[0].edition.final_submission_date,
        status: workStore.userWorks[0].status
      }
    }
    return ''
  })

  const verifySubmitWork = computed(() => {
    if(workStore.userWorks[0]?.edition?.year !== year && workStore.userWorks.length > 0){
      return workStore.userWorks
    }
    else if (workStore.userWorks[0]?.edition?.year === year && workStore.userWorks.length > 0){
      return workStore.userWorks.slice(1)
    }
    return []
  })

  const is_submit = computed(() => {
      if(workStore.userWorks[0]?.edition?.year === year ){
        return true
      }
      return false
  })

  onMounted( async () => {
    await workStore.fetchUserWorks()
    await EditionStore.fetchCurrentEdition()
   
  })
</script>
<template>
  <LayoutPanel>
    <v-container class="w-100">
      <div class="d-flex justify-space-between align-center text-h6">
        <h1 class="font-weight-bold" style="font-size: 40px;">Submissões</h1>
        <VChip :class="is_submit ? 'bg-green' : 'bg-red'">{{ is_submit ? 'trabalho submetido' : 'trabalho ainda não submetido' }}</VChip>
      </div>
      <div class="d-flex pa-10 flex-column w-100 justify-space-between align-center">
        <CardSubmission :actual_title="EditionStore?.currentEdition?.theme" :work="SubmissionVerify?.work" :work_status="SubmissionVerify?.status"/>
      </div>
      <div class="d-flex justify-space-between align-center text-h6">
        <h1 class="font-weight-bold" style="font-size: 30px;">Edições anteriores</h1>
      </div>
      <div >
        <div v-if="verifySubmitWork.length > 0">
          <CardSubmission v-for="works in verifySubmitWork" :key="works.id" :work="works.edition.final_submission_date" :work_status="2" :actual_title="works.edition.theme"/>
        </div>
        <div class="pa-5" v-else>
            <h1 class="text-h6 text-center">Você não tem trabalhos submetidos em edições anteriores</h1>
        </div>
      </div>
    </v-container>
  </LayoutPanel>
</template>
