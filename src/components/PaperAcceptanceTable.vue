<script setup>
import { ref } from "vue";
import { Status } from "@/interfaces/work";
import { useWork } from "@/stores/work";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useAuth } from "@/stores/auth";

const authStore = useAuth();
const workStore = useWork();
const search = ref("");
const props = defineProps({
  title: String,
  works: Array,
});

const getColor = (name) => {
  if (name === 0) return "";
  if (name === 1) return "grey";
  if (name === 3) return "blue";
  return "green";
};

const selectedStatus = ref([]);
const selectedFields = ref([]);
const selectedThemes = ref([]);

const status = () => {
  const statusString = [];
  for (let i = 1; i <= 3; i++) {
    statusString.push(Status[i].replace(/_/g, " "));
  }
  return statusString;
};

const worksHeaders = [
  { title: "Status", key: "status" },
  { title: "Titulo do Trabalho", key: "title" },
  { title: "Área", key: "field" },
  { title: "Tema Transversal", key: "cross_cutting_theme" },
  { title: "Orientador", key: "advisor.name" },
  { title: "Coorientador", key: "co_advisor.name" },
];

const generatePDF = () => {
  if (props.works.length === 0) {
    alert("Não há trabalhos para gerar o PDF");
    return;
  }
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();

  doc.text(props.title, 14, 20);

  const tableData = props.works.map((work) => [
    Status[work.status].replace(/_/g, " "),
    work.title,
    work.field.map((field) => field.name).join(", "),
    work.cross_cutting_theme.name,
    workStore.coverteData(work.initial_submission_work_date),
  ]);

  doc.autoTable({
    head: [worksHeaders.map((header) => header.title)],
    body: tableData,
    startY: 30,
  });

  doc.save(`${props.title}.pdf`);
};
const works = computed(() => {
  return props.works.filter((work) => {
    // return selectedStatus.value.includes(Status[work.status].replace(/_/g, ' '))
    if (
      selectedStatus.value.length > 0 &&
      !selectedStatus.value.includes(Status[work.status].replace(/_/g, " "))
    ) {
      return false;
    }
    if (
      selectedFields.value.length > 0 &&
      !work.field.some((field) => selectedFields.value.includes(field.name))
    ) {
      return false;
    }
    if (
      selectedThemes.value.length > 0 &&
      !selectedThemes.value.includes(work.cross_cutting_theme.name)
    ) {
      return false;
    }
  if (authStore.user.user_type == "TEACHER" && (work?.co_advisor?.id !== authStore.user.id && work?.advisor?.id !== authStore.user.id)) {
      return false;
    }
    return true;
  });
});

const fields = computed(() => {
  const fields = [];
  props.works.forEach((work) => {
    work.field.forEach((field) => {
      if (!fields.includes(field.name)) fields.push(field.name);
    });
  });
  return fields;
});

const themes = computed(() => {
  const themes = [];
  props.works.forEach((work) => {
    if (!themes.includes(work.cross_cutting_theme.name)) {
      themes.push(work.cross_cutting_theme.name);
    }
  });
  return themes;
});
</script>

<template>
  <v-row>
    <v-col>
      <h1 class="text-h5 py-4 font-weight-bold">
        {{ props.title }}
      </h1>
      <v-text-field v-if="props.works.length > 1" v-model="search" class="pa-2" clearable hide-details label="Pesquisar"
        placeholder="Digite para pesquisar..." prepend-inner-icon="mdi-magnify" rounded="xl" variant="plain" />
      <div class="filters d-flex align-center" v-if="authStore.isLogged && authStore.user.user_type == 'TEACHER'">
        <v-select v-model="selectedStatus" class="pa-2" clearable hide-details :items="status()" label="Status"
          max-width="33%" multiple placeholder="Selecione o status" rounded="xl" variant="plain" />
        <v-select v-model="selectedFields" class="pa-2" clearable hide-details :items="fields" label="Área"
          max-width="33%" multiple placeholder="Selecione a área" rounded="xl" variant="plain" />
        <v-select v-model="selectedThemes" class="pa-2" clearable hide-details :items="themes" label="Tema Transversal"
          max-width="33%" multiple placeholder rounded="xl" variant="plain" />
      </div>

      <div class="rounded-xl">
        <v-data-table class="pa-2" :headers="worksHeaders" :items="works" :search="search">
          <!-- Conteúdo da tabela -->
          <template #item.name="{ item }">
            <v-btn class="pa-0 hover" color="primary" :to="'/panel/paper/:id'.replace(':id', item.id)" variant="text">
              {{ item.name }}
            </v-btn>
          </template>
          <template #item.status="{ item }">
            <div class="text-start">
              <v-chip :color="getColor(item.status)">
                {{ Status[item.status].replace(/_/g, " ") }}
              </v-chip>
            </div>
          </template>
          <template #item.initial_submission_work_date="{ item }">
            {{ workStore.coverteData(item.initial_submission_work_date) }}
          </template>
          <template #item.field="{ item }">
            {{ item.field.map((field) => field.name).join(", ") }}
          </template>
          <template #item.cross_cutting_theme="{ item }">
            {{ item.cross_cutting_theme.name }}
          </template>
          <template #item.title="{ item }">
            <v-btn class="pa-0 hover" color="primary" :to="'/panel/paper/:id'.replace(':id', item.id)" variant="text">
              {{ item.title }}
            </v-btn>
          </template>
        </v-data-table>
        <v-btn v-if="authStore.user.user_type === 'TEACHER'" block class="mt-4" color="blue" variant="outlined"
          @click="generatePDF">
          Baixar PDF
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.hover:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
