<template>
  <v-dialog v-model="show" persistent max-width="400px">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Aceitar convite de orientador
      </v-card-title>

      <v-card-text>
          Você foi convidado para ser o orientador deste trabalho. Ao aceitar, o trabalho será automaticamente aprovado e você poderá atribuir uma nota. Deseja aceitar?
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

onMounted(() => {
  
  if (props.work) {
    acceptanceStore.setAdvisorInfo(props.work);
    updateShow();
  }
});

const close = () => {
  show.value = false;
}

const aceitar = async () => {
  action.value = "aceitar";
  await acceptanceStore.acceptAsAdvisor();
  show.value = false;
  action.value = "";


  workStore.state.currentWork.advisor_status = 2 
  await workStore.getWork(props.work.id)

  await workStore.approveWork(workStore?.currentWork?.verification_token)
  workStore.state.currentWork.status = 2
  
};

const recusar = async () => {
  action.value = "recusar";
  await acceptanceStore.rejectAsAdvisor();
  show.value = false;
  action.value = "";
  workStore.state.currentWork.advisor_status = 3 

  await workStore.rejectWork(workStore?.currentWork?.verification_token)
  workStore.state.currentWork.status = 4
};
</script>
