<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";
import EditionsService from "@/services/editions";
import WorkService from "@/services/works";
import { useAuth } from "@/stores/auth";
import { showMessage } from "@/utils/toastify";
import type { IEdition } from "@/interfaces/edition";

type ReportUser = {
  id: number | string
  name?: string
  email?: string
}

type ReportTeamMember = ReportUser & {
  classes_label: string
}

type AdvisorReportRow = {
  id: string
  title: string
  team_members: ReportTeamMember[]
  team_members_label: string
  classes_label: string
  collaborators: ReportUser[]
  collaborators_label: string
}

type AdvisorReportGroup = {
  advisor: ReportUser | null
  count: number
  rows: AdvisorReportRow[]
}

type AdvisorReportData = {
  available: boolean
  available_after?: string | null
  message?: string | null
  total_works: number
  groups: AdvisorReportGroup[]
}

type TeamReportRow = {
  id: string
  title: string
  status_label: string
  advisor_label: string
  advisor_status_label: string
  submitted_at?: string | null
}

type TeamReportGroup = {
  team_id: number | string
  team_members: ReportTeamMember[]
  team_members_label: string
  classes_label: string
  count: number
  rows: TeamReportRow[]
}

type TeamReportData = {
  total_works: number
  groups: TeamReportGroup[]
}

const router = useRouter();
const authStore = useAuth();

const editions = ref<IEdition[]>([]);
const selectedEdition = ref<number | string | null>(null);
const loading = ref(true);
const loadingReport = ref(false);
const downloading = ref(false);
const reportData = ref<AdvisorReportData | null>(null);

const loadingTeamReport = ref(false);
const downloadingTeamReport = ref(false);
const teamReportData = ref<TeamReportData | null>(null);

const canUseAdminArea = computed(() => {
  return authStore.user?.user_type === "ADMIN" || Boolean(authStore.user?.is_management);
});

const editionOptions = computed(() => {
  return editions.value.map((edition) => ({
    title: `${edition.edition_name} (${edition.year})`,
    value: edition.id,
  }));
});

const reportGroups = computed(() => reportData.value?.groups ?? []);
const totalWorks = computed(() => reportData.value?.total_works ?? 0);
const reportAvailable = computed(() => Boolean(reportData.value?.available));
const reportMessage = computed(() => reportData.value?.message ?? "");

const teamReportGroups = computed(() => teamReportData.value?.groups ?? []);
const totalTeamWorks = computed(() => teamReportData.value?.total_works ?? 0);

function isEditionOpen(edition: IEdition) {
  return Boolean(
    edition.is_active ||
    edition.is_open_for_submissions ||
    edition.is_open_for_advisors ||
    edition.is_open_for_evaluators ||
    edition.is_edition_running,
  );
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function personLabel(user?: ReportUser | null) {
  return user?.name || user?.email || "Orientador nao informado";
}

async function loadInitialData() {
  loading.value = true;
  const editionData = await EditionsService.getEditions();

  editions.value = Array.isArray(editionData) ? editionData : [];

  const orderedEditions = [...editions.value].sort((a, b) => {
    return Number(b.year) - Number(a.year) || Number(b.id) - Number(a.id);
  });
  selectedEdition.value = (orderedEditions.find(isEditionOpen) ?? orderedEditions[0])?.id ?? null;
  loading.value = false;
}

async function loadReportData() {
  reportData.value = null;

  if (!selectedEdition.value) {
    return;
  }

  loadingReport.value = true;
  try {
    reportData.value = await WorkService.getAdminAdvisorProposalReportData({
      edition: selectedEdition.value,
    });
  } catch (error) {
    showMessage("Nao foi possivel carregar o relatorio.", "error", 3000, "top-right", "light", false);
  } finally {
    loadingReport.value = false;
  }
}

async function downloadReport() {
  if (!selectedEdition.value) return;

  downloading.value = true;
  try {
    await WorkService.downloadAdminAdvisorProposalReport({
      edition: selectedEdition.value,
    });
    showMessage("Relatorio gerado com sucesso.", "success", 2200, "top-right", "light", false);
  } catch (error: any) {
    showMessage(error?.message || "Nao foi possivel gerar o relatorio.", "error", 3500, "top-right", "light", false);
  } finally {
    downloading.value = false;
  }
}

async function loadTeamReportData() {
  teamReportData.value = null;

  if (!selectedEdition.value) {
    return;
  }

  loadingTeamReport.value = true;
  try {
    teamReportData.value = await WorkService.getAdminTeamProposalReportData({
      edition: selectedEdition.value,
    });
  } catch (error) {
    showMessage("Nao foi possivel carregar o relatorio por equipe.", "error", 3000, "top-right", "light", false);
  } finally {
    loadingTeamReport.value = false;
  }
}

async function downloadTeamReport() {
  if (!selectedEdition.value) return;

  downloadingTeamReport.value = true;
  try {
    await WorkService.downloadAdminTeamProposalReport({
      edition: selectedEdition.value,
    });
    showMessage("Relatorio gerado com sucesso.", "success", 2200, "top-right", "light", false);
  } catch (error: any) {
    showMessage(error?.message || "Nao foi possivel gerar o relatorio.", "error", 3500, "top-right", "light", false);
  } finally {
    downloadingTeamReport.value = false;
  }
}

async function loadAllReports() {
  await Promise.all([loadReportData(), loadTeamReportData()]);
}

watch(selectedEdition, () => {
  if (!loading.value) {
    loadAllReports();
  }
});

onMounted(async () => {
  if (!canUseAdminArea.value) {
    router.push("/panel/works");
    return;
  }

  await loadInitialData();
  await loadAllReports();
});
</script>

<template>
  <LayoutPanel>
    <v-container class="reports-page" fluid>
      <div class="reports-header">
        <div>
          <p class="reports-eyebrow">Administrativo</p>
          <h1>Relatorios</h1>
        </div>
        <v-btn
          color="primary"
          :disabled="loading || loadingReport"
          icon="mdi-refresh"
          variant="tonal"
          @click="loadReportData"
        >
          <v-icon icon="mdi-refresh" />
          <v-tooltip activator="parent" location="bottom">Atualizar</v-tooltip>
        </v-btn>
      </div>

      <AdminNavigation />

      <section class="report-surface">
        <div class="report-title-row">
          <div>
            <h2>Propostas por orientador</h2>
            <p>Relatorio completo da edicao organizado por professor orientador.</p>
          </div>
          <v-chip color="primary" variant="tonal">
            {{ totalWorks }} trabalhos
          </v-chip>
        </div>

        <div class="report-filters">
          <v-select
            v-model="selectedEdition"
            density="comfortable"
            hide-details
            item-title="title"
            item-value="value"
            :items="editionOptions"
            label="Edicao"
            prepend-inner-icon="mdi-calendar"
            variant="outlined"
          />
          <v-btn
            class="report-download"
            color="primary"
            :disabled="!reportAvailable || !selectedEdition"
            :loading="downloading"
            prepend-icon="mdi-file-pdf-box"
            @click="downloadReport"
          >
            Emitir PDF
          </v-btn>
        </div>

        <v-skeleton-loader v-if="loading || loadingReport" type="table" />

        <template v-else>
          <v-alert
            v-if="!reportAvailable && reportMessage"
            class="mb-4"
            color="amber"
            icon="mdi-lock-clock"
            variant="tonal"
          >
            {{ reportMessage }}
          </v-alert>

          <v-alert
            v-else-if="!selectedEdition"
            class="mb-4"
            color="blue-grey"
            icon="mdi-alert-circle-outline"
            variant="tonal"
          >
            Selecione uma edicao.
          </v-alert>

          <div v-if="reportAvailable && reportGroups.length" class="advisor-groups">
            <section v-for="group in reportGroups" :key="personLabel(group.advisor)" class="advisor-group">
              <div class="advisor-group-header">
                <div>
                  <p>Orientador</p>
                  <h3>{{ personLabel(group.advisor) }}</h3>
                </div>
                <v-chip color="primary" size="small" variant="tonal">
                  {{ group.count }} trabalhos
                </v-chip>
              </div>

              <div class="report-table-wrap">
                <v-table density="comfortable">
                  <thead>
                    <tr>
                      <th>Titulo do trabalho</th>
                      <th>Equipe / turma</th>
                      <th>Turmas envolvidas</th>
                      <th>Colaborador</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in group.rows" :key="row.id">
                      <td>{{ row.title }}</td>
                      <td>
                        <div v-if="row.team_members?.length" class="team-members">
                          <div v-for="member in row.team_members" :key="member.id" class="team-member">
                            <span>{{ personLabel(member) }}</span>
                            <v-chip color="blue-grey" size="small" variant="tonal">
                              {{ member.classes_label }}
                            </v-chip>
                          </div>
                        </div>
                        <span v-else>{{ row.team_members_label }}</span>
                      </td>
                      <td>{{ row.classes_label }}</td>
                      <td>{{ row.collaborators_label }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </section>
          </div>

          <div v-else-if="reportAvailable" class="report-empty">
            <v-icon color="primary" icon="mdi-file-search-outline" size="44" />
            <p>Nenhum trabalho encontrado para esta edicao.</p>
          </div>

          <p v-if="reportData?.available_after" class="report-date">
            Disponivel a partir de {{ formatDate(reportData.available_after) }}
          </p>
        </template>
      </section>

      <section class="report-surface">
        <div class="report-title-row">
          <div>
            <h2>Propostas submetidas por equipe</h2>
            <p>Alunos que submeteram propostas e seus trabalhos, agrupados por equipe. Disponivel a qualquer momento.</p>
          </div>
          <v-chip color="primary" variant="tonal">
            {{ totalTeamWorks }} trabalhos
          </v-chip>
        </div>

        <div class="report-filters">
          <v-select
            v-model="selectedEdition"
            density="comfortable"
            hide-details
            item-title="title"
            item-value="value"
            :items="editionOptions"
            label="Edicao"
            prepend-inner-icon="mdi-calendar"
            variant="outlined"
          />
          <v-btn
            class="report-download"
            color="primary"
            :disabled="!selectedEdition"
            :loading="downloadingTeamReport"
            prepend-icon="mdi-file-excel-box"
            @click="downloadTeamReport"
          >
            Exportar XLSX
          </v-btn>
        </div>

        <v-skeleton-loader v-if="loading || loadingTeamReport" type="table" />

        <template v-else>
          <v-alert
            v-if="!selectedEdition"
            class="mb-4"
            color="blue-grey"
            icon="mdi-alert-circle-outline"
            variant="tonal"
          >
            Selecione uma edicao.
          </v-alert>

          <div v-if="teamReportGroups.length" class="advisor-groups">
            <section v-for="group in teamReportGroups" :key="group.team_id" class="advisor-group">
              <div class="advisor-group-header">
                <div>
                  <p>Equipe</p>
                  <h3>{{ group.team_members_label }}</h3>
                </div>
                <v-chip color="blue-grey" size="small" variant="tonal">
                  {{ group.classes_label }}
                </v-chip>
              </div>

              <div class="report-table-wrap">
                <v-table density="comfortable">
                  <thead>
                    <tr>
                      <th>Trabalho</th>
                      <th>Status do trabalho</th>
                      <th>Orientador</th>
                      <th>Status do orientador</th>
                      <th>Data da submissao</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in group.rows" :key="row.id">
                      <td>{{ row.title }}</td>
                      <td>{{ row.status_label }}</td>
                      <td>{{ row.advisor_label }}</td>
                      <td>{{ row.advisor_status_label }}</td>
                      <td>{{ row.submitted_at || "-" }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </section>
          </div>

          <div v-else-if="selectedEdition" class="report-empty">
            <v-icon color="primary" icon="mdi-file-search-outline" size="44" />
            <p>Nenhum trabalho encontrado para esta edicao.</p>
          </div>
        </template>
      </section>
    </v-container>
  </LayoutPanel>
</template>

<style scoped>
.reports-page {
  min-height: 72vh;
  padding: 24px;
}

.reports-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.reports-eyebrow {
  color: rgb(var(--v-theme-primary));
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 4px;
  text-transform: uppercase;
}

.reports-header h1 {
  color: rgba(var(--v-theme-on-surface), 1);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.report-surface {
  padding: 22px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 1);
}

.report-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.report-title-row h2 {
  color: rgba(var(--v-theme-on-surface), 1);
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.report-title-row p {
  color: rgba(var(--v-theme-on-surface), 0.68);
  margin: 4px 0 0;
  font-size: 0.94rem;
}

.report-filters {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) auto;
  gap: 12px;
  align-items: center;
  margin-bottom: 18px;
}

.report-download {
  min-height: 48px;
}

.advisor-groups {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.advisor-group {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  overflow: hidden;
}

.advisor-group-header {
  align-items: center;
  background: rgba(var(--v-theme-background), 1);
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 14px 16px;
}

.advisor-group-header p {
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 2px;
  text-transform: uppercase;
}

.advisor-group-header h3 {
  color: rgba(var(--v-theme-on-surface), 1);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.25;
  margin: 0;
}

.report-table-wrap {
  overflow: auto;
}

.report-table-wrap th {
  color: rgba(var(--v-theme-on-surface), 0.78);
  font-weight: 800;
  padding-bottom: 12px;
  padding-top: 12px;
  vertical-align: middle;
  white-space: nowrap;
}

.report-table-wrap td {
  color: rgba(var(--v-theme-on-surface), 1);
  line-height: 1.35;
  padding-bottom: 12px;
  padding-top: 12px;
  vertical-align: middle;
}

.team-members {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.team-member {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.report-empty {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: rgba(var(--v-theme-on-surface), 0.68);
  text-align: center;
}

.report-empty p,
.report-date {
  margin: 0;
}

.report-date {
  margin-top: 14px;
  color: rgba(var(--v-theme-on-surface), 0.68);
  font-size: 0.88rem;
}

@media (max-width: 760px) {
  .reports-page {
    padding: 16px;
  }

  .reports-header,
  .report-title-row,
  .advisor-group-header {
    align-items: stretch;
    flex-direction: column;
  }

  .report-filters {
    grid-template-columns: 1fr;
  }
}
</style>
