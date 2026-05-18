<script setup>
import { StepsEdition } from '@/utils/steps/editions';
import { useEdition } from '@/stores/edition';
import { validateEditionCreation } from '@/utils/validators/edition/edition';

const editionStore = useEdition()
const actualstep = ref(0)
const imgPreview = ref(null)
const openDialog = ref(false)

const stepGroups = [
  {
    title: 'Dados basicos',
    description: 'Identifique a edicao antes de configurar os prazos.',
    fields: [0, 1, 2],
  },
  {
    title: 'Periodo do evento',
    description: 'Defina o intervalo geral da edicao. Os demais prazos devem ficar dentro dele.',
    fields: [3, 4],
  },
  {
    title: 'Primeira etapa',
    description: 'Configure a primeira submissao e o aceite dos orientadores. Esses prazos podem se sobrepor.',
    fields: [7, 12, 5, 10],
  },
  {
    title: 'Segunda etapa',
    description: 'Configure a segunda submissao e o segundo aceite. Eles tambem podem acontecer ao mesmo tempo.',
    fields: [8, 13, 6, 11],
  },
  {
    title: 'Periodo de avaliacao',
    description: 'Informe quando avaliadores e orientadores poderao registrar as avaliacoes.',
    fields: [9, 14],
  },
  {
    title: 'Equipe e disciplinas',
    description: 'Defina limites minimos e maximos para composicao dos trabalhos.',
    fields: [15, 16, 17],
  },
  {
    title: 'Distribuicao de trabalhos',
    description: 'Controle a carga maxima de trabalhos por avaliador, orientador e colaborador.',
    fields: [18, 19, 20],
  },
  {
    title: 'Proposta e carga horaria',
    description: 'Ajuste tamanho da proposta, quantidade de avaliadores e carga horaria da edicao.',
    fields: [21, 22, 23],
  },
  {
    title: 'Banner da edicao',
    description: 'Envie a imagem usada para representar a edicao nas telas do sistema.',
    fields: [24],
    media: true,
  },
]

const fieldLabels = {
  0: 'Nome da edicao',
  1: 'Ano da edicao',
  2: 'Tema da edicao',
  3: 'Inicio do evento',
  4: 'Fim do evento',
  5: 'Inicio do 1 aceite',
  6: 'Inicio do 2 aceite',
  7: 'Inicio da 1 submissao',
  8: 'Inicio da 2 submissao',
  9: 'Inicio da avaliacao',
  10: 'Fim do 1 aceite',
  11: 'Fim do 2 aceite',
  12: 'Fim da 1 submissao',
  13: 'Fim da 2 submissao',
  14: 'Fim da avaliacao',
  15: 'Alunos por equipe',
  16: 'Colaboradores por projeto',
  17: 'Disciplinas integradas',
  18: 'Trabalhos por avaliador',
  19: 'Trabalhos por orientador',
  20: 'Trabalhos por colaborador',
  21: 'Maximo de palavras por proposta',
  22: 'Avaliadores por trabalho',
  23: 'Carga horaria',
}

const fieldHints = {
  0: 'Use um nome curto e facil de reconhecer nas listas.',
  1: 'As datas da edicao precisam estar neste ano.',
  2: 'Tema apresentado aos alunos e professores.',
  3: 'Primeiro dia considerado dentro da edicao.',
  4: 'Ultimo dia considerado dentro da edicao.',
  5: 'Pode comecar antes do fim da primeira submissao.',
  6: 'Pode comecar antes do fim da segunda submissao.',
  7: 'Quando alunos podem iniciar o envio dos trabalhos.',
  8: 'Prazo para reenvio ou segunda chamada de submissao.',
  9: 'Quando avaliadores poderao lancar avaliacoes.',
  10: 'Deve terminar antes da segunda submissao.',
  11: 'Deve terminar antes do periodo de avaliacao.',
  12: 'Pode terminar depois do inicio do aceite.',
  13: 'Pode terminar depois do inicio do segundo aceite.',
  14: 'Ultimo dia para lancamento das avaliacoes.',
  15: 'Quantidade minima e maxima de alunos em cada equipe.',
  16: 'Quantidade minima e maxima de colaboradores por trabalho.',
  17: 'Quantidade minima e maxima de disciplinas por trabalho.',
  18: 'Limite de trabalhos atribuidos a cada avaliador.',
  19: 'Limite de trabalhos orientados por cada professor.',
  20: 'Limite de trabalhos colaborados por cada professor.',
  21: 'Use para evitar propostas longas demais.',
  22: 'Numero de avaliadores que cada trabalho deve receber.',
  23: 'Carga horaria certificada para a edicao.',
}

const lastStepIndex = computed(() => stepGroups.length - 1)
const successStepIndex = computed(() => stepGroups.length)
const currentGroup = computed(() => stepGroups[actualstep.value])
const validation = computed(() => validateEditionCreation(editionStore.newEdtion.newedition))

const selectedItems = computed(() => {
  return currentGroup.value?.fields.map(index => ({
    index,
    edition: editionStore.newEdtion.newedition[index],
  })) ?? []
})

onMounted(() => {
  resetSteps()
})

function resetSteps() {
  StepsEdition.value.forEach((step, index) => {
    step.complete = false
    step.is_actual = index === 0
  })
  actualstep.value = 0
}

function changeimg(e) {
  const file = e.target.files?.[0]
  if (!file) return

  if (imgPreview.value) {
    URL.revokeObjectURL(imgPreview.value)
  }

  imgPreview.value = URL.createObjectURL(file)
  editionStore.newEdtion.newedition[24].value = file
}

function fieldLabel(index, edition) {
  return fieldLabels[index] || edition.label
}

function fieldHint(index) {
  return fieldHints[index] || ''
}

function fieldError(index) {
  return validation.value.fieldErrors[index] || ''
}

function qtdErrors(index) {
  return validation.value.qtdErrors[index] || []
}

function hasCurrentStepErrors() {
  if (actualstep.value === lastStepIndex.value) {
    return !imgPreview.value
  }

  return selectedItems.value.some(({ index }) => {
    const hasFieldError = Boolean(validation.value.fieldErrors[index])
    const hasQtdError = validation.value.qtdErrors[index]?.some(Boolean)

    return hasFieldError || hasQtdError
  })
}

const selectValidator = computed(() => hasCurrentStepErrors())

async function DialogActive(type) {
  if (type === 'confirmar') {
    await editionStore.createEdition()
    StepsEdition.value[lastStepIndex.value].complete = true
    StepsEdition.value[lastStepIndex.value].is_actual = false
    actualstep.value = successStepIndex.value
  }

  openDialog.value = !openDialog.value
}

function NextStep() {
  if (actualstep.value < lastStepIndex.value) {
    StepsEdition.value[actualstep.value].complete = true
    StepsEdition.value[actualstep.value].is_actual = false
    StepsEdition.value[actualstep.value + 1].is_actual = true
    actualstep.value++
    return
  }

  if (actualstep.value === lastStepIndex.value) {
    openDialog.value = !openDialog.value
  }
}

function PrevStep() {
  if (actualstep.value <= 0) return

  const previousStep = actualstep.value - 1

  if (StepsEdition.value[actualstep.value]) {
    StepsEdition.value[actualstep.value].is_actual = false
  }

  StepsEdition.value[previousStep].is_actual = true
  actualstep.value--
}
</script>
<template>
  <div class="edition-create-page">
    <VStepper v-model="actualstep" class="edition-stepper d-flex h-100">
      <StepbyStepHeader :steps="StepsEdition" :actualstep="actualstep"/>
      <VStepperWindow class="edition-window w-100 h-100 position-relative">
        <div class="edition-step-window" v-if="actualstep < successStepIndex">
          <div class="edition-step-shell">
            <div class="edition-heading">
              <span class="text-overline text-blue">Etapa {{ actualstep + 1 }} de {{ stepGroups.length }}</span>
              <h2>{{ currentGroup.title }}</h2>
              <p>{{ currentGroup.description }}</p>
            </div>

            <div class="edition-fields-grid" v-if="!currentGroup.media">
              <EditionInputs
                v-for="item in selectedItems"
                :key="item.index"
                :placeholder="item.edition.placeholder"
                v-model:value="item.edition.value"
                :type="item.edition.type"
                :label="fieldLabel(item.index, item.edition)"
                :hint="fieldHint(item.index)"
                :qtds="item.edition.qtds"
                :error="fieldError(item.index)"
                :qtd-errors="qtdErrors(item.index)"
              />
            </div>

            <div class="edition-media-step" v-else>
              <MediaInput @changeImg="changeimg" :img="imgPreview"/>
            </div>
          </div>
        </div>

        <div class="edition-success" v-else>
          <SuccessStep to="/panel/editions/"/>
        </div>

        <StepsAction
          :actualstep="actualstep"
          :last-step="lastStepIndex"
          :success-step="successStepIndex"
          @PrevStep="PrevStep"
          @NextStep="NextStep"
          :disabledBtn="selectValidator"
          v-if="actualstep !== successStepIndex"
        />
      </VStepperWindow>
      <StepDialog
        btn_cancel_text="cancelar"
        btn_confirm_text="confirmar"
        title="Tem certeza que deseja cadastrar essa edicao?"
        v-model="openDialog"
        @confirmation="DialogActive"
      />
    </VStepper>
  </div>
</template>
<style scoped>
.edition-create-page {
  height: 100vh;
  overflow: hidden;
}

.edition-stepper {
  background: #fff;
}

.edition-window {
  min-width: 0;
}

.edition-step-window {
  height: 100%;
  overflow-y: auto;
  padding: 44px 56px 136px;
}

.edition-step-shell {
  width: min(100%, 980px);
  margin: 0 auto;
}

.edition-heading {
  margin-bottom: 28px;
}

.edition-heading h2 {
  font-size: 28px;
  line-height: 1.2;
  font-weight: 700;
  margin: 4px 0 8px;
}

.edition-heading p {
  max-width: 720px;
  color: rgba(0, 0, 0, 0.66);
  margin: 0;
}

.edition-fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px 24px;
  align-items: start;
}

.edition-media-step,
.edition-success {
  display: flex;
  min-height: 420px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .edition-step-window {
    padding: 28px 24px 124px;
  }

  .edition-fields-grid {
    grid-template-columns: 1fr;
  }
}
</style>
