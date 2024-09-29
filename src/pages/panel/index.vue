<script lang="ts" setup>
  import { useAuth } from '@/stores/auth'
  import { useEdition } from '@/stores/edition'
  import { useWork } from '@/stores/work'

  const workStore = useWork()
  const editionStore = useEdition()
  const authStore = useAuth()
  const title = ref('')

  onMounted(() => {
    workStore.fetchWorks()
    editionStore.fetchCurrentEdition()
    authStore.getUserInfo()
    title.value = authStore.user.user_type === 'STUDENT' ? 'Status do meu Trabalho' : 'Registros de Submissões'
  })
</script>

<template>
  <LayoutPanel>
    <v-container class="pt-0 mt-0">
      <InformativeAlert
        v-if="authStore.isOpenForRegister"
        button="Registrar-se nos temas transversais"
        color="info"
        description="Está no periodo de registro de avaliadores, por favor, registre os avaliadores nos trabalhos recebidos. (Clique no botão ao lado)"
        :title="editionStore.teacherStudent"
        to="/panel/registration-of-topics"
      />
      <InformativeAlert
        v-if="authStore.isOpenForWork"
        button="Enviar um trabalho"
        color="error"
        :description="editionStore.alertStudent"
        title="Você ainda não tem trabalhos submetidos!"
        to="/panel/work-submission"
      />
      <v-row>
        <v-col>
          <v-sheet class="ml-auto mr-0 mt-0" min-height="65vh" rounded="xl">
            <div class="h-100 d-flex flex-column justify-space-between px-4">
              <EditionDatas />
              <PaperAcceptanceTable :title="title" :works="workStore.allWorks" />
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </LayoutPanel>
</template>
