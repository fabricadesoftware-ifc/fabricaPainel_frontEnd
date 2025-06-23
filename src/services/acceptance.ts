import api from "@/plugins/api";

class AcceptanceService {
  private handleError(error: any, action: string) {
    console.error(`Error during ${action}:`, error);
    throw new Error(`Failed to ${action} acceptance`);
  }

  async acceptCollaboratorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`/api/accept-collaborator-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "accept collaborator work");
    }
  }

  async rejectCollaboratorWork(verificationToken: string) {
    try {
      const { data } = await api.get(`/api/reject-collaborator-work/${verificationToken}/`);
      return data;
    } catch (error) {
      this.handleError(error, "reject collaborator work");
    }
  }
}

export default new AcceptanceService();