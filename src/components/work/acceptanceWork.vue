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
   <div :class="`d-flex justify-center ${width > 780 ? '' : 'w-100'}`" :style="{position: 'absolute', zIndex: '99', top: width > 780 ? '150px' : '90px', right: width > 780 ? '70px' : '0px'}">
   <v-btn :size="width > 780 ? 'default' : 'small' " @click="show = !show"  v-if="!show && pendingStatus" color="blue">Decidir Orientação</v-btn>
   </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import { useCollaboratorAcceptance } from "@/stores/collaboratorAcceptance";
import { useWork } from "@/stores/work";
import { useAuth } from "@/stores/auth";
import { useDisplay } from "vuetify";

const props = defineProps({ work: Object });

const acceptanceStore = useCollaboratorAcceptance();
const workStore = useWork();
const authStore = useAuth();

const {width} = useDisplay()

const show = ref(false);
const action = ref("");

// Índice do colaborador no array
const collabIndex = workStore?.currentWork?.work_collaborator?.findIndex(
  (s) => s.collaborator.id === authStore.user.id
);
const pendingStatus = computed(()=>acceptanceStore.state.collaboratorStatus === 1);

watch(acceptanceStore.state.collaboratorStatus, (newVal)=> {
  if (acceptanceStore.state.collaboratorStatus === 1) {
    show.value = false
  }
})

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
  acceptanceStore.state.collaboratorStatus = 2
  show.value = false;
  action.value = "";
  if (collabIndex >= 0) {
    workStore.state.currentWork.work_collaborator[collabIndex].status = 2;
  }
};

const recusar = async () => {
  action.value = "recusar";
  await acceptanceStore.rejectAsCollaborator();
    acceptanceStore.state.collaboratorStatus = 3
  show.value = false;
  action.value = "";
  if (collabIndex >= 0) {
    workStore.state.currentWork.work_collaborator[collabIndex].status = 3;
  }
};
</script>
