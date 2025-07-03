<script lang="ts" setup>
// @ts-ignore
import { computed, watch, onMounted, toRefs, defineProps, defineEmits } from "vue";
import { userCase, validate_user_function } from "@/utils/works";

const emits = defineEmits(["buttonAction"]);

const props = defineProps({
  work_status: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status_content: {
    type: String,
    required: true,
  },
  status_color: {
    type: String,
    required: true,
  },
  grade: {
    type: [Number, String, null],
  },
  user_function: {
    type: String,
    default: "",
  },
  student_able_to_cancel: {
    type: Boolean,
    default: false,
  },
  advisor_able_to_give_grade: {
    type: Boolean,
    default: false,
  },
  evaluator_able_to_give_grade: {
    type: Boolean,
    default: false,
  },
  advisor_able_to_aprove_work: {
    type: Boolean,
    default: false,
  },
});

// Torna as props reativas
const {
  work_status,
  user_function,
  student_able_to_cancel,
  evaluator_able_to_give_grade,
  advisor_able_to_aprove_work,
} = toRefs(props);

// Computed para mostrar botão corretamente
const shouldShowButton = computed(() => {
  const uf = user_function.value;
  const ws = work_status.value;


  if (uf === "STUDENT") {
    return student_able_to_cancel.value && ws === 1 || ws === 3;
  } else if (uf === "ADVISOR") {
    if (advisor_able_to_aprove_work.value && ws === 1) {
      return true;
    }
  } else {
    return evaluator_able_to_give_grade.value && ws === 2 && !props.grade;
  }
  return false;
});

// Validação reativa
watch(
  [work_status, user_function],
  ([newStatus, newFunction]: [number, string]) => {
    validate_user_function(newFunction, newStatus);

  },
  { immediate: true }
);

onMounted(() => {
  validate_user_function(user_function.value, work_status.value);
  
});
</script>

<template>
  <div class="w-100 d-flex justify-space-between flex-wrap ga-8 align-center">
    <div class="d-flex align-center justify-space-between w-100 ga-3">
      <div class="d-flex align-center ga-3">
        <h1 style="font-size: 40px">{{ props.title }}</h1>

        <v-chip
          :color="props.status_color"
          style="min-width: 150px; display: flex; justify-content: center; align-items: center; font-size: 17px;"
        >
          {{ props.status_content }}
        </v-chip>
      </div>

      <v-btn
        @click="emits('buttonAction')"
        v-if="shouldShowButton"
        :prepend-icon="userCase.icon"
        variant="text"
        size="small"
        :style="`color: ${userCase.color}; brightness: 50%;`"
      >
      
        <p style="font-size: 15px; font-weight: 600">{{ userCase.text }}</p>
      </v-btn>
    </div>


    <div v-if="user_function != 'COLLABORATOR'" class="w-100 d-flex align-center ga-5">
      <p class="opacity-70" style="font-weight: 700; font-size: 20px">
        Nota do Trabalho:
      </p>
      <v-chip
        :color="props.grade == null ? 'yellow-darken-3' : 'green-darken-3'"
        class="d-flex justify-center align-center"
        label
        style="width: 150px"
      >
        {{ !props.grade ? "Nota não Atribuída" : props.grade }}
      </v-chip>
    </div>
  </div>
</template>
