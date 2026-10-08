<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import WorkService from "@/services/works";

type DetailUser = {
  id: number | string
  name?: string
  email?: string
}

type CriterionGrade = {
  key: string
  label: string
  weight: number
  grade: number
}

type DetailAssessment = {
  grade: string
  criterion_grades: CriterionGrade[]
  date_time?: string | null
}

type DetailMember = DetailUser & {
  classes_label: string
  advisor_assessment: DetailAssessment | null
  final_grade: string | null
  situation: string | null
}

type DetailEvaluator = {
  id: number | string
  user: DetailUser
  assessment: DetailAssessment | null
}

type DetailCollaborator = {
  id: number | string
  status: number
  status_label: string
  collaborator: DetailUser
}

type WorkDetail = {
  id: string
  title: string
  abstract: string
  status: number
  status_label: string
  advisor_status: number
  advisor_status_label: string
  integrated_project: boolean
  feedback?: string | null
  edition: { id: number; year: number; edition_name: string }
  cross_cutting_theme: string | null
  fields: string[]
  ods: string[]
  advisor: DetailUser | null
  weights: { work: number; student: number }
  evaluators: DetailEvaluator[]
  work_grade_average: string | null
  team_members: DetailMember[]
  collaborators: DetailCollaborator[]
}

const props = defineProps<{
  modelValue: boolean
  workId: string | null
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
}>();

const { smAndDown } = useDisplay();

const detail = ref<WorkDetail | null>(null);
const loading = ref(false);
const failed = ref(false);

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const workStatusColor: Record<number, string> = {
  1: "amber-darken-2",
  2: "green-darken-2",
  3: "indigo-darken-2",
  4: "red-darken-2",
  5: "blue-grey",
};

const inviteStatusColor: Record<number, string> = {
  1: "amber-darken-2",
  2: "green-darken-2",
  3: "red-darken-2",
  4: "blue-grey",
};

function userLabel(user?: DetailUser | null) {
  return user?.name || user?.email || "Nao informado";
}

// Detalhamento por criterio so quando tem mais de um (com um so, e igual a propria nota).
function hasBreakdown(assessment?: DetailAssessment | null) {
  return (assessment?.criterion_grades?.length ?? 0) > 1;
}

function situationColor(situation: string | null) {
  if (situation === "Aprovado") return "green-darken-2";
  if (situation === "Reprovado") return "red-darken-2";
  return "grey";
}

async function load() {
  if (!props.workId) return;

  loading.value = true;
  failed.value = false;
  detail.value = null;
  try {
    detail.value = await WorkService.getAdminWorkDetail(props.workId);
  } catch (error) {
    failed.value = true;
  } finally {
    loading.value = false;
  }
}

watch(
  () => [props.modelValue, props.workId] as const,
  ([isOpen, workId]) => {
    if (isOpen && workId) load();
  },
  { immediate: true },
);
</script>

<template>
  <v-dialog v-model="open" :fullscreen="smAndDown" max-width="920" scrollable>
    <v-card>
      <v-card-title class="detail-header">
        <div class="detail-header-text">
          <p class="detail-eyebrow">Visao completa do trabalho</p>
          <h2>{{ detail?.title ?? "Carregando..." }}</h2>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="open = false">
          <v-icon icon="mdi-close" />
          <v-tooltip activator="parent" location="bottom">Fechar</v-tooltip>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="detail-body">
        <div v-if="loading" class="detail-state">
          <v-progress-circular color="primary" indeterminate size="44" />
        </div>

        <div v-else-if="failed" class="detail-state">
          <v-icon color="error" icon="mdi-alert-circle-outline" size="40" />
          <p>Nao foi possivel carregar este trabalho.</p>
          <v-btn color="primary" variant="tonal" @click="load">Tentar de novo</v-btn>
        </div>

        <template v-else-if="detail">
          <div class="detail-chips">
            <v-chip :color="workStatusColor[detail.status] ?? 'grey'" variant="tonal">
              {{ detail.status_label }}
            </v-chip>
            <v-chip :color="inviteStatusColor[detail.advisor_status] ?? 'grey'" variant="outlined">
              Orientador {{ detail.advisor_status_label.toLowerCase() }}
            </v-chip>
            <v-chip color="blue-grey" variant="tonal">{{ detail.edition.edition_name }}</v-chip>
            <v-chip v-if="detail.integrated_project" color="primary" variant="tonal">
              Projeto integrado
            </v-chip>
          </div>

          <section class="detail-section">
            <h3>Descricao da proposta</h3>
            <p class="detail-abstract">{{ detail.abstract }}</p>
          </section>

          <section class="detail-section">
            <div class="detail-tags">
              <div>
                <h3>Disciplinas</h3>
                <div class="detail-chips">
                  <v-chip v-for="field in detail.fields" :key="field" size="small" variant="tonal">{{ field }}</v-chip>
                  <span v-if="!detail.fields.length" class="detail-muted">Nenhuma.</span>
                </div>
              </div>
              <div>
                <h3>Tema transversal</h3>
                <v-chip v-if="detail.cross_cutting_theme" size="small" variant="tonal">
                  {{ detail.cross_cutting_theme }}
                </v-chip>
                <span v-else class="detail-muted">Nao informado.</span>
              </div>
              <div v-if="detail.ods.length">
                <h3>Objetivos de Desenvolvimento Sustentavel</h3>
                <div class="detail-chips">
                  <v-chip v-for="ods in detail.ods" :key="ods" size="small" variant="tonal">{{ ods }}</v-chip>
                </div>
              </div>
            </div>
          </section>

          <section class="detail-section">
            <div class="detail-section-title">
              <h3>Equipe e notas</h3>
              <span class="detail-muted">
                Nota final = orientador ({{ detail.weights.student }}%) + banca ({{ detail.weights.work }}%), aprovado com 6 ou mais
              </span>
            </div>

            <div class="detail-list">
              <article v-for="member in detail.team_members" :key="member.id" class="detail-card">
                <div class="detail-card-head">
                  <div>
                    <strong>{{ userLabel(member) }}</strong>
                    <p>{{ member.email }} · {{ member.classes_label }}</p>
                  </div>
                  <div class="detail-chips">
                    <v-chip
                      :color="member.advisor_assessment ? 'green-darken-2' : 'grey'"
                      label
                      size="small"
                      variant="tonal"
                    >
                      Nota do orientador: {{ member.advisor_assessment?.grade ?? "sem nota" }}
                    </v-chip>
                    <v-chip :color="situationColor(member.situation)" label size="small">
                      Nota final: {{ member.final_grade ?? "-" }}
                      <template v-if="member.situation"> · {{ member.situation }}</template>
                    </v-chip>
                  </div>
                </div>
                <ul v-if="hasBreakdown(member.advisor_assessment)" class="detail-breakdown">
                  <li v-for="criterion in member.advisor_assessment?.criterion_grades" :key="criterion.key">
                    {{ criterion.label }} ({{ criterion.weight }}%): <strong>{{ criterion.grade }}</strong>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <section class="detail-section">
            <div class="detail-section-title">
              <h3>Banca avaliadora</h3>
              <span v-if="detail.work_grade_average" class="detail-muted">
                Media da banca: {{ detail.work_grade_average }}
              </span>
            </div>

            <div class="detail-list">
              <article v-for="evaluator in detail.evaluators" :key="evaluator.id" class="detail-card">
                <div class="detail-card-head">
                  <div>
                    <strong>{{ userLabel(evaluator.user) }}</strong>
                    <p>{{ evaluator.user.email }}</p>
                  </div>
                  <v-chip
                    :color="evaluator.assessment ? 'green-darken-2' : 'grey'"
                    label
                    size="small"
                    variant="tonal"
                  >
                    Nota do trabalho: {{ evaluator.assessment?.grade ?? "sem nota" }}
                  </v-chip>
                </div>
                <ul v-if="hasBreakdown(evaluator.assessment)" class="detail-breakdown">
                  <li v-for="criterion in evaluator.assessment?.criterion_grades" :key="criterion.key">
                    {{ criterion.label }} ({{ criterion.weight }}%): <strong>{{ criterion.grade }}</strong>
                  </li>
                </ul>
              </article>
              <p v-if="!detail.evaluators.length" class="detail-muted">Nenhum avaliador definido.</p>
            </div>
          </section>

          <section class="detail-section">
            <h3>Orientador</h3>
            <article class="detail-card">
              <div class="detail-card-head">
                <div>
                  <strong>{{ userLabel(detail.advisor) }}</strong>
                  <p>{{ detail.advisor?.email }}</p>
                </div>
                <v-chip :color="inviteStatusColor[detail.advisor_status] ?? 'grey'" label size="small" variant="tonal">
                  {{ detail.advisor_status_label }}
                </v-chip>
              </div>
            </article>
          </section>

          <section class="detail-section">
            <h3>Colaboradores</h3>
            <div class="detail-list">
              <article v-for="link in detail.collaborators" :key="link.id" class="detail-card">
                <div class="detail-card-head">
                  <div>
                    <strong>{{ userLabel(link.collaborator) }}</strong>
                    <p>{{ link.collaborator?.email }}</p>
                  </div>
                  <v-chip :color="inviteStatusColor[link.status] ?? 'grey'" label size="small" variant="tonal">
                    {{ link.status_label }}
                  </v-chip>
                </div>
              </article>
              <p v-if="!detail.collaborators.length" class="detail-muted">Sem colaboradores indicados.</p>
            </div>
          </section>

          <section v-if="detail.feedback" class="detail-section">
            <h3>Feedback</h3>
            <p class="detail-abstract">{{ detail.feedback }}</p>
          </section>
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.detail-header {
  align-items: flex-start;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 18px 20px;
  white-space: normal;
}

.detail-header-text {
  min-width: 0;
}

.detail-header h2 {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
  margin: 0;
  overflow-wrap: anywhere;
}

.detail-eyebrow {
  color: rgb(var(--v-theme-primary));
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 4px;
  text-transform: uppercase;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 20px;
}

.detail-state {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  min-height: 260px;
  text-align: center;
}

.detail-chips {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-section h3 {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 8px;
  text-transform: uppercase;
}

.detail-section-title {
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  justify-content: space-between;
  margin-bottom: 8px;
}

.detail-section-title h3 {
  margin: 0;
}

.detail-muted {
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: 13px;
}

.detail-abstract {
  line-height: 1.5;
  margin: 0;
  overflow-wrap: anywhere;
  white-space: pre-line;
}

.detail-tags {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  padding: 12px 14px;
}

.detail-card-head {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  justify-content: space-between;
}

.detail-card-head p {
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: 13px;
  margin: 2px 0 0;
  overflow-wrap: anywhere;
}

.detail-breakdown {
  color: rgba(var(--v-theme-on-surface), 0.78);
  font-size: 13px;
  margin: 10px 0 0;
  padding-left: 18px;
}
</style>
