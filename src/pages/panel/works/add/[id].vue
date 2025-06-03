<script lang="ts" setup>
import { onMounted } from 'vue';
import { useWork } from '@/stores/work';
const workStore = useWork()

onMounted(async()=> {
    await workStore.fetchUserWorks()
    console.log(workStore.allWorks)
})
</script>
<template>
     <LayoutPanel>
    <v-container class="w-100">
        <div class="d-flex flex-column ga-10">
       
            <WorkHeader />
      

        <div class="d-flex flex-column ga-3">
            <h2 class="opacity-70 " style="font-weight: 700; font-size: 20px;">Proposta de Integração</h2>
            <p style="font-size: 16px;">Este projeto é uma aplicação web desenvolvida para monitorar, em tempo real, a fila do refeitório do campus do IFC Araquari. Utilizando Vue.js no frontend e Django com Django REST Framework no backend, a plataforma permite que usuários acompanhem o tempo estimado de espera e a quantidade de pessoas na fila. Além disso, um painel analítico foi construído com Streamlit para visualização de dados históricos e padrões de uso. O sistema tem como público-alvo estudantes e servidores do campus, auxiliando no melhor planejamento dos horários de refeição.</p>
        </div>

       <SubjectsSession />

        <MembersContainer>
          <MembersCard />
        </MembersContainer>

        <!-- <div>
            <p class="opacity-70 mt-10" style="font-weight: 700; font-size: 20px;">Orientador do Trabalho:</p>
            
        </div>

        <div>
            <p class="opacity-70 mt-10" style="font-weight: 700; font-size: 20px;">Colaborador do Trabalho:</p>
            
        </div> -->
        </div> 
    </v-container>
    </LayoutPanel>
</template>