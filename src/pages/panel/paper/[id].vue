<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useAuth } from '@/stores/auth'
  import { useEdition } from '@/stores/edition'
  import { useWork } from '@/stores/work'
  import { useAssessmentStore } from '@/stores/assessment'
  import { useRouter } from 'vue-router'
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  import { showMessage } from "@/utils/toastify";

  const router = useRouter()
  const work_id = (router.currentRoute.value.params as { id: string }).id
  const workStore = useWork()
  const authStore = useAuth()
  const assessmentStore = useAssessmentStore()

  const editionStore = useEdition()
  const panel = ref([
    'team',
    'abstract',
  ])
  const dialogReject = ref(false)
  const feedbackRejec = ref('')
  const messageStudent = authStore.user.user_type === 'STUDENT' ? 'Seu trabalho foi aprovado. Parabéns!' : ''
  const dialogGrade = ref(false)
  const assessment = ref([])
  const workGrade = ref(0)

  const generatePDF = () => {
    const doc = new jsPDF()

    doc.text('Relatório de Notas', 10, 10)
    doc.text(`Aluno: ${authStore.user?.name}`, 10, 20)

    const columns = ['Aluno', 'Nota']
    const rows = []

    workStore.currentWork?.team.slice(14).split(', ').forEach((student, index) => {
      const currentGrade = assessment.value.length > 0 ? assessment.value[index]?.grade : 0
      rows.push([student, currentGrade])
    })

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    })

    doc.save(`notas_${authStore.user?.name}.pdf`)
  }

  const submitFeedback = async () => {
    await editionStore.submitFeedback(work_id, feedbackRejec.value)
  }

  const submitGrades = () => {
    console.log('Submit grades: ', workGrade.value)
  }

  onMounted(async () => {
    workStore.getWork(work_id)
    editionStore.fetchCurrentEdition()
    assessment.value = await assessmentStore.getAssessmentsByWorkId(work_id)
  })

// eslint-disable-next-line camelcase

const approveWork = async () => {
  await workStore.approveWork();
  await workStore.getWork(work_id);
  showMessage("Trabalho aprovado com sucesso", "success", 2000, "top-right", "auto", true); 
};
</script>

<template>
  <LayoutSteps>
    <v-card class="border-md w-100 pa-8" rounded="xl" variant="outlined">
      <div class="mb-6">
        <InformativeAlert
          v-if="workStore.currentWork?.verification_token === null"
          color="success"
          :description="messageStudent"
          title="Trabalho Aprovado"
        />
      </div>
      <div class="mb-6">
        <InformativeAlert
          v-if="
            workStore.currentWork?.status === 3 &&
            authStore.isOpenForAprove &&
            authStore.user?.user_type === 'STUDENT'
          "
          color="warning"
          title="Este Trabalho não cumpriu os requisitos mínimos, verifique seu email"
        />
      </div>
      <div class="mb-6">
        <InformativeAlert
          v-if="
            workStore.currentWork?.status === 3 &&
            authStore.isOpenForAprove &&
            authStore.user?.user_type === 'TEACHER'
          "
          closable
          color="info"
          title="Enviado email para o aluno com as correções necessárias"
        />
      </div>
      <div class="mb-6">
        <InformativeAlert
          v-if="
            workStore.currentWork?.verification_token !== null &&
            !authStore.isOpenForAprove
          "
          color="error"
          title="Este Trabalho não foi Aprovado durante o período de Avaliação"
        />
      </div>
      <header>
        <v-row class="d-flex justify-space-between" no-gutters>
          <v-col cols="12">
            <h1 class="pb-4">
              {{ workStore.currentWork?.title }}
            </h1>
          </v-col>
          <v-col cols="12">
            <p>
              Áreas de Conhecimento:
              <v-chip
                v-for="(value, key) in workStore.currentWork?.field"
                :key="key"
                class="mr-2 my-2"
                color="blue"
                outlined
              >
                {{ value.name }}
              </v-chip>
            </p>
            <p>
              Objetivos de Desenvolvimento Sustentável:
              <v-chip
                v-for="(value, key) in workStore.currentWork?.ods"
                :key="key"
                class="mr-2 my-2"
                color="green"
                outlined
              >
                {{ value.name }}
              </v-chip>
            </p>
            <p>
              Tema Transversal:
              <v-chip class="mr-2 my-2" color="pink" outlined>
                {{ workStore.currentWork?.cross_cutting_theme.name }}
              </v-chip>
            </p>
          </v-col>
        </v-row>
      </header>
      <v-divider class="my-4" />
      <v-expansion-panels
        v-model="panel"
        class="rounded-0 overflow-hidden"
        multiple
        variant="accordion"
      >
        <v-expansion-panel value="team">
          <v-expansion-panel-title
            class="py-8 border-b-sm"
            collapse-icon="mdi-minus"
            expand-icon="mdi-plus"
          >
            Integrantes da Equipe:
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ul class="font-weight-bold">
              <p>
                {{ workStore.currentWork?.team.slice(14,-1) }}
              </p>
            </ul>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="abstract">
          <v-expansion-panel-title
            class="py-8 border-b-sm"
            collapse-icon="mdi-minus"
            expand-icon="mdi-plus"
          >
            Resumo do Projeto
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>
              {{ workStore.currentWork?.abstract }}
            </p>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
          v-if="workStore.currentWork?.verification_token === null"
          value="evaluation"
        >
          <v-expansion-panel-title
            class="py-8 border-b-sm"
            collapse-icon="mdi-minus"
            expand-icon="mdi-plus"
          >
            Orientadores / Avaliadores
          </v-expansion-panel-title>
          <v-expansion-panel-text
            ><v-row>
              <v-col cols="6">
                <p>Orientador</p>
                <v-chip class="mr-2 my-4" color="primary" outlined>
                  {{ workStore.currentWork?.advisor.name }}
                </v-chip>
                <p>Co-Orientadores</p>
                <v-chip class="mr-2 my-4" color="primary" outlined>
                  {{ workStore.currentWork?.co_advisor?.name }}
                </v-chip>
              </v-col>
              <v-col cols="6">
                <p>Avaliadores</p>
                <v-chip
                  v-for="professor in workStore.currentWork?.evaluator"
                  :key="professor.id"
                  class="mr-2 my-4"
                  color="primary"
                  outlined
                >
                  {{ professor }}
                </v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row
        v-if="
          authStore.isOpenForAprove &&
          workStore.currentWork?.verification_token !== null
        "
        class="mt-8 ga-2"
        justify="end"
        no-gutters
      >
        <v-col class="d-flex justify-end" cols="4">
          <v-btn
            v-if="authStore.user?.user_type != 'STUDENT'"
            block
            class="py-6 text-white"
            color="orange"
            rounded="xl"
            variant="flat"
            @click="dialogReject = true"
            >Precisa de mudanças</v-btn
          >

          <v-dialog v-model="dialogReject" max-width="500px">
            <v-card>
              <v-card-title class="headline">Feedback</v-card-title>
              <v-card-text>
                <v-textarea
                  v-model="feedbackRejec"
                  label="Descreva o que precisa ser mudado"
                  rows="5"
                  variant="outlined"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="dialogReject = false"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="submitFeedback()"
                  >Enviar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="2">
          <v-btn
            v-if="authStore.user?.user_type != 'STUDENT'"
            block
            class="py-6"
            color="green"
            rounded="xl"
            variant="flat"
            @click="approveWork()"
            >Aprovar</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="mt-8" justify="end" no-gutters>
        <v-col cols="12">
          <v-btn
          v-if="authStore.user?.user_type != 'STUDENT'"
            block
            class="py-6"
            color="info"
            rounded="xl"
            variant="flat"
            @click="dialogGrade = true"
          >Dar Nota</v-btn>
          <v-btn v-else
            block
            class="py-6"
            color="info"
            rounded="xl"
            variant="flat"
            @click="generatePDF()"
          >Ver nota</v-btn>

          <v-dialog v-model="dialogGrade" max-width="600px">
            <v-card>
              <v-card-title class="headline font-weight-bold">
                <span
                  v-if="
                    authStore.user.id === workStore.currentWork?.advisor.id ||
                    authStore.user.id === workStore.currentWork?.co_advisor.id
                  "
                >
                  Notas dos Alunos
                </span>
                <span v-else> Nota Final </span>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-row>
                    <v-col
                      v-if="
                        authStore.user.id ===
                          workStore.currentWork?.advisor.id ||
                        authStore.user.id ===
                          workStore.currentWork?.co_advisor.id
                      "
                      cols="12"
                    >
                      <v-row
                        v-for="(student, index) in workStore.currentWork?.team
                          .slice(14)
                          .split(', ')"
                        :key="index"
                        no-gutters
                      >
                        <v-col cols="8">
                          <p>{{ student }}</p>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            label="Nota"
                            max="10"
                            min="0"
                            type="number"
                            variant="outlined"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col v-else cols="12">
                      <v-text-field
                        v-model="workGrade"
                        label="Nota do Trabalho"
                        max="10"
                        min="0"
                        type="number"
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="dialogGrade = false"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="submitGrades()"
                  >Enviar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card>
  </LayoutSteps>
</template>

<style>
li {
  list-style-type: none;
  margin-bottom: 8px;
}
</style>
