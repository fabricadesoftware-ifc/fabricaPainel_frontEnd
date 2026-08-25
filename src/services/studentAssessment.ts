import api from "@/plugins/api";
import { buildApiError } from "@/utils/apiError";

class StudentAssessmentService {
  private handleError(error: any, fallbackMessage: string): never {
    console.error(`Error: ${fallbackMessage}`, error);
    throw buildApiError(error, fallbackMessage);
  }

  async getAssessments() {
    try {
      const { data } = await api.get("student-assessments/");

      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível carregar as notas dos estudantes.");
    }
  }

  async getAssessment(id: string, work_id: string) {
    try {
      const { data } = await api.get(
        `student-assessments/?student=${id}&work=${work_id}`
      );
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível carregar a nota do estudante.");
    }
  }

  async getAssessmentReport(edition_year: any) {
    try {
      const { data } = await api.get(`generate-assessment-report/${edition_year}/`, {
        responseType: "blob",
      });

      const fileURL = window.URL.createObjectURL(
        new Blob([data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "assessment_report.pdf"; // nome sugerido
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => window.URL.revokeObjectURL(fileURL), 1000);

      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível gerar o relatório de notas.");
    }
  }

  async createAssessment(assessment: any) {
    try {
      const { data } = await api.post("student-assessments/", assessment);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível salvar a nota do estudante.");
    }
  }

  async updateAssessment(id: string, assessment: any) {
    try {
      const { data } = await api.put(`student-assessments/${id}/`, assessment);
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar a nota do estudante.");
    }
  }

  async patchAssessment(id: string, partialData: any) {
    try {
      const { data } = await api.patch(
        `student-assessments/${id}/`,
        partialData
      );
      return data;
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar a nota do estudante.");
    }
  }

  async deleteAssessment(id: string) {
    try {
      await api.delete(`student-assessments/${id}/`);
    } catch (error) {
      this.handleError(error, "Não foi possível remover a nota do estudante.");
    }
  }
}

export default new StudentAssessmentService();
