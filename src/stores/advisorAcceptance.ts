import { defineStore } from "pinia";
import AcceptanceService from "@/services/acceptance";
import { useSessionStorage } from "@vueuse/core";
import { showMessage } from "@/utils/toastify";
import { useAuth } from "./auth";

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
  const user = authStore.user

  const setLoading = (loading: boolean) => {
    state.value.loading = loading;
  };

  const setError = (message: string | null) => {
    state.value.error = message;
  };

  const setAdvisorInfo = (work: any) => {
    // console.log("userId logado:", userId);
    // console.log("work_collaborators:", work.work_collaborator);
    
    // console.log("collab encontrado:", collab);
    // console.log("collab status:", collab?.status);
    // console.log("collab verification_token:", collab?.verification_token);
    if (work.advisor.id == user.id) {
      console.log('sim ddeu porra')
      state.value.isAdvisor = true;
      state.value.advisorStatus = work.advisor_status; // 1=pendente, 2=aceito, 3=cancelado
      state.value.verificationToken = work.verification_token;
    } else {
      state.value.isAdvisor = false;
      state.value.advisorStatus = null;
      state.value.verificationToken = "";
    }
  };

  const acceptAsAdvisor = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!state.value.verificationToken) throw new Error("Token de verificação não encontrado.");
      await AcceptanceService.acceptAdvisorWork(state.value.verificationToken);
      showMessage('Orientação aceita com sucesso!', 'success', 2000, 'top-right', 'light', true)
      state.value.accepted = true;
      state.value.advisorStatus = 1;
    } catch (error: any) {
      setError(error.message);
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
      state.value.advisorStatus = 2;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    setAdvisorInfo,
    acceptAsAdvisor,
    rejectAsAdvisor,
  };
});