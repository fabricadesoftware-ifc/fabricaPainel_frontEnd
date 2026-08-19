import { defineStore } from "pinia";
import { computed, ref } from "vue";
import AcceptanceService from "@/services/acceptance";
import { useSessionStorage } from "@vueuse/core";
import { showMessage } from "@/utils/toastify";
import { useAuth } from "./auth";

type AdvisorWorkLimit = {
  limit: number;
  accepted_works: number;
  remaining: number | null;
  limit_reached: boolean;
  within_decision_window: boolean;
};

export const useAdvisorAcceptance = defineStore("AdvisorAcceptance", () => {
  const authStore = useAuth()
  const state = useSessionStorage("advisorAcceptance", {
    loading: false,
    error: null as string | null,
    accepted: false,
    rejected: false,
    advisorStatus: null as number | null, // 1=pendente, 2=aceito, 3=cancelado
    isAdvisor: false,
    verificationToken: "",
  });
  // Fora do sessionStorage de proposito: a contagem de orientacoes muda a cada
  // aceite, inclusive de outras equipes, e um valor cacheado entre abas mostraria
  // o botao liberado quando ja nao esta.
  const limitStatus = ref<AdvisorWorkLimit | null>(null);
  const limitLoading = ref(false);
  const user = authStore.user

  const setLoading = (loading: boolean) => {
    state.value.loading = loading;
  };

  const setError = (message: string | null) => {
    state.value.error = message;
  };

  // Usado na página de decisão aberta pelo link do email (/decidir-orientacao/[token]),
  // onde ainda não temos o "work" carregado — só o token que veio na própria URL.
  const setToken = (token: string) => {
    state.value.verificationToken = token;
    state.value.accepted = false;
    state.value.rejected = false;
    state.value.error = null;
  };

  const setAdvisorInfo = (work: any) => {
    // console.log("userId logado:", userId);
    // console.log("work_collaborators:", work.work_collaborator);
    
    // console.log("collab encontrado:", collab);
    // console.log("collab status:", collab?.status);
    // console.log("collab verification_token:", collab?.verification_token);
    if (work.advisor.id == user.id) {
     
      state.value.isAdvisor = true;
      state.value.advisorStatus = work.advisor_status; // 1=pendente, 2=aceito, 3=cancelado
      state.value.verificationToken = work.verification_token;
    } else {
      state.value.isAdvisor = false;
      state.value.advisorStatus = null;
      state.value.verificationToken = "";
    }
  };

  // Busca quantas orientações o professor já aceitou nesta edição, para a tela
  // conseguir desabilitar o botão e explicar o motivo antes do clique.
  const fetchLimitStatus = async () => {
    if (!state.value.verificationToken) return null;
    limitLoading.value = true;
    try {
      limitStatus.value = await AcceptanceService.getAdvisorWorkLimit(
        state.value.verificationToken
      );
      return limitStatus.value;
    } finally {
      limitLoading.value = false;
    }
  };

  const limitReached = computed(() => limitStatus.value?.limit_reached === true);

  const limitMessage = computed(() => {
    const status = limitStatus.value;
    if (!status?.limit_reached) return "";
    return (
      `Você já aceitou ${status.accepted_works} de ${status.limit} orientações ` +
      `permitidas nesta edição e não pode aceitar mais este trabalho.`
    );
  });

  const acceptAsAdvisor = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!state.value.verificationToken) throw new Error("Token de verificação não encontrado.");
      await AcceptanceService.acceptAdvisorWork(state.value.verificationToken);
      showMessage('Orientação aceita com sucesso!', 'success', 2000, 'top-right', 'light', true)
      state.value.accepted = true;
      state.value.advisorStatus = 2; // 2 = aceito
      return true;
    } catch (error: any) {
      setError(error.message);
      showMessage(error.message, 'error', 3000, 'top-right', 'light', false)
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectAsAdvisor = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!state.value.verificationToken) throw new Error("Token de verificação não encontrado.");
      await AcceptanceService.rejectAdvisorWork(state.value.verificationToken);
      showMessage('Orientação rejeitada com sucesso!', 'success', 2000, 'top-right', 'light', true)
      state.value.rejected = true;
      state.value.advisorStatus = 3; // 3 = cancelado/recusado
      return true;
    } catch (error: any) {
      setError(error.message);
      showMessage(error.message, 'error', 3000, 'top-right', 'light', false)
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    limitStatus,
    limitLoading,
    limitReached,
    limitMessage,
    fetchLimitStatus,
    setToken,
    setAdvisorInfo,
    acceptAsAdvisor,
    rejectAsAdvisor,
  };
});