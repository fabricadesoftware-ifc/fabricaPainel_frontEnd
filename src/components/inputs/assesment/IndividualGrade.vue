<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  user: Object,
  criteria: {
    type: Array,
    default: () => [],
  },
  // Nota ja lancada (modo edicao). Sem ela, o dialogo e de lancamento novo.
  assessment: {
    type: Object,
    default: null,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['giveGrade', 'close', 'update:modelValue'])
const { width } = useDisplay()
const singleGrade = ref('0')
const criterionGrades = reactive({})

function parseGrade(value) {
  const grade = Math.abs(parseFloat(String(value ?? '').replace(',', '.')))
  if (Number.isNaN(grade)) return 0
  return Math.min(Number(grade.toFixed(2)), 10)
}

watch(
  () => props.criteria,
  criteria => {
    ;(criteria || []).forEach(criterion => {
      if (criterionGrades[criterion.key] === undefined) {
        criterionGrades[criterion.key] = '0'
      }
    })
  },
  { immediate: true, deep: true }
)

const hasCriteria = computed(() => props.criteria?.length > 0)
const isEditing = computed(() => Boolean(props.assessment?.id))

// Ao abrir: pre-preenche com a nota existente (edicao) ou zera (lancamento novo),
// pra nao sobrar o valor digitado da ultima vez.
function fillFromAssessment() {
  const saved = props.assessment
  const savedByKey = {}
  ;(saved?.criterion_grades || []).forEach(item => {
    savedByKey[item.key] = item.grade
  })

  ;(props.criteria || []).forEach(criterion => {
    const value = savedByKey[criterion.key]
    criterionGrades[criterion.key] = value === undefined ? '0' : String(value)
  })

  singleGrade.value = saved && !saved.criterion_grades?.length ? String(saved.grade) : '0'
}

watch(
  () => props.modelValue,
  open => {
    if (open) fillFromAssessment()
  },
  { immediate: true }
)

const finalGrade = computed(() => {
  if (!hasCriteria.value) return parseGrade(singleGrade.value)

  const total = props.criteria.reduce((sum, criterion) => {
    return sum + (parseGrade(criterionGrades[criterion.key]) * Number(criterion.weight || 0)) / 100
  }, 0)

  return Number(total.toFixed(2))
})

function updateCriterionGrade(key, value) {
  criterionGrades[key] = value
}

function normalizeCriterionGrade(key) {
  criterionGrades[key] = String(parseGrade(criterionGrades[key]))
}

function normalizeSingleGrade() {
  singleGrade.value = String(parseGrade(singleGrade.value))
}

function criterionPayload() {
  if (!hasCriteria.value) return []

  return props.criteria.map(criterion => ({
    key: criterion.key,
    grade: parseGrade(criterionGrades[criterion.key]),
  }))
}

function sendWorkData() {
  emits('giveGrade', {
    work_grade: finalGrade.value,
    is_work_grade: false,
    assessment_id: props.assessment?.id ?? null,
    criterion_grades: criterionPayload(),
  })
  singleGrade.value = '0'
}
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="emits('update:modelValue', $event)" scrollable fullscreen :overlay="false" transition="dialog-transition">
    <div :class="`${width > 780 ? 'w-100' : 'w-75'} h-100 mx-auto d-flex justify-center align-center`">
      <div class="grade-dialog bg-surface text-high-emphasis d-flex flex-column rounded-lg pa-5">
        <div class="d-flex flex-column ga-2">
          <h2 :style="{ fontSize: width > 780 ? '25px' : '20px' }" class="text-high-emphasis">
            {{ isEditing ? 'Editar nota do aluno' : 'Atribuir nota ao aluno' }}
          </h2>
          <p :style="{ fontSize: width > 780 ? '20px' : '15px' }" class="text-medium-emphasis">
            Nota final: {{ finalGrade.toFixed(2) }}
          </p>
        </div>

        <div class="d-flex flex-column ga-2 align-center">
          <p :style="{ fontSize: width > 780 ? '25px' : '20px', fontWeight: '600' }" class="text-primary">
            {{ props.user?.name }}
          </p>
          <p :style="{ fontSize: width > 780 ? '18px' : '15px' }" class="text-medium-emphasis">
            {{ props.user?.email }}
          </p>
        </div>

        <div v-if="hasCriteria" class="d-flex flex-column ga-4">
          <div v-for="criterion in criteria" :key="criterion.key" class="criterion-grade-row">
            <div>
              <p class="text-subtitle-2 mb-1">{{ criterion.label }}</p>
              <span class="text-caption text-medium-emphasis">Peso: {{ criterion.weight }}%</span>
            </div>
            <VTextField
              :model-value="criterionGrades[criterion.key]"
              type="text"
              inputmode="decimal"
              label="Nota"
              variant="outlined"
              density="comfortable"
              @update:model-value="updateCriterionGrade(criterion.key, $event)"
              @blur="normalizeCriterionGrade(criterion.key)"
            />
          </div>
        </div>

        <div v-else class="w-100 d-flex flex-column justify-center align-center ga-5">
          <input
            v-model="singleGrade"
            style="outline: none; height: 100px; font-size: 25px; color: inherit; background: transparent;"
            class="text-center align-center"
            type="text"
            inputmode="decimal"
            @blur="normalizeSingleGrade"
          >
          <div style="width: 200px; height: 3px;" class="bg-primary"></div>
        </div>

        <VCardActions class="w-100 d-flex justify-end">
          <VBtn class="font-weight-bold" @click="emits('close')">cancelar</VBtn>
          <VBtn class="bg-blue rounded-xl" style="width: 150px;" @click="sendWorkData">{{ isEditing ? 'salvar' : 'confirmar' }}</VBtn>
        </VCardActions>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped>
.grade-dialog {
  gap: 28px;
  max-height: 92vh;
  overflow: auto;
  width: min(760px, 100%);
}

.criterion-grade-row {
  align-items: center;
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(220px, 1fr) 180px;
}

@media (max-width: 780px) {
  .criterion-grade-row {
    align-items: stretch;
    grid-template-columns: 1fr;
  }
}
</style>
