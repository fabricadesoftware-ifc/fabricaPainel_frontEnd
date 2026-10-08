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

type TeacherWorkloadRow = {
  teacher: ReportUser | null
  advising_count: number
  advising_titles: string[]
  collaboration_count: number
  collaboration_titles: string[]
  total_count: number
}

type TeacherWorkloadReportData = {
  total_teachers: number
  groups: TeacherWorkloadRow[]
}

type ReportTab = "advisor" | "team" | "teacher";

// Com poucos grupos batendo na busca, abre todos sozinho; com muitos, deixa fechado.
const AUTO_OPEN_LIMIT = 12;

const router = useRouter();
const authStore = useAuth();

const editions = ref<IEdition[]>([]);
const selectedEdition = ref<number | string | null>(null);
const activeTab = ref<ReportTab>("advisor");
const search = ref("");
const debouncedSearch = ref("");
const loading = ref(true);

const loadingReport = ref(false);
const downloading = ref(false);
const reportData = ref<AdvisorReportData | null>(null);

const loadingTeamReport = ref(false);
const downloadingTeamReport = ref(false);
const teamReportData = ref<TeamReportData | null>(null);

const loadingTeacherReport = ref(false);
const downloadingTeacherReport = ref(false);
const teacherReportData = ref<TeacherWorkloadReportData | null>(null);

const advisorOpen = ref<string[]>([]);
const teacherExpanded = ref<string[]>([]);

const canUseAdminArea = computed(() => {
  return authStore.user?.user_type === "ADMIN" || Boolean(authStore.user?.is_management);
});

const editionOptions = computed(() => {
  return editions.value.map((edition) => ({
    title: `${edition.edition_name} (${edition.year})`,
    value: edition.id,
  }));
});

// Busca sem acento e sem diferenca de maiuscula, igual pra todas as abas.
function normalize(value?: string | null) {
  return (value ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

const query = computed(() => normalize(debouncedSearch.value.trim()));

function matches(...parts: Array<string | null | undefined>) {
  if (!query.value) return true;
  return parts.some((part) => normalize(part).includes(query.value));
}

function personLabel(user?: ReportUser | null) {
  return user?.name || user?.email || "Orientador nao informado";
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function isEditionOpen(edition: IEdition) {
  return Boolean(
    edition.is_active ||
    edition.is_open_for_submissions ||
    edition.is_open_for_advisors ||
    edition.is_open_for_evaluators ||
    edition.is_edition_running,
  );
}

/* ---------- Por orientador ---------- */

const reportAvailable = computed(() => Boolean(reportData.value?.available));
const reportMessage = computed(() => reportData.value?.message ?? "");
const totalWorks = computed(() => reportData.value?.total_works ?? 0);

const advisorKey = (group: AdvisorReportGroup) =>
  String(group.advisor?.id ?? personLabel(group.advisor));

const filteredAdvisorGroups = computed(() => {
  const groups = reportData.value?.groups ?? [];
  if (!query.value) return groups;

  return groups
    .map((group) => {
      const advisorHit = matches(personLabel(group.advisor), group.advisor?.email);
      const rows = advisorHit
        ? group.rows
        : group.rows.filter((row) =>
            matches(
              row.title,
              row.team_members_label,
              row.classes_label,
              row.collaborators_label,
              ...(row.team_members ?? []).map((member) => personLabel(member)),
            ),
          );
      return { ...group, rows, count: rows.length };
    })
    .filter((group) => group.rows.length > 0);
});

const advisorShownWorks = computed(() =>
  filteredAdvisorGroups.value.reduce((total, group) => total + group.rows.length, 0),
);

/* ---------- Por equipe ---------- */

const totalTeamWorks = computed(() => teamReportData.value?.total_works ?? 0);

// Cada equipe costuma ter 1 trabalho so: agrupar por equipe vira 100+ grupos de 1 linha.
// Entao aqui e uma tabela unica (paginada e ordenavel), com a equipe como coluna.
const teamHeaders: any[] = [
  { title: "Trabalho", key: "title", sortable: true },
  { title: "Equipe", key: "team", sortable: true },
  { title: "Turma", key: "classes", sortable: true },
  { title: "Status do trabalho", key: "status", sortable: true },
  { title: "Orientador", key: "advisor", sortable: true },
  { title: "Status do orientador", key: "advisor_status", sortable: true },
  { title: "Data da submissao", key: "submitted_at", sortable: false },
];

const teamRows = computed(() => {
  const groups = teamReportData.value?.groups ?? [];

  return groups
    .flatMap((group) =>
      group.rows.map((row) => ({
        key: `${group.team_id}-${row.id}`,
        title: row.title,
        team: group.team_members_label,
        classes: group.classes_label,
        status: row.status_label,
        advisor: row.advisor_label,
        advisor_status: row.advisor_status_label,
        submitted_at: row.submitted_at || "-",
      })),
    )
    .filter((row) => matches(row.title, row.team, row.classes, row.advisor, row.status));
});

/* ---------- Por professor ---------- */

const teacherHeaders: any[] = [
  { title: "Professor", key: "name", sortable: true },
  { title: "Orientacoes", key: "advising_count", sortable: true, align: "end" },
  { title: "Colaboracoes", key: "collaboration_count", sortable: true, align: "end" },
  { title: "Total", key: "total_count", sortable: true, align: "end" },
  { title: "", key: "data-table-expand", sortable: false },
];

const teacherItems = computed(() => {
  const groups = teacherReportData.value?.groups ?? [];

  return groups
    .map((row) => ({
      key: String(row.teacher?.id ?? personLabel(row.teacher)),
      name: personLabel(row.teacher),
      email: row.teacher?.email,
      advising_count: row.advising_count,
      advising_titles: row.advising_titles ?? [],
      collaboration_count: row.collaboration_count,
      collaboration_titles: row.collaboration_titles ?? [],
      total_count: row.total_count,
    }))
    .filter((item) =>
      matches(item.name, item.email, ...item.advising_titles, ...item.collaboration_titles),
    );
});

const totalTeachers = computed(() => teacherReportData.value?.total_teachers ?? 0);

/* ---------- Carregamento (so a aba ativa, sob demanda) ---------- */

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
  if (!selectedEdition.value) return;

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

async function loadTeamReportData() {
  teamReportData.value = null;
  if (!selectedEdition.value) return;

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

async function loadTeacherReportData() {
  teacherReportData.value = null;
  if (!selectedEdition.value) return;

  loadingTeacherReport.value = true;
  try {
    teacherReportData.value = await WorkService.getAdminTeacherWorkloadReportData({
      edition: selectedEdition.value,
    });
  } catch (error) {
    showMessage("Nao foi possivel carregar o relatorio de orientacao e colaboracao.", "error", 3000, "top-right", "light", false);
  } finally {
    loadingTeacherReport.value = false;
  }
}

// Carrega a aba aberta se ainda nao tiver dados dessa edicao (ou se forcar).
async function loadActiveTab(force = false) {
  if (!selectedEdition.value) return;

  if (activeTab.value === "advisor" && (force || !reportData.value)) await loadReportData();
  if (activeTab.value === "team" && (force || !teamReportData.value)) await loadTeamReportData();
  if (activeTab.value === "teacher" && (force || !teacherReportData.value)) await loadTeacherReportData();
}

async function runDownload(
  setBusy: (busy: boolean) => void,
  action: () => Promise<unknown>,
) {
  if (!selectedEdition.value) return;

  setBusy(true);
  try {
    await action();
    showMessage("Relatorio gerado com sucesso.", "success", 2200, "top-right", "light", false);
  } catch (error: any) {
    showMessage(error?.message || "Nao foi possivel gerar o relatorio.", "error", 3500, "top-right", "light", false);
  } finally {
    setBusy(false);
  }
}

const downloadReport = () =>
  runDownload((busy) => (downloading.value = busy), () =>
    WorkService.downloadAdminAdvisorProposalReport({ edition: selectedEdition.value }),
  );

const downloadTeamReport = () =>
  runDownload((busy) => (downloadingTeamReport.value = busy), () =>
    WorkService.downloadAdminTeamProposalReport({ edition: selectedEdition.value }),
  );

const downloadTeacherReport = () =>
  runDownload((busy) => (downloadingTeacherReport.value = busy), () =>
    WorkService.downloadAdminTeacherWorkloadReport({ edition: selectedEdition.value }),
  );

/* ---------- Paineis abertos ---------- */

function expandAll() {
  if (activeTab.value === "advisor") advisorOpen.value = filteredAdvisorGroups.value.map(advisorKey);
}

function collapseAll() {
  advisorOpen.value = [];
}

function syncOpenPanelsWithSearch() {
  if (!query.value) {
    collapseAll();
    return;
  }

  advisorOpen.value =
    filteredAdvisorGroups.value.length <= AUTO_OPEN_LIMIT ? filteredAdvisorGroups.value.map(advisorKey) : [];
}

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(search, (value) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    debouncedSearch.value = value ?? "";
    syncOpenPanelsWithSearch();
  }, 250);
});

watch(selectedEdition, () => {
  if (loading.value) return;

  reportData.value = null;
  teamReportData.value = null;
  teacherReportData.value = null;
  collapseAll();
  loadActiveTab();
});

watch(activeTab, () => {
  loadActiveTab();
});

onMounted(async () => {
  if (!canUseAdminArea.value) {
    router.push("/panel/works");
    return;
  }

  await loadInitialData();
  await loadActiveTab();
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
          :disabled="loading"
          icon="mdi-refresh"
          variant="tonal"
          @click="loadActiveTab(true)"
        >
          <v-icon icon="mdi-refresh" />
          <v-tooltip activator="parent" location="bottom">Atualizar</v-tooltip>
        </v-btn>
      </div>

      <AdminNavigation />

      <div class="report-toolbar">
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
        <v-text-field
          v-model="search"
          clearable
          density="comfortable"
          hide-details
          label="Buscar por trabalho, professor, aluno ou turma"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        />
      </div>

      <v-tabs v-model="activeTab" class="report-tabs" color="primary">
        <v-tab value="advisor">
          Por orientador
          <v-chip v-if="reportData" class="ml-2" size="x-small" variant="tonal">{{ totalWorks }}</v-chip>
        </v-tab>
        <v-tab value="team">
          Por equipe
          <v-chip v-if="teamReportData" class="ml-2" size="x-small" variant="tonal">{{ totalTeamWorks }}</v-chip>
        </v-tab>
        <v-tab value="teacher">
          Por professor
          <v-chip v-if="teacherReportData" class="ml-2" size="x-small" variant="tonal">{{ totalTeachers }}</v-chip>
        </v-tab>
      </v-tabs>

      <v-alert
        v-if="!loading && !selectedEdition"
        class="mb-4"
        color="blue-grey"
        icon="mdi-alert-circle-outline"
        variant="tonal"
      >
        Selecione uma edicao.
      </v-alert>

      <!-- ===== Por orientador ===== -->
      <section v-if="activeTab === 'advisor'" class="report-surface">
        <div class="report-actions">
          <p class="report-summary">
            <template v-if="reportData && reportAvailable">
              <strong>{{ advisorShownWorks }}</strong> de {{ totalWorks }} trabalhos em
              <strong>{{ filteredAdvisorGroups.length }}</strong> orientadores
            </template>
            <template v-else>Relatorio completo da edicao, organizado por professor orientador.</template>
          </p>
          <div class="report-buttons">
            <v-btn
              v-if="reportAvailable && filteredAdvisorGroups.length"
              prepend-icon="mdi-unfold-more-horizontal"
              variant="text"
              @click="expandAll"
            >
              Expandir tudo
            </v-btn>
            <v-btn
              v-if="reportAvailable && filteredAdvisorGroups.length"
              prepend-icon="mdi-unfold-less-horizontal"
              variant="text"
              @click="collapseAll"
            >
              Recolher tudo
            </v-btn>
            <v-btn
              color="primary"
              :disabled="!reportAvailable || !selectedEdition"
              :loading="downloading"
              prepend-icon="mdi-file-pdf-box"
              @click="downloadReport"
            >
              Emitir PDF
            </v-btn>
          </div>
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

          <v-expansion-panels
            v-if="reportAvailable && filteredAdvisorGroups.length"
            v-model="advisorOpen"
            multiple
            variant="accordion"
          >
            <v-expansion-panel v-for="group in filteredAdvisorGroups" :key="advisorKey(group)" :value="advisorKey(group)">
              <v-expansion-panel-title>
                <div class="group-title">
                  <v-icon icon="mdi-account-tie-outline" size="20" />
                  <span class="group-name">{{ personLabel(group.advisor) }}</span>
                  <v-chip color="primary" size="small" variant="tonal">{{ group.count }} trabalhos</v-chip>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
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
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <div v-else-if="reportAvailable && selectedEdition" class="report-empty">
            <v-icon color="primary" icon="mdi-file-search-outline" size="44" />
            <p>{{ query ? "Nenhum resultado para a busca." : "Nenhum trabalho encontrado para esta edicao." }}</p>
          </div>

          <p v-if="reportData?.available_after" class="report-date">
            Disponivel a partir de {{ formatDate(reportData.available_after) }}
          </p>
        </template>
      </section>

      <!-- ===== Por equipe ===== -->
      <section v-else-if="activeTab === 'team'" class="report-surface">
        <div class="report-actions">
          <p class="report-summary">
            <template v-if="teamReportData">
              <strong>{{ teamRows.length }}</strong> de {{ totalTeamWorks }} trabalhos submetidos
            </template>
            <template v-else>Alunos que submeteram propostas e seus trabalhos, por equipe.</template>
          </p>
          <div class="report-buttons">
            <v-btn
              color="primary"
              :disabled="!selectedEdition"
              :loading="downloadingTeamReport"
              prepend-icon="mdi-file-excel-box"
              @click="downloadTeamReport"
            >
              Exportar XLSX
            </v-btn>
          </div>
        </div>

        <v-skeleton-loader v-if="loading || loadingTeamReport" type="table" />

        <template v-else-if="selectedEdition">
          <v-data-table
            density="comfortable"
            :headers="teamHeaders"
            item-value="key"
            :items="teamRows"
            :items-per-page="25"
            :items-per-page-options="[10, 25, 50, 100]"
            no-data-text="Nenhum trabalho encontrado."
          />
        </template>
      </section>

      <!-- ===== Por professor ===== -->
      <section v-else class="report-surface">
        <div class="report-actions">
          <p class="report-summary">
            <template v-if="teacherReportData">
              <strong>{{ teacherItems.length }}</strong> de {{ totalTeachers }} professores — abra a linha pra ver os trabalhos
            </template>
            <template v-else>Quantidade de trabalhos que cada professor orienta e nos quais colabora.</template>
          </p>
          <div class="report-buttons">
            <v-btn
              color="primary"
              :disabled="!selectedEdition"
              :loading="downloadingTeacherReport"
              prepend-icon="mdi-file-excel-box"
              @click="downloadTeacherReport"
            >
              Exportar XLSX
            </v-btn>
          </div>
        </div>

        <v-skeleton-loader v-if="loading || loadingTeacherReport" type="table" />

        <template v-else-if="selectedEdition">
          <v-data-table
            v-model:expanded="teacherExpanded"
            density="comfortable"
            :headers="teacherHeaders"
            item-value="key"
            :items="teacherItems"
            :items-per-page="25"
            :items-per-page-options="[10, 25, 50, 100]"
            no-data-text="Nenhum professor encontrado."
            show-expand
            :sort-by="[{ key: 'total_count', order: 'desc' }]"
          >
            <template #expanded-row="{ columns, item }">
              <tr class="teacher-expanded">
                <td :colspan="columns.length">
                  <div class="teacher-titles">
                    <div>
                      <p>Orienta ({{ item.advising_count }})</p>
                      <ul v-if="item.advising_titles.length">
                        <li v-for="title in item.advising_titles" :key="title">{{ title }}</li>
                      </ul>
                      <span v-else>Nenhum trabalho.</span>
                    </div>
                    <div>
                      <p>Colabora ({{ item.collaboration_count }})</p>
                      <ul v-if="item.collaboration_titles.length">
                        <li v-for="title in item.collaboration_titles" :key="title">{{ title }}</li>
                      </ul>
                      <span v-else>Nenhum trabalho.</span>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
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

.report-toolbar {
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(220px, 320px) minmax(260px, 1fr);
  margin-bottom: 16px;
}

.report-tabs {
  margin-bottom: 16px;
}

.report-surface {
  padding: 18px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 1);
}

.report-actions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 16px;
}

.report-summary {
  color: rgba(var(--v-theme-on-surface), 0.72);
  font-size: 0.94rem;
  margin: 0;
}

.report-buttons {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.group-title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 0;
}

.group-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  overflow-wrap: anywhere;
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

.teacher-titles {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  padding: 8px 0 12px;
}

.teacher-titles p {
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 6px;
  text-transform: uppercase;
}

.teacher-titles ul {
  margin: 0;
  padding-left: 18px;
}

.teacher-titles li {
  line-height: 1.4;
  overflow-wrap: anywhere;
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

  .reports-header {
    align-items: stretch;
    flex-direction: column;
  }

  .report-toolbar {
    grid-template-columns: 1fr;
  }

  .report-surface {
    padding: 12px;
  }
}
</style>
