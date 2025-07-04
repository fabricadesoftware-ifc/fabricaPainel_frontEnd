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
        
          @click="close"
          variant="flat"
        >
          Decidir depois
        </v-btn>
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
  <v-btn @click="show = !show" style="position: absolute; z-index: 99; top: 150px; right: 70px;" v-if="!show && pendingStatus" color="blue">Decidir Colaboração</v-btn>
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
const pendingStatus = computed(()=>acceptanceStore.state.collaboratorStatus === 1);
function updateShow() {
  const isCollaborator = acceptanceStore.state.isCollaborator;
  
  show.value = isCollaborator && pendingStatus;
}

onMounted(() => {
  if (props.work) {
    acceptanceStore.setCollaboratorInfo(props.work);
    updateShow();
  }
});

const close = () => {
  show.value = false;
}

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
