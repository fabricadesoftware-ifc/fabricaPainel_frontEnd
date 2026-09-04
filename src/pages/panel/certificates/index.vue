<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuth } from "@/stores/auth";
import { useWork } from "@/stores/work";
import { useCertificate } from "@/stores/certificate";
import { useDisplay } from "vuetify";

const authStore = useAuth();
const workStore = useWork();
const certificateStore = useCertificate();
const { width } = useDisplay();

const loading = ref(true);
const downloadingYear = ref<number | null>(null);

// Agrupa trabalhos por edição/ano - filtra trabalhos aprovados (status 2)
// cuja edição já foi finalizada (certificado só existe após o fim da edição)
const worksWithEditions = computed(() => {
  const works = workStore.userWorks || [];
  const today = new Date().toISOString().slice(0, 10);
  return works.filter((work: any) => {
    if (work.status !== 2) return false;
    const finalEventDate = work.edition?.final_event_date;
    return !!finalEventDate && finalEventDate <= today;
  });
});

// Verifica se já existe certificado para determinado trabalho
const hasCertificate = (workId: string) => {
  return certificateStore.certificates.some((cert) => cert.work_id === workId);
};

// Obtém o certificado de um trabalho
const getCertificateForWork = (workId: string) => {
  return certificateStore.certificates.find((cert) => cert.work_id === workId);
};

const handleDownloadCertificate = async (year: number) => {
  downloadingYear.value = year;
  try {
    await certificateStore.downloadCertificate(year);
  } catch (error) {
    console.error(error);
  } finally {
    downloadingYear.value = null;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

onMounted(async () => {
  loading.value = true;
  try {
    await workStore.fetchUserWorks(
      authStore.user?.user_type,
      authStore.user?.id,
    );
    await certificateStore.fetchCertificates();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <LayoutPanel>
    <v-container class="w-100">
      <v-btn
        href="/panel/works"
        style="box-shadow: none"
        class="mb-2 text-blue"
      >
        <v-icon icon="mdi-arrow-left mr-1"></v-icon> Voltar
      </v-btn>

      <div class="d-flex justify-space-between align-center mb-8">
        <h1
          class="font-weight-bold"
          :style="{ fontSize: width > 780 ? '40px' : '25px' }"
        >
          Meus Certificados
        </h1>
      </div>

      <div
        v-if="loading"
        class="d-flex justify-center align-center"
        style="min-height: 300px"
      >
        <v-progress-circular indeterminate color="primary" size="64" />
      </div>

      <div v-else-if="worksWithEditions.length === 0" class="text-center pa-10">
        <v-icon size="100" color="grey-lighten-1"
          >mdi-certificate-outline</v-icon
        >
        <h2 class="mt-5 text-grey">
          Você ainda não possui trabalhos aprovados
        </h2>
        <p class="text-grey-darken-1 mt-2">
          Certificados estarão disponíveis após a aprovação dos seus trabalhos
        </p>
      </div>

      <div
        v-else
        class="d-flex flex-column ga-5"
        :class="width > 780 ? 'px-16' : 'px-4'"
      >
        <v-card
          v-for="work in worksWithEditions"
          :key="work.id"
          class="pa-5"
          rounded="xl"
          variant="outlined"
        >
          <div class="d-flex justify-space-between align-center flex-wrap ga-4">
            <div class="d-flex flex-column ga-2">
              <h3 :style="{ fontSize: width > 780 ? '20px' : '16px' }">
                {{ work.title }}
              </h3>
              <p class="text-grey">
                {{
                  work.edition?.edition_name || `Edição ${work.edition?.year}`
                }}
              </p>
              <v-chip
                color="green"
                size="small"
                class="mt-1"
                style="width: fit-content"
              >
                Trabalho Aprovado
              </v-chip>
            </div>

            <div class="d-flex flex-column align-end ga-2">
              <template v-if="hasCertificate(work.id)">
                <v-chip
                  color="success"
                  prepend-icon="mdi-check-circle"
                  class="mb-2"
                >
                  Certificado Disponível
                </v-chip>
                <p class="text-grey text-caption">
                  Gerado em:
                  {{
                    formatDate(getCertificateForWork(work.id)?.created_at || "")
                  }}
                </p>
                <v-btn
                  color="primary"
                  variant="outlined"
                  :loading="downloadingYear === work.edition?.year"
                  @click="handleDownloadCertificate(work.edition?.year)"
                  prepend-icon="mdi-download"
                  size="small"
                >
                  Baixar Novamente
                </v-btn>
              </template>

              <template v-else>
                <v-btn
                  color="primary"
                  :loading="downloadingYear === work.edition?.year"
                  @click="handleDownloadCertificate(work.edition?.year)"
                  prepend-icon="mdi-download"
                >
                  Baixar Certificado
                </v-btn>
              </template>
            </div>
          </div>
        </v-card>
      </div>

      <!-- Informativo -->
      <v-alert
        class="mt-10"
        type="info"
        variant="tonal"
        rounded="xl"
        :class="width > 780 ? 'mx-16' : 'mx-4'"
      >
        <template #title>Informações sobre Certificados</template>
        <p class="mt-2">
          Os certificados são gerados automaticamente após a aprovação do seu
          trabalho. Clique em "Baixar Certificado" para obter o documento em
          PDF.
        </p>
      </v-alert>
    </v-container>
  </LayoutPanel>
</template>
