import api from "@/plugins/api";
import { buildApiError } from "@/utils/apiError";

class WorkService {
  private handleError(error: any, fallbackMessage: string): never {
    console.error(`Error: ${fallbackMessage}`, error);
    throw buildApiError(error, fallbackMessage);
  }

  async sendWork(work: any) {
    try {
      const { data } = await api.post("/work/", work);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível enviar o trabalho.");
    }
  }

  async getWork(id: string) {
    try {
      const { data } = await api.get(`/work/${id}/`);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível carregar o trabalho.");
    }
  }

  async getWorks() {
    try {
      const { data } = await api.get("/work/");
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível carregar a lista de trabalhos.");
    }
  }

  async getAdminKanban(params: { edition?: string | number | null; search?: string } = {}) {
    try {
      const { data } = await api.get("/work/admin-kanban/", { params });
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível carregar o kanban administrativo.");
    }
  }

  async getAdminAdvisorProposalReportData(params: { edition?: string | number | null }) {
    try {
      const { data } = await api.get("/work/admin-advisor-report-data/", { params });
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível carregar o relatório de orientadores.");
    }
  }

  async downloadAdminAdvisorProposalReport(params: { edition?: string | number | null }) {
    try {
      const response = await api.get("/work/admin-advisor-report/", {
        params,
        responseType: "blob",
      });
      const disposition = response.headers["content-disposition"] || "";
      const filenameMatch = disposition.match(/filename="?([^";]+)"?/i);
      const filename = filenameMatch?.[1] || "relatorio_propostas_orientadores.pdf";
      const fileURL = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => window.URL.revokeObjectURL(fileURL), 1000);

      return response.data;
    } catch (error: any) {
      let message = "Não foi possível gerar o relatório. Tente novamente em instantes.";
      const payload = error?.response?.data;

      if (payload instanceof Blob) {
        const text = await payload.text();
        try {
          const parsed = JSON.parse(text);
          message = parsed.error || message;
        } catch {
          message = text || message;
        }
      } else if (payload?.error) {
        message = payload.error;
      }

      throw new Error(message);
    }
  }

  async getAdminTeamProposalReportData(params: { edition?: string | number | null }) {
    try {
      const { data } = await api.get("/work/admin-team-report-data/", { params });
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível carregar o relatório de equipes.");
    }
  }

  async downloadAdminTeamProposalReport(params: { edition?: string | number | null }) {
    try {
      const response = await api.get("/work/admin-team-report/", {
        params,
        responseType: "blob",
      });
      const disposition = response.headers["content-disposition"] || "";
      const filenameMatch = disposition.match(/filename="?([^";]+)"?/i);
      const filename = filenameMatch?.[1] || "relatorio_propostas_equipes.xlsx";
      const fileURL = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => window.URL.revokeObjectURL(fileURL), 1000);

      return response.data;
    } catch (error: any) {
      let message = "Não foi possível gerar o relatório. Tente novamente em instantes.";
      const payload = error?.response?.data;

      if (payload instanceof Blob) {
        const text = await payload.text();
        try {
          const parsed = JSON.parse(text);
          message = parsed.error || message;
        } catch {
          message = text || message;
        }
      } else if (payload?.error) {
        message = payload.error;
      }

      throw new Error(message);
    }
  }

  async getWorkByCrossCuttingTheme(crossCuttingTheme: string) {
    try {
      const { data } = await api.get(
        `/work/?cross_cutting_theme=${crossCuttingTheme}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível carregar os trabalhos.");
    }
  }

  async updateWork(workId: string, partialWorkData: any) {
    try {
      const { data } = await api.patch(`/work/${workId}/`, partialWorkData);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o trabalho.");
    }
  }

  async getUserWorks(userType: string, userId: string) {
    type userWorks = {
          advisor: Array<any>,
          collaborator: Array<any>,
          evaluator: Array<any>,
      }
    try {
      if (userType === "STUDENT") {
        const { data } = await api.get(`/work/?team_member_id=${userId}`);
        return data;
      } else if (userType === "TEACHER") {
        const works:userWorks = {
          advisor: [],
          collaborator: [],
          evaluator: [],
        }
        let response = await api.get(`/work/?advisor_id=${userId}`);
        response.data.forEach((item: any) => works.advisor.push(item));
        response = await api.get(`/work/?collaborator_id=${userId}`);
        response.data.forEach((item: any) => {
          if (!works.collaborator.find((work: any) => work.id === item.id)) works.collaborator.push(item);
        });
        response = await api.get(`/work/?evaluator_id=${userId}`);
        response.data.forEach((item: any) => {
          if (!works.evaluator.find((work: any) => work.id === item.id)) works.evaluator.push(item);
        });
        return works;
      }

      return null
    } catch (error) {
      this.handleError(error, "Não foi possível carregar seus trabalhos.");
    }
  }

  async approveWork(verification_token: string) {
    try {

      const { data } = await api.get(`/accept-submission/${verification_token}/`);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível aprovar o trabalho.");
    }
  }

  async rejectWork(verification_token: string) {
    try {
      const { data } = await api.get(`/reject-submission/${verification_token}/`);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível rejeitar o trabalho.");
    }
  }

  async cancelWork(id:String | Number, token: string) {
    try {
      const {data} = await api.delete(`/work/${id}/`, {
        headers: {Authorization: `Bearer: ${token} `}
      })
      return data
    } catch (error) {
      this.handleError(error, "Não foi possível cancelar a proposta.");
    }
  }
}

export default new WorkService();
