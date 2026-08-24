<script setup>
import { ref } from "vue";
import { useWork } from "@/stores/work";
import { useEdition } from "@/stores/edition";
import { showMessage } from "@/utils/toastify";
import { hasReachedWorkLimit } from "@/utils/steps/works";

const props = defineProps({ work: { type: Object, required: true } });

const workStore = useWork();
const editionStore = useEdition();

const show = ref(false);
const selectedAdvisor = ref(null);
const submitting = ref(false);

const addUser = async (candidate) => {
  if (!candidate) return;

  if (candidate.id == props.work.advisor?.id) {
    showMessage(
      "Esse é o orientador que já recusou este trabalho — escolha outro.",
      "error", 2000, "top-right", "light", false
    );
    return;
  }

  if (candidate.is_advisor != true) {
    showMessage("Este professor não é um orientador.", "error", 1500, "top-right", "light", false);
    return;
  }

  await workStore.fetchUserWorks("TEACHER", candidate.id);
  const limitReached = hasReachedWorkLimit(
    candidate,
    workStore.advisorWorks,
    editionStore.currentEdition?.works_per_advisor_max,
    true
  );
  if (limitReached) {
    showMessage("Este orientador não está mais disponível.", "error", 1500, "top-right", "light", false);
    return;
  }

  selectedAdvisor.value = candidate;
};

const removeUser = () => {
  selectedAdvisor.value = null;
};

const confirm = async () => {
  if (!selectedAdvisor.value) return;
  submitting.value = true;
  try {
    await workStore.updateWork(props.work.id, { advisor: selectedAdvisor.value.id });
    // updateWork não atualiza currentWork, só a lista state.works.
    await workStore.getWork(props.work.id);
    showMessage("Novo orientador convidado com sucesso!", "success", 2000, "top-right", "light", true);
    show.value = false;
    selectedAdvisor.value = null;
  } catch (error) {
    showMessage(error?.message || "Falha ao selecionar novo orientador.", "error", 3000, "top-right", "light", false);
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <v-alert type="warning" variant="tonal" density="comfortable" class="mt-2">
    <div class="d-flex align-center justify-space-between flex-wrap ga-3">
      <span>O orientador recusou este trabalho. Selecione outro orientador para seguir com a submissão.</span>
      <v-btn color="warning" variant="flat" @click="show = true">Selecionar novo orientador</v-btn>
    </div>
  </v-alert>

  <v-dialog v-model="show" max-width="480px">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">Selecionar novo orientador</v-card-title>
      <v-card-text class="d-flex flex-column ga-3">
        <TeacherSelected
          :selectedUsers="selectedAdvisor ? [selectedAdvisor] : []"
          :disabled="!!selectedAdvisor"
          one
          userType="TEACHER"
          placeholder="pesquise pelo orientador"
          label="professor"
          error_msg="orientador não encontrado"
          @addUser="addUser"
          @removeUser="removeUser"
        />
        <v-chip v-if="selectedAdvisor" closable class="align-self-start" @click:close="removeUser">
          {{ selectedAdvisor.name }}
        </v-chip>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="flat" @click="show = false">Cancelar</v-btn>
        <v-btn color="primary" variant="flat" :disabled="!selectedAdvisor" :loading="submitting" @click="confirm">
          Convidar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
