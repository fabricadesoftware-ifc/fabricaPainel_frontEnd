<template>
  <v-dialog v-model="show" persistent max-width="400px">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Aceitar convite de orientador
      </v-card-title>

      <v-card-text>
          Você foi convidado para ser o orientador deste trabalho. Ao aceitar, o trabalho será automaticamente aprovado e você poderá atribuir uma nota. Deseja aceitar?
      </v-card-text>

      <v-card-text v-if="acceptanceStore.limitReached" class="pt-0">
        <v-alert type="warning" variant="tonal" density="compact">
          {{ acceptanceStore.limitMessage }}
        </v-alert>
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

        <!-- O botão desabilitado não recebe eventos de ponteiro, então o tooltip
             precisa ficar ancorado neste wrapper e não no próprio v-btn. -->
        <div>
          <v-btn
            color="primary"
            @click="aceitar"
            :loading="acceptanceStore.state.loading && action === 'aceitar'"
            :disabled="acceptanceStore.state.loading || acceptanceStore.limitReached"
            variant="flat"
          >
            Aceitar
          </v-btn>
          <v-tooltip v-if="acceptanceStore.limitReached" activator="parent" location="top">
            {{ acceptanceStore.limitMessage }}
          </v-tooltip>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div :class="`d-flex justify-center ${width > 780 ? '' : 'w-100'}`" :style="{position: 'absolute', zIndex: '99', top: width > 780 ? '150px' : '70px', right: width > 780 ? '70px' : '0px'}">
   <v-btn :size="width > 780 ? 'default' : 'small' " @click="show = !show"  v-if="!show && work.advisor_status == 1" color="blue">Decidir Orientação</v-btn>
   </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useAdvisorAcceptance } from "@/stores/advisorAcceptance";
import { useWork } from "@/stores/work";
import { useAuth } from "@/stores/auth";
import { useDisplay } from "vuetify";

const props = defineProps({ work: Object });

const acceptanceStore = useAdvisorAcceptance();
const workStore = useWork();
const authStore = useAuth();

const show = ref(false);
const action = ref("");
const {width} = useDisplay()

// Índice do colaborador no array

function updateShow() {
  const isAdvisor = acceptanceStore.state.isAdvisor
  const pendingStatus = acceptanceStore.state.advisorStatus === 1;
  show.value = isAdvisor && pendingStatus;
}

onMounted(async () => {

  if (props.work) {
    acceptanceStore.setAdvisorInfo(props.work);
    updateShow();
    // Só faz sentido consultar o limite para quem realmente vai decidir: o
    // endpoint responde 403 para quem não é o orientador do trabalho.
    if (acceptanceStore.state.isAdvisor) {
      await acceptanceStore.fetchLimitStatus();
    }
  }
});

const close = () => {
  show.value = false;
}

const aceitar = async () => {
  action.value = "aceitar";
  const success = await acceptanceStore.acceptAsAdvisor();
  action.value = "";

  // Se o backend recusou (ex.: fora do período de aceitação), não segue com os
  // próximos passos nem mexe no status local — o erro já foi mostrado ao usuário.
  if (!success) return;

  show.value = false;
  workStore.state.currentWork.advisor_status = 2
  await workStore.getWork(props.work.id)

  await workStore.approveWork(workStore?.currentWork?.verification_token)
  workStore.state.currentWork.status = 2

};

const recusar = async () => {
  action.value = "recusar";
  const success = await acceptanceStore.rejectAsAdvisor();
  action.value = "";

  if (!success) return;

  show.value = false;
  workStore.state.currentWork.advisor_status = 3

  await workStore.rejectWork(workStore?.currentWork?.verification_token)
  workStore.state.currentWork.status = 4
};
</script>
