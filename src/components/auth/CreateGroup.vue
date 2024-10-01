<script setup>
import { useAuth } from "@/stores/auth";
import { useEdition } from "@/stores/edition";
import { showMessage } from "@/utils/toastify";

const emits = defineEmits(["changeLoading"]);

const authStore = useAuth();
const editionStore = useEdition();

const selectedStudents = ref([authStore.user]);
const student = ref(null);

const filteredStudents = computed(() => {
  return authStore.students.filter((s) => {
    return !selectedStudents.value.some((st) => st.id === s.id);
  });
});

async function createTeam() {
  emits("changeLoading", true);
  try {
    const newTeam = {
      team_members: selectedStudents.value.map((s) => s.id),
      sender_id: authStore.user.id,
    };
    await authStore.createTeam(newTeam);
    window.location.reload();
  } catch (error) {
    console.log(error);
    showMessage(
      error.response.data.error,
      "error",
      3000,
      "top-right",
      "light",
      false
    );
  }
  emits("changeLoading", false);
}

onMounted(async () => {
  await authStore.getStudents();
  await editionStore.fetchCurrentEdition();
});
</script>

<template>
  <v-sheet
    class="d-flex flex-column align-center py-10 ga-6 justify-center px-4 border rounded"
    max-width="800px"
    min-width="400px"
    rounded="xl"
    width="50%"
    v-if="editionStore.isOpenForGroup"
  >
    <p class="text-h5 text-uppercase font-weight-bold">
      Crie seu grupo e convide seus colegas!
    </p>

    <v-divider class="w-100" />

    <div class="w-50" style="max-width: 700px; min-width: 300px">
      <v-autocomplete
        v-model="student"
        density="comfortable"
        hide-details="auto"
        item-title="name"
        item-value="id"
        :items="filteredStudents"
        label="Pesquisar alunos"
        variant="outlined"
        @update:model-value="selectedStudents.push(student)"
      >
        <template #item="{ item }">
          <v-hover>
            <template #default="{ props, isHovering }">
              <v-list-item
                v-bind="props"
                class="pa-2 cursor-pointer"
                :class="{ 'bg-grey-lighten-2': isHovering }"
                :subtitle="item.raw.email"
                :title="item.title"
                @click="selectedStudents.push(item.raw)"
              />
            </template>
          </v-hover>
        </template>
      </v-autocomplete>

      <v-list class="w-100" style="height: 40vh">
        <v-list-item v-for="s in selectedStudents" :key="s.id" class="w-100">
          <div class="position-relative d-flex align-center ga-2 px-4 py-4">
            <v-icon
              v-if="s.id != authStore.user.id"
              class="cursor-pointer"
              color="grey-lighten-1"
              size="15"
              @click="
                selectedStudents = selectedStudents.filter(
                  (st) => st.id != s.id
                )
              "
            >
              mdi-close
            </v-icon>

            <div class="d-flex flex-column">
              <v-tooltip :text="s.name">
                <template #activator="{ props }">
                  <p
                    v-bind="props"
                    class="cursor-pointer text-uppercase text-caption font-weight-bold d-inline-block text-truncate"
                    style="max-width: 100%"
                  >
                    {{ s.name }} {{ s.id == authStore.user.id ? "(Você)" : "" }}
                  </p>
                </template>
              </v-tooltip>

              <p class="text-subtitle-2">
                {{ s.email }}
              </p>
            </div>
          </div>
          <v-divider />
        </v-list-item>
      </v-list>
    </div>

    <div
      class="w-50 d-flex align-center justify-end"
      style="max-width: 700px; min-width: 300px"
    >
      <v-btn color="primary" @click="createTeam"> Criar grupo </v-btn>
    </div>
  </v-sheet>

  <div v-else>
    <p>
      Você não pode criar um grupo agora. O periodo foi expirado.
    </p>
  </div>
</template>
