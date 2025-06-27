import api from "@/plugins/api";

class AcceptanceService {
  private handleError(error: any, action: string) {
    console.error(`Error during ${action}:`, error);
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
      console.log(error)
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