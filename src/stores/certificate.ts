import { defineStore } from "pinia";
import { ref } from "vue";
import CertificateService from "@/services/certificate";
import { showMessage } from "@/utils/toastify";

export interface ICertificate {
  id: number;
  user_id: number;
  work_id: string;
  hash_validate: string;
  created_at: string;
  updated_at: string;
}

export interface IValidationResult {
  year: number;
  user: string;
  work: string;
  hash_validate: string;
}

export const useCertificate = defineStore("certificate", () => {
  const certificates = ref<ICertificate[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const validationResult = ref<IValidationResult | null>(null);

  const fetchCertificates = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await CertificateService.getCertificates();
      certificates.value = data;
      return data;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const downloadCertificate = async (year: number) => {
    loading.value = true;
    error.value = null;
    try {
      await CertificateService.downloadCertificate(year);
      showMessage(
        "Certificado baixado com sucesso!",
        "success",
        3000,
        "top-right",
        "light",
        false,
      );
      await fetchCertificates();
      return true;
    } catch (err: any) {
      error.value = err.message;
      showMessage(
        "Erro ao baixar certificado",
        "error",
        3000,
        "top-right",
        "light",
        false,
      );
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const validateCertificate = async (hash: string) => {
    loading.value = true;
    error.value = null;
    validationResult.value = null;
    try {
      const data = await CertificateService.verifyCertificate(hash);
      validationResult.value = data;
      return data;
    } catch (err: any) {
      error.value = err.message;
      validationResult.value = null;
      showMessage(
        "Certificado não encontrado ou inválido",
        "error",
        3000,
        "top-right",
        "light",
        false,
      );
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearValidation = () => {
    validationResult.value = null;
    error.value = null;
  };

  return {
    certificates,
    loading,
    error,
    validationResult,
    fetchCertificates,
    downloadCertificate,
    validateCertificate,
    clearValidation,
  };
});
