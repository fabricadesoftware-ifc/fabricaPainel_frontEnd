<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  criteria: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['giveGrade', 'close'])
const { width } = useDisplay()
const singleGrade = ref(0)
const criterionGrades = reactive({})

function clampGrade(value) {
  const grade = Math.abs(Number(value) || 0)
  if (grade > 10) return 10
  return Number(grade.toFixed(2))
}

watch(singleGrade, value => {
  const normalized = clampGrade(value)
  if (Number(value) !== normalized) {
    singleGrade.value = normalized
  }
})

watch(
  () => props.criteria,
  criteria => {
    ;(criteria || []).forEach(criterion => {
      if (criterionGrades[criterion.key] === undefined) {
        criterionGrades[criterion.key] = 0
      }
    })
  },
  { immediate: true, deep: true }
)

const hasCriteria = computed(() => props.criteria?.length > 0)

const finalGrade = computed(() => {
  if (!hasCriteria.value) return clampGrade(singleGrade.value)

  const total = props.criteria.reduce((sum, criterion) => {
    return sum + (clampGrade(criterionGrades[criterion.key]) * Number(criterion.weight || 0)) / 100
  }, 0)

  return Number(total.toFixed(2))
})

function updateCriterionGrade(key, value) {
  criterionGrades[key] = clampGrade(value)
}

function criterionPayload() {
  if (!hasCriteria.value) return []

  return props.criteria.map(criterion => ({
    key: criterion.key,
    grade: clampGrade(criterionGrades[criterion.key]),
  }))
}

function sendWorkData() {
  emits('giveGrade', {
    work_grade: finalGrade.value,
    is_work_grade: true,
    criterion_grades: criterionPayload(),
  })
}
</script>

<template>
  <v-dialog scrollable fullscreen :overlay="false" transition="dialog-transition">
    <div :class="`${width > 780 ? 'w-100' : 'w-75'} h-100 mx-auto d-flex justify-center align-center`">
      <div class="grade-dialog bg-white d-flex flex-column rounded-lg pa-5">
        <div class="d-flex flex-column ga-2">
          <h2 :style="{ fontSize: width > 780 ? '25px' : '20px' }" class="text-grey-darken-4">
            Atribuir nota ao trabalho
          </h2>
          <p :style="{ fontSize: width > 780 ? '20px' : '15px' }" class="text-grey-darken-3">
            Nota final: {{ finalGrade.toFixed(2) }}
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
              type="number"
              min="0"
              max="10"
              step="0.01"
              label="Nota"
              variant="outlined"
              density="comfortable"
              @update:model-value="updateCriterionGrade(criterion.key, $event)"
            />
          </div>
        </div>

        <div v-else class="w-100 d-flex flex-column justify-center align-center ga-5">
          <input
            v-model="singleGrade"
            style="outline: none; height: 100px; font-size: 25px;"
            class="text-center align-center"
            type="Number"
          >
          <div style="width: 200px; height: 3px;" class="bg-blue-darken-2"></div>
        </div>

        <VCardActions class="w-100 d-flex justify-end">
          <VBtn class="font-weight-bold" @click="emits('close')">cancelar</VBtn>
          <VBtn class="bg-blue rounded-xl" style="width: 150px;" @click="sendWorkData">confirmar</VBtn>
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
