<script lang="ts" setup>
// @ts-ignore
import { computed, watch, onMounted, toRefs, defineProps, defineEmits } from "vue";
import { userCase, validate_user_function } from "@/utils/works";
import { useDisplay } from "vuetify";

const emits = defineEmits(["buttonAction"]);

const { width } = useDisplay()

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
  } else if (uf === "COLLABORATOR") {
    return false
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
      <div class="d-flex w-100 align-start ga-10 flex-column">
        <div class="w-100 d-flex justify-center">
          <v-btn @click="emits('buttonAction')" v-if="shouldShowButton && width <= 780" :prepend-icon="userCase.icon"
            variant="text" size="small" :style="`color: ${userCase.color}; brightness: 50%;`">


            <p :style="{ fontWeight: '600', fontSize: '12px' }">{{ userCase.text }}</p>
          </v-btn>
        </div>
        <div :style="{ maxWidth: width > 780 ? '80%' : '100%' }" class="d-flex align-center ga-5">
          <h1 :style="{ fontSize: width > 780 ? '40px' : '25px' }">{{ props.title }}</h1>


          <v-chip :style="{ minWidth: width > 780 ? '100px' : '100px' }" class="d-flex justify-center align-center"
            :color="props.status_color" :size="width > 780 ? 'large' : 'small'">
            {{ props.status_content }}
          </v-chip>
        </div>
      </div>

      <v-btn @click="emits('buttonAction')" v-if="shouldShowButton && width > 780" :prepend-icon="userCase.icon"
        variant="text" size="small" :style="`color: ${userCase.color}; brightness: 50%;`">

        <p :style="{ fontWeight: '600', fontSize: width > 780 ? '15px' : '10px' }">{{ userCase.text }}</p>
      </v-btn>
    </div>


    <div v-if="user_function != 'COLLABORATOR' && title != 'Módulo Comunicação' && title != 'Módulo Territórios'" class="w-100 d-flex align-center ga-5">
      <p class="opacity-70" :style="{ fontWeight: '700', fontSize: width > 780 ? '20px' : '15px' }">
        Nota do Avaliador:
      </p>
      <v-chip :color="props.grade == null ? 'yellow-darken-3' : 'green-darken-3'"
        class="d-flex justify-center align-center" label
        :style="{ width: width > 780 ? '150px' : '130px', fontSize: width > 780 ? '14px' : '12px' }">
        {{ !props.grade ? "Nota não Atribuída" : props.grade }}
      </v-chip>
    </div>
  </div>
</template>
