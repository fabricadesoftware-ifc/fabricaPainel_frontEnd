import { defineStore } from "pinia";
import AcceptanceService from "@/services/acceptance";
import { useAuth } from "./auth";
import { useStorage } from "@vueuse/core";
import { showMessage } from "@/utils/toastify";

export const useCollaboratorAcceptance = defineStore("collaboratorAcceptance", () => {
  const state = useStorage("collaboratorAcceptance", {
    loading: false,
    error: null as string | null,
    accepted: false,
    rejected: false,
    collaboratorStatus: null as number | null, // 1=pendente, 2=aceito, 3=cancelado
    isCollaborator: false,
    verificationToken: "",
  });

  const setLoading = (loading: boolean) => {
    state.value.loading = loading;
  };

  const setError = (message: string | null) => {
    state.value.error = message;
  };

  const setCollaboratorInfo = (work: any) => {
    const auth = useAuth();
    const userId = auth.user.id;
    // console.log("userId logado:", userId);
    // console.log("work_collaborators:", work.work_collaborator);
    const collab = work.work_collaborator?.find((c: any) => c.collaborator.id == userId);
    // console.log("collab encontrado:", collab);
    // console.log("collab status:", collab?.status);
    // console.log("collab verification_token:", collab?.verification_token);
    if (collab) {
      state.value.isCollaborator = true;
      state.value.collaboratorStatus = collab.status; // 1=pendente, 2=aceito, 3=cancelado
      state.value.verificationToken = collab.verification_token;
    } else {
      state.value.isCollaborator = false;
      state.value.collaboratorStatus = null;
      state.value.verificationToken = "";
    }
  };

  const acceptAsCollaborator = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!state.value.verificationToken) throw new Error("Token de verificação não encontrado.");
      await AcceptanceService.acceptCollaboratorWork(state.value.verificationToken);
         showMessage('Colaboração aceita com sucesso!', 'success', 2000, 'top-right', 'light', true)
      state.value.accepted = true;
      state.value.collaboratorStatus = 1;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const rejectAsCollaborator = async () => {
    setLoading(true);
    setError(null);
    console.log(state.value.verificationToken)
    try {
      if (!state.value.verificationToken) throw new Error("Token de verificação não encontrado.");
      console.log('aq ta vindo')
      await AcceptanceService.rejectCollaboratorWork(state.value.verificationToken);
         showMessage('Colaboração rejeitada com sucesso!', 'success', 2000, 'top-right', 'light', true)
      state.value.rejected = true;
      state.value.collaboratorStatus = 2;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    setCollaboratorInfo,
    acceptAsCollaborator,
    rejectAsCollaborator,
  };
});