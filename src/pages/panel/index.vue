<script lang="ts" setup>
  import { IWork } from '@/interfaces/paper'

  const edition = {
    year: 2024,
    theme: 'Technology and Innovation',
    edition_name: 'Tech Innovators',
    initial_submission_date: '2024-01-15',
    final_submission_date: '2024-03-01',
    initial_advisor_date: '2024-03-05',
    final_advisor_date: '2024-04-15',
    initial_evaluators_date: '2024-04-20',
    final_evaluators_date: '2024-05-10',
    initial_registration_theme_date: '2024-01-15',
    final_registration_theme_date: '2024-02-15',
    initial_registration_evaluators_date: '2024-02-20',
    final_registration_evaluators_date: '2024-03-10',
    workload: 120,
    banner: null,
    logo: null,
  }
  const user = {
    role: 2,
  }

  const works = ref<IWork[]>([])
  const title = ref('')

  const getDatas = () => {
    works.value = [{
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'TRABALHO 1',
      abstract: 'RESUMO DO TRABALHO 1',
      edition: 0,
      field: [
        0,
      ],
      evaluator: [
        0,
      ],
      cross_cutting_theme: 0,
      initial_submission_work_date: '2024-09-28T01:33:06.548Z',
      final_submission_work_date: '2024-09-28T01:33:06.548Z',
      verification_token: 'string',
      team: 0,
      ods: [
        0,
      ],
      reject_submission_work_date: '2024-09-28T01:33:06.548Z',
      status: 0,
    }]
    title.value = user.role === 2 ? 'Status do meu Trabalho' : 'Registros de Submissões'
  }

  onMounted(() => {
    getDatas()
  })
</script>

<template>
  <LayoutPanel>
    <v-container class="pt-0 mt-0">
      <InformativeAlert
        button="Registrar-se nos temas transversais"
        color="info"
        description="Está no periodo de registro de avaliadores, por favor, registre os avaliadores nos trabalhos recebidos. (Clique no botão ao lado)"
        title="Registro de Avaliadores (17/10/2024 - 30/10/2024)"
        to="/panel/registration-of-topics"
      />
      <InformativeAlert
        button="Enviar um trabalho"
        color="error"
        :description="'A data de submissão é de '+edition.initial_submission_date+' até '+edition.final_submission_date"
        title="Você ainda não tem trabalhos submetidos!"
        to="/panel/work-submission"
      />
      <v-row>
        <v-col>
          <v-sheet class="ml-auto mr-0 mt-0" min-height="65vh" rounded="xl">
            <div class="h-100 d-flex flex-column justify-space-between px-4">
              <EditionDatas :edition="edition" />
              <PaperAcceptanceTable :title="title" :works="works" />
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </LayoutPanel>
</template>
