<template>
  <div
    v-if="show"
    class="acceptance-popup"
    style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.4); z-index: 9999; display: flex; align-items: center; justify-content: center;"
    >
    <div
      class="acceptance-card"
      style="background: white; border-radius: 8px; padding: 32px 24px; min-width: 320px; box-shadow: 0 2px 16px rgba(0,0,0,0.2);"
    >
      <div style="font-weight: bold; font-size: 20px; margin-bottom: 16px;">
        Aceitar convite de colaborador
      </div>
      <div style="margin-bottom: 24px;">
        Você foi convidado como colaborador deste trabalho. Deseja aceitar?
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <button
          @click="recusar"
          :disabled="acceptanceStore.state.loading"
          style="background: #ff5252; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;"
        >
          <span v-if="acceptanceStore.state.loading && action === 'recusar'">...</span>
          <span v-else>Recusar</span>
        </button>
        <button
          @click="aceitar"
          :disabled="acceptanceStore.state.loading"
          style="background: #1976d2; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;"
        >
          <span v-if="acceptanceStore.state.loading && action === 'aceitar'">...</span>
          <span v-else>Aceitar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from "vue";
import { useCollaboratorAcceptance } from "@/stores/collaboratorAcceptance";

const props = defineProps({ work: Object });
const acceptanceStore = useCollaboratorAcceptance();
const show = ref(false);
const action = ref("");

function updateShow() {
  if (
    acceptanceStore.state.isCollaborator &&
    acceptanceStore.state.collaboratorStatus == 1
  ) {
    show.value = true;
  } else {
    show.value = false;
  }
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
};

const recusar = async () => {
  action.value = "recusar";
  await acceptanceStore.rejectAsCollaborator();
  show.value = false;
  action.value = "";
};
</script>