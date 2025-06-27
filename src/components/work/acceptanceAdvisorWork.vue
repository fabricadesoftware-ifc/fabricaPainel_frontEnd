<template>
  <v-dialog v-model="show" persistent max-width="400px">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Aceitar convite de orientador
      </v-card-title>

      <v-card-text>
        Você foi convidado como orientador deste trabalho. Deseja aceitar?
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
import { useAdvisorAcceptance } from "@/stores/advisorAcceptance";
import { useWork } from "@/stores/work";
import { useAuth } from "@/stores/auth";

const props = defineProps({ work: Object });

const acceptanceStore = useAdvisorAcceptance();
const workStore = useWork();
const authStore = useAuth();

const show = ref(false);
const action = ref("");

// Índice do colaborador no array

function updateShow() {
  const isAdvisor = acceptanceStore.state.isAdvisor
  const pendingStatus = acceptanceStore.state.advisorStatus === 1;
  show.value = isAdvisor && pendingStatus;
}

onMounted(() => {
  if (props.work) {
    acceptanceStore.setAdvisorInfo(props.work);
    updateShow();
  }
});

const aceitar = async () => {
  action.value = "aceitar";
  await acceptanceStore.acceptAsAdvisor();
  show.value = false;
  action.value = "";
  workStore.state.currentWork.advisor_status = 2 
};

const recusar = async () => {
  action.value = "recusar";
  await acceptanceStore.rejectAsAdvisor();
  show.value = false;
  action.value = "";
  workStore.state.currentWork.advisor_status = 3 

};
</script>
