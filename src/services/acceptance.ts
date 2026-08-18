import api from "@/plugins/api";

class AcceptanceService {
  private handleError(error: any, action: string) {
    console.error(`Error during ${action}:`, error);
    // Propaga a mensagem real do backend (ex.: "fora do período de aceitação")
    // em vez de uma mensagem genérica, para o usuário entender o motivo real da falha.
    // Regras de negócio da nossa API vêm em "error", mas erros de permissão e
    // autenticação do DRF (403/401) vêm em "detail" — sem ler os dois, uma recusa
    // de permissão virava a mensagem generica em ingles, escondendo o motivo real.
    const response = error?.response;
    const backendMessage = response?.data?.error || response?.data?.detail;

    if (backendMessage) {
      throw new Error(backendMessage);
    }

    if (!response) {
      throw new Error(
        "Nao foi possivel conectar ao servidor. Verifique sua conexao e tente novamente."
      );
    }

    if (response.status >= 500) {
      throw new Error(
        "Erro interno no servidor ao registrar sua decisao. Avise a organizacao do evento."
      );
    }

    throw new Error(`Failed to ${action} acceptance`);
  }

    async acceptAdvisorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`accept-advisor-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "accept advisor work");
    }
  }

  async rejectAdvisorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`reject-advisor-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "reject advisor work");
    }
  }



  async acceptCollaboratorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`accept-collaborator-work/${verificationToken}/`);
      return data;
    } catch (error) {
   
      this.handleError(error, "accept collaborator work");
    }
  }

  async rejectCollaboratorWork(verificationToken: string) {
    
    try {
      const { data } = await api.get(`reject-collaborator-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "reject collaborator work");
    }
  }
}

export default new AcceptanceService();