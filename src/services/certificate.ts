import api from "@/plugins/api";

class CertificateService {
  async getCertificates() {
    try {
      const { data } = await api.get("/certificates/");
      return data;
    } catch (error) {
      console.error("Error fetching certificates:", error);
      throw error;
    }
  }

  async getCertificatesByHash(hash: string) {
    try {
      const { data } = await api.get(`/certificates/?hash_validate=${hash}`);
      return data;
    } catch (error) {
      console.error("Error fetching certificate by hash:", error);
      throw error;
    }
  }

  async downloadCertificate(year: number) {
    try {
      const response = await api.get(`/create-certificate/${year}/`, {
        responseType: "blob",
      });

      // Criar URL do blob e fazer download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificado_${year}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error("Error downloading certificate:", error);
      throw error;
    }
  }

  async verifyCertificate(hash: string) {
    try {
      const { data } = await api.get(`/verify-certificate/${hash}/`);
      return data;
    } catch (error) {
      console.error("Error validating certificate:", error);
      throw error;
    }
  }
}

export default new CertificateService();
