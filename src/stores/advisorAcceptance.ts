import { defineStore } from "pinia";
import { computed, ref } from "vue";
import AcceptanceService from "@/services/acceptance";
import WorkService from "@/services/works";
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
    // Token não encontrado = decisão já tomada em outro lugar, não é erro pra retry.
    alreadyDecided: false,
    accepted: false,
    rejected: false,
    advisorStatus: null as number | null, // 1=pendente, 2=aceito, 3=cancelado
    isAdvisor: false,
    verificationToken: "",
  });
  // Fora do sessionStorage: contagem muda a cada aceite de outras equipes também.
  const limitStatus = ref<AdvisorWorkLimit | null>(null);
  const limitLoading = ref(false);
  const user = authStore.user

  const setLoading = (loading: boolean) => {
    state.value.loading = loading;
  };

  const setError = (message: string | null) => {
    state.value.error = message;
  };

  // Usado pela página /decidir-orientacao/[token], que só tem o token da URL.
  const setToken = (token: string) => {
    state.value.verificationToken = token;
    state.value.accepted = false;
    state.value.rejected = false;
    state.value.alreadyDecided = false;
    state.value.error = null;
  };

  const setAdvisorInfo = (work: any) => {
    if (!work || !work.advisor) {
      state.value.isAdvisor = false;
      state.value.advisorStatus = null;
      state.value.verificationToken = "";
      return;
    }
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

  // Aceite exige 2 chamadas no backend (accept-advisor-work + accept-submission,
  // com o token rotacionado entre elas); centralizado aqui pra não repetir/esquecer
  // esse segundo passo em cada tela que aceita orientação.
  const finalizeSubmissionApproval = async (token: string, attempt = 1): Promise<void> => {
    try {
      await WorkService.approveWork(token);
    } catch (error: any) {
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        return finalizeSubmissionApproval(token, attempt + 1);
      }
      // Decisão do orientador já está salva; só avisa que a aprovação final falhou.
      console.error("Falha ao finalizar aprovação do trabalho após aceite do orientador:", error);
      showMessage(
        'Orientação aceita, mas houve falha ao concluir a aprovação do trabalho. Recarregue a página em instantes ou avise o suporte.',
        'error', 5000, 'top-right', 'light', false
      );
    }
  };

  const acceptAsAdvisor = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!state.value.verificationToken) throw new Error("Token de verificação não encontrado.");
      const data = await AcceptanceService.acceptAdvisorWork(state.value.verificationToken);
      if (data?.verification_token) {
        state.value.verificationToken = data.verification_token;
        await finalizeSubmissionApproval(data.verification_token);
      }
      showMessage('Orientação aceita com sucesso!', 'success', 2000, 'top-right', 'light', true)
      state.value.accepted = true;
      state.value.advisorStatus = 2; // 2 = aceito
      return true;
    } catch (error: any) {
      if (error.status === 404) {
        state.value.alreadyDecided = true;
        return false;
      }
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
      if (error.status === 404) {
        state.value.alreadyDecided = true;
        return false;
      }
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