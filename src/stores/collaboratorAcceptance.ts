import { defineStore } from "pinia";
import AcceptanceService from "@/services/acceptance";
import { useAuth } from "./auth";
import { useSessionStorage } from "@vueuse/core";
import { showMessage } from "@/utils/toastify";

export const useCollaboratorAcceptance = defineStore("collaboratorAcceptance", () => {
  const state = useSessionStorage("collaboratorAcceptance", {
    loading: false,
    error: null as string | null,
    accepted: false,
    rejected: false,
    // Token não encontrado = decisão já tomada em outro lugar, não é erro pra retry.
    alreadyDecided: false,
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

  // Usado pela página /decidir-colaboracao/[token], que só tem o token da URL.
  const setToken = (token: string) => {
    state.value.verificationToken = token;
    state.value.accepted = false;
    state.value.rejected = false;
    state.value.alreadyDecided = false;
    state.value.error = null;
  };

  const setCollaboratorInfo = (work: any) => {
    const auth = useAuth();
    const userId = auth.user.id;
    const collab = work.work_collaborator?.find((c: any) => c.collaborator.id == userId);
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
      state.value.collaboratorStatus = 2; // 2 = aceito
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

  const rejectAsCollaborator = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!state.value.verificationToken) throw new Error("Token de verificação não encontrado.");

      await AcceptanceService.rejectCollaboratorWork(state.value.verificationToken);
         showMessage('Colaboração rejeitada com sucesso!', 'success', 2000, 'top-right', 'light', true)
      state.value.rejected = true;
      state.value.collaboratorStatus = 3; // 3 = cancelado/recusado
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
    setToken,
    setCollaboratorInfo,
    acceptAsCollaborator,
    rejectAsCollaborator,
  };
});