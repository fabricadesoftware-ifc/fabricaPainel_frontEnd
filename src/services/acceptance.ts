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

    // Status HTTP anexado pra store distinguir 404 (token já usado) de outras falhas.
    const buildError = (message: string) => {
      const err = new Error(message);
      (err as any).status = response?.status;
      return err;
    };

    if (backendMessage) {
      throw buildError(backendMessage);
    }

    if (!response) {
      throw buildError(
        "Nao foi possivel conectar ao servidor. Verifique sua conexao e tente novamente."
      );
    }

    if (response.status >= 500) {
      throw buildError(
        "Erro interno no servidor ao registrar sua decisao. Avise a organizacao do evento."
      );
    }

    throw buildError(`Failed to ${action} acceptance`);
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