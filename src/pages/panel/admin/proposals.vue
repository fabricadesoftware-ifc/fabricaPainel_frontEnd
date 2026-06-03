<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";
import EditionsService from "@/services/editions";
import WorkService from "@/services/works";
import { useAuth } from "@/stores/auth";
import type { IEdition } from "@/interfaces/edition";

type KanbanUser = {
  id: number | string
  name?: string
  email?: string
}

type KanbanTimelineEvent = {
  source: "work" | "collaborator"
  event: string
  date: string
  actor?: KanbanUser | null
  status?: number
  status_label?: string
  advisor_status?: number
  advisor_status_label?: string
  collaborator?: KanbanUser | null
}

type KanbanCollaborator = {
  id: number | string
  status: number
  status_label: string
  collaborator: KanbanUser
}

type KanbanWork = {
  id: string
  title: string
  abstract?: string
  status: number
  status_label: string
  advisor_status: number
  advisor_status_label: string
  feedback?: string | null
  needs_changes_submission_work_date?: string | null
  advisor: KanbanUser
  team_members: KanbanUser[]
  collaborators: KanbanCollaborator[]
  has_collaborators: boolean
  timeline: KanbanTimelineEvent[]
  last_event?: KanbanTimelineEvent | null
}

type KanbanColumn = {
  key: string
  title: string
  count: number
  items: KanbanWork[]
}

type KanbanResponse = {
  edition: { id: number; year: number; edition_name: string } | null
  summary: Array<{ key: string; title: string; count: number }>
  columns: KanbanColumn[]
}

const router = useRouter();
const authStore = useAuth();

const editions = ref<IEdition[]>([]);
const selectedEdition = ref<number | string | null>(null);
const search = ref("");
const loading = ref(true);
const ready = ref(false);
const drawer = ref(false);
const boardRef = ref<HTMLElement | null>(null);
const selectedWork = ref<KanbanWork | null>(null);
const kanban = ref<KanbanResponse>({
  edition: null,
  summary: [],
  columns: [],
});

const canUseAdminKanban = computed(() => {
  return authStore.user?.user_type === "ADMIN" || Boolean(authStore.user?.is_management);
});

const editionOptions = computed(() => {
  return editions.value.map((edition) => ({
    title: `${edition.edition_name} (${edition.year})`,
    value: edition.id,
  }));
});

const totalWorks = computed(() => {
  return kanban.value.columns.reduce((total, column) => total + column.count, 0);
});

const hasWorks = computed(() => totalWorks.value > 0);

const columnAccent: Record<string, string> = {
  waiting_advisor: "#f59e0b",
  advisor_rejected: "#ef4444",
  needs_changes: "#6366f1",
  ready: "#0ea5e9",
  approved: "#16a34a",
  rejected: "#dc2626",
  expired: "#64748b",
};

const workStatusMeta: Record<number, { label: string; color: string }> = {
  1: { label: "Pendente", color: "amber-darken-2" },
  2: { label: "Aprovado", color: "green-darken-2" },
  3: { label: "Precisa de ajustes", color: "indigo-darken-2" },
  4: { label: "Rejeitado", color: "red-darken-2" },
  5: { label: "Expirado", color: "blue-grey" },
};

const inviteStatusMeta: Record<number, { label: string; color: string }> = {
  1: { label: "Pendente", color: "amber-darken-2" },
  2: { label: "Aceito", color: "green-darken-2" },
  3: { label: "Recusado", color: "red-darken-2" },
  4: { label: "Expirado", color: "blue-grey" },
};

function statusMeta(map: Record<number, { label: string; color: string }>, status: number) {
  return map[status] ?? { label: "Nao informado", color: "grey" };
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

async function loadEditions() {
  const data = await EditionsService.getEditions();
  editions.value = Array.isArray(data) ? data : [];

  const ordered = [...editions.value].sort((a, b) => {
    return Number(b.year) - Number(a.year) || Number(b.id) - Number(a.id);
  });
  const defaultEdition = ordered.find(isEditionOpen) ?? ordered[0];

  selectedEdition.value = defaultEdition?.id ?? null;
}

async function loadKanban() {
  loading.value = true;
  const data = await WorkService.getAdminKanban({
    edition: selectedEdition.value,
    search: search.value.trim(),
  });
  kanban.value = data;
  loading.value = false;
}

function openWork(work: KanbanWork) {
  selectedWork.value = work;
  drawer.value = true;
}

function formatPeople(users: KanbanUser[]) {
  if (!users.length) return "Sem estudantes";
  return users.map((user) => user.name || user.email).join(", ");
}

function formatDateTime(value?: string | null) {
  if (!value) return "Sem registro";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sem registro";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function scrollBoard(direction: -1 | 1) {
  const board = boardRef.value;
  if (!board) return;

  board.scrollBy({
    left: direction * Math.max(board.clientWidth * 0.75, 320),
    behavior: "smooth",
  });
}

let searchTimeout: ReturnType<typeof setTimeout> | null = null;

watch(selectedEdition, () => {
  if (ready.value) loadKanban();
});

watch(search, () => {
  if (!ready.value) return;
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadKanban();
  }, 300);
});

onMounted(async () => {
  if (!canUseAdminKanban.value) {
    router.push("/panel/works");
    return;
  }

  await loadEditions();
  ready.value = true;
  await loadKanban();
});
</script>

<template>
  <LayoutPanel>
    <v-container class="kanban-page" fluid>
      <div class="kanban-header">
        <div>
          <p class="kanban-eyebrow">Administrativo</p>
          <h1>Acompanhamento de propostas</h1>
        </div>
        <div class="kanban-header-actions">
          <v-chip color="primary" variant="tonal">
            {{ totalWorks }} propostas
          </v-chip>
          <v-btn
            color="primary"
            icon="mdi-refresh"
            variant="tonal"
            @click="loadKanban"
          >
            <v-icon icon="mdi-refresh" />
            <v-tooltip activator="parent" location="bottom">Atualizar</v-tooltip>
          </v-btn>
        </div>
      </div>

      <AdminNavigation />

      <div class="kanban-filters">
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
          label="Buscar por titulo, pessoa ou turma"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        />
      </div>

      <div v-if="loading" class="kanban-loading">
        <v-progress-circular color="primary" indeterminate size="48" />
      </div>

      <div v-else-if="!hasWorks" class="kanban-empty">
        <v-icon color="primary" icon="mdi-clipboard-text-search-outline" size="40" />
        <h2>Nenhuma proposta encontrada</h2>
        <p>Altere a edicao ou a busca para conferir outros registros.</p>
      </div>

      <template v-else>
        <div class="kanban-scroll-actions">
          <v-btn
            color="primary"
            icon="mdi-chevron-left"
            variant="tonal"
            @click="scrollBoard(-1)"
          >
            <v-icon icon="mdi-chevron-left" />
            <v-tooltip activator="parent" location="bottom">Mover para esquerda</v-tooltip>
          </v-btn>
          <v-btn
            color="primary"
            icon="mdi-chevron-right"
            variant="tonal"
            @click="scrollBoard(1)"
          >
            <v-icon icon="mdi-chevron-right" />
            <v-tooltip activator="parent" location="bottom">Mover para direita</v-tooltip>
          </v-btn>
        </div>

      <div ref="boardRef" class="kanban-board">
        <section
          v-for="column in kanban.columns"
          :key="column.key"
          class="kanban-column"
          :style="{ '--accent': columnAccent[column.key] || '#64748b' }"
        >
          <header class="kanban-column-header">
            <span>{{ column.title }}</span>
            <v-chip size="small" variant="tonal">{{ column.count }}</v-chip>
          </header>

          <div class="kanban-column-items">
            <button
              v-for="work in column.items"
              :key="work.id"
              class="kanban-card"
              type="button"
              @click="openWork(work)"
            >
              <span class="kanban-card-title">{{ work.title }}</span>

              <div class="kanban-card-chips">
                <v-chip
                  :color="statusMeta(workStatusMeta, work.status).color"
                  size="x-small"
                  variant="tonal"
                >
                  {{ statusMeta(workStatusMeta, work.status).label }}
                </v-chip>
                <v-chip
                  :color="statusMeta(inviteStatusMeta, work.advisor_status).color"
                  size="x-small"
                  variant="outlined"
                >
                  Orientador {{ statusMeta(inviteStatusMeta, work.advisor_status).label.toLowerCase() }}
                </v-chip>
              </div>

              <div class="kanban-card-row">
                <v-icon icon="mdi-account-school-outline" size="16" />
                <span>{{ formatPeople(work.team_members) }}</span>
              </div>
              <div class="kanban-card-row">
                <v-icon icon="mdi-account-tie-outline" size="16" />
                <span>{{ work.advisor?.name || work.advisor?.email }}</span>
              </div>

              <div class="kanban-collaborators">
                <template v-if="work.has_collaborators">
                  <v-chip
                    v-for="link in work.collaborators"
                    :key="link.id"
                    :color="statusMeta(inviteStatusMeta, link.status).color"
                    size="x-small"
                    variant="tonal"
                  >
                    {{ link.collaborator?.name || link.collaborator?.email }}:
                    {{ statusMeta(inviteStatusMeta, link.status).label }}
                  </v-chip>
                </template>
                <v-chip v-else color="grey" size="x-small" variant="tonal">
                  Sem colaboradores indicados
                </v-chip>
              </div>

              <span class="kanban-last-event">
                {{ work.last_event?.event || "Sem historico registrado" }}
              </span>
            </button>

            <div v-if="column.count === 0" class="kanban-column-empty">
              Nenhuma proposta
            </div>
          </div>
        </section>
      </div>
      </template>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      width="520"
    >
      <div v-if="selectedWork" class="kanban-drawer">
        <div class="drawer-header">
          <div>
            <p class="kanban-eyebrow">Detalhes</p>
            <h2>{{ selectedWork.title }}</h2>
          </div>
          <v-btn icon="mdi-close" variant="text" @click="drawer = false">
            <v-icon icon="mdi-close" />
            <v-tooltip activator="parent" location="bottom">Fechar</v-tooltip>
          </v-btn>
        </div>

        <section class="drawer-section">
          <h3>Status</h3>
          <div class="drawer-chip-row">
            <v-chip :color="statusMeta(workStatusMeta, selectedWork.status).color" variant="tonal">
              {{ statusMeta(workStatusMeta, selectedWork.status).label }}
            </v-chip>
            <v-chip :color="statusMeta(inviteStatusMeta, selectedWork.advisor_status).color" variant="outlined">
              Orientador {{ statusMeta(inviteStatusMeta, selectedWork.advisor_status).label }}
            </v-chip>
          </div>
        </section>

        <section class="drawer-section">
          <h3>Equipe</h3>
          <p>{{ formatPeople(selectedWork.team_members) }}</p>
        </section>

        <section class="drawer-section">
          <h3>Orientador</h3>
          <p>{{ selectedWork.advisor?.name || selectedWork.advisor?.email }}</p>
        </section>

        <section class="drawer-section">
          <h3>Colaboradores</h3>
          <div class="drawer-chip-row" v-if="selectedWork.has_collaborators">
            <v-chip
              v-for="link in selectedWork.collaborators"
              :key="link.id"
              :color="statusMeta(inviteStatusMeta, link.status).color"
              variant="tonal"
            >
              {{ link.collaborator?.name || link.collaborator?.email }}:
              {{ statusMeta(inviteStatusMeta, link.status).label }}
            </v-chip>
          </div>
          <p v-else>Sem colaboradores indicados.</p>
        </section>

        <section class="drawer-section" v-if="selectedWork.feedback">
          <h3>Feedback</h3>
          <p>{{ selectedWork.feedback }}</p>
        </section>

        <section class="drawer-section">
          <h3>Historico</h3>
          <div v-if="selectedWork.timeline.length" class="timeline">
            <div v-for="event in selectedWork.timeline" :key="`${event.date}-${event.event}`" class="timeline-item">
              <span class="timeline-dot" />
              <div>
                <strong>{{ event.event }}</strong>
                <p>{{ formatDateTime(event.date) }}</p>
                <p v-if="event.actor">por {{ event.actor.name || event.actor.email }}</p>
              </div>
            </div>
          </div>
          <p v-else>Sem historico registrado para esta proposta.</p>
        </section>
      </div>
    </v-navigation-drawer>
  </LayoutPanel>
</template>

<style scoped>
.kanban-page {
  min-height: 72vh;
  padding: 24px;
}

.kanban-header {
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.kanban-header h1,
.drawer-header h2 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.kanban-eyebrow {
  color: rgb(var(--v-theme-primary));
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 4px;
  text-transform: uppercase;
}

.kanban-header-actions,
.drawer-chip-row,
.kanban-card-chips,
.kanban-collaborators {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.kanban-filters {
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(220px, 320px) minmax(260px, 1fr);
  margin-bottom: 20px;
}

.kanban-scroll-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.kanban-loading,
.kanban-empty {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  min-height: 360px;
  text-align: center;
}

.kanban-empty h2 {
  font-size: 20px;
  margin: 0;
}

.kanban-empty p {
  color: rgba(var(--v-theme-on-surface), 0.68);
  margin: 0;
}

.kanban-board {
  display: grid;
  gap: 14px;
  grid-auto-columns: minmax(280px, 320px);
  grid-auto-flow: column;
  max-width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  padding-bottom: 16px;
  scroll-behavior: smooth;
  scrollbar-width: thin;
}

.kanban-board::-webkit-scrollbar {
  height: 12px;
}

.kanban-board::-webkit-scrollbar-track {
  background: rgba(var(--v-theme-surface-variant), 0.6);
  border-radius: 999px;
}

.kanban-board::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-primary));
  border: 3px solid rgba(var(--v-theme-surface-variant), 0.6);
  border-radius: 999px;
}

.kanban-column {
  background: rgba(var(--v-theme-surface), 1);
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  border-top: 4px solid var(--accent);
  min-height: 520px;
  padding: 12px;
}

.kanban-column-header {
  align-items: center;
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  margin-bottom: 12px;
}

.kanban-column-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kanban-card {
  background: rgba(var(--v-theme-background), 1);
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  text-align: left;
  width: 100%;
}

.kanban-card:hover {
  border-color: rgb(var(--v-theme-primary));
}

.kanban-card-title {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.kanban-card-row {
  align-items: flex-start;
  color: rgba(var(--v-theme-on-surface), 0.76);
  display: flex;
  gap: 6px;
  min-width: 0;
}

.kanban-card-row span,
.kanban-last-event {
  font-size: 13px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.kanban-last-event {
  color: rgba(var(--v-theme-on-surface), 0.62);
}

.kanban-column-empty {
  align-items: center;
  border: 1px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  color: rgba(var(--v-theme-on-surface), 0.58);
  display: flex;
  font-size: 13px;
  justify-content: center;
  min-height: 90px;
}

.kanban-drawer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.drawer-header {
  align-items: flex-start;
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.drawer-section {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding-bottom: 16px;
}

.drawer-section h3 {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 8px;
}

.drawer-section p {
  color: rgba(var(--v-theme-on-surface), 0.72);
  margin: 0;
  overflow-wrap: anywhere;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.timeline-item {
  display: grid;
  gap: 10px;
  grid-template-columns: 12px 1fr;
}

.timeline-dot {
  background: rgb(var(--v-theme-primary));
  border-radius: 50%;
  height: 10px;
  margin-top: 5px;
  width: 10px;
}

.timeline-item strong {
  display: block;
  font-size: 14px;
  margin-bottom: 2px;
}

.timeline-item p {
  font-size: 13px;
}

@media (max-width: 720px) {
  .kanban-page {
    padding: 16px;
  }

  .kanban-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .kanban-filters {
    grid-template-columns: 1fr;
  }
}
</style>
