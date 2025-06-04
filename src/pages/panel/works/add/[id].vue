<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useWork } from '@/stores/work';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { orderByUserId, resolveStatus } from '@/utils/works';
const router = useRouter()
const work_id = (router.currentRoute.value.params as { id: string }).id;

const authStore = useAuth()
const workStore = useWork()

onMounted(async()=> {
    await workStore.getWork(work_id)
    console.log(workStore.currentWork)
})


</script>
<template>
     <LayoutPanel>
    <v-container class="w-100" v-if="workStore.currentWork">
        <div class="d-flex flex-column ga-10">
       
            <WorkHeader :grade="workStore.currentWork.feedback" :status_content="resolveStatus(workStore.currentWork.status)?.text" :status_color="resolveStatus(workStore.currentWork.status)?.color" :title="workStore.currentWork.title" />
      

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