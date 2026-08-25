import api from "@/plugins/api";
import { buildApiError } from "@/utils/apiError";

class AcceptanceService {
  private handleError(error: any, fallbackMessage: string): never {
    console.error(`Error: ${fallbackMessage}`, error);
    throw buildApiError(error, fallbackMessage);
  }

    async acceptAdvisorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`accept-advisor-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível aceitar a orientação.");
    }
  }

  async rejectAdvisorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`reject-advisor-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível recusar a orientação.");
    }
  }

  // Consulta informativa: quantas orientacoes o professor ja aceitou nesta edicao.
  // Serve so para a interface avisar antes do clique, entao uma falha aqui nao pode
  // derrubar a tela de decisao — devolve null e a tela segue sem o aviso.
  async getAdvisorWorkLimit(verificationToken: string) {
    try {
      const { data } = await api.get(`advisor-work-limit/${verificationToken}/`);
      return data;
    } catch (error) {
      console.error("Error during fetch advisor work limit:", error);
      return null;
    }
  }



  async acceptCollaboratorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`accept-collaborator-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível aceitar a colaboração.");
    }
  }

  async rejectCollaboratorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`reject-collaborator-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível recusar a colaboração.");
    }
  }
}

export default new AcceptanceService();