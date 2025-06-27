<template>
  <v-dialog v-model="show" persistent max-width="400px">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Aceitar convite de colaborador
      </v-card-title>

      <v-card-text>
        Você foi convidado como colaborador deste trabalho. Deseja aceitar?
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
          color="error"
          @click="recusar"
          :loading="acceptanceStore.state.loading && action === 'recusar'"
          :disabled="acceptanceStore.state.loading"
          variant="flat"
        >
          Recusar
        </v-btn>

        <v-btn
          color="primary"
          @click="aceitar"
          :loading="acceptanceStore.state.loading && action === 'aceitar'"
          :disabled="acceptanceStore.state.loading"
          variant="flat"
        >
          Aceitar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useCollaboratorAcceptance } from "@/stores/collaboratorAcceptance";
import { useWork } from "@/stores/work";
import { useAuth } from "@/stores/auth";

const props = defineProps({ work: Object });

const acceptanceStore = useCollaboratorAcceptance();
const workStore = useWork();
const authStore = useAuth();

const show = ref(false);
const action = ref("");

// Índice do colaborador no array
const collabIndex = workStore?.currentWork?.work_collaborator?.findIndex(
  (s) => s.collaborator.id === authStore.user.id
);

function updateShow() {
  const isCollaborator = acceptanceStore.state.isCollaborator;
  const pendingStatus = acceptanceStore.state.collaboratorStatus === 1;
  show.value = isCollaborator && pendingStatus;
}

onMounted(() => {
  if (props.work) {
    acceptanceStore.setCollaboratorInfo(props.work);
    updateShow();
  }
});

const aceitar = async () => {
  action.value = "aceitar";
  await acceptanceStore.acceptAsCollaborator();
  show.value = false;
  action.value = "";
  if (collabIndex >= 0) {
    workStore.state.currentWork.work_collaborator[collabIndex].status = 2;
  }
};

const recusar = async () => {
  action.value = "recusar";
  await acceptanceStore.rejectAsCollaborator();
  show.value = false;
  action.value = "";
  if (collabIndex >= 0) {
    workStore.state.currentWork.work_collaborator[collabIndex].status = 3;
  }
};
</script>
