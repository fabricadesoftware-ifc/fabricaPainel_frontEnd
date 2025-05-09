<script setup>
import { useAuth } from "@/stores/auth";
import { useEdition } from "@/stores/edition";
import { showMessage } from "@/utils/toastify";

const emits = defineEmits(["create-team"]);

const authStore = useAuth();
const editionStore = useEdition();

const selectedStudents = ref([authStore.user]);

function createTeam() {
  if (selectedStudents.value.length < 3) {
    showMessage(
      "Você precisa de pelo menos 3 membros para criar um grupo",
      "error",
      3000,
      "top-right",
      "light",
      false
    );
    return;
  }
  try {
    emits("create-team", selectedStudents.value);
    selectedStudents.value = [authStore.user];
  } catch (error) {
    console.log(error);
  }
}

function addStudent(student) {
  if (selectedStudents.value.length >= 6) {
    showMessage(
      "Você pode adicionar no maximo 6 membros",
      "error",
      3000,
      "top-right",
      "light",
      false
    );
    return;
  }
  selectedStudents.value.push(student);
}

onMounted(async () => {
  await authStore.getStudents();
  await editionStore.fetchCurrentEdition();
  await authStore.getUserInfo();
});
</script>

<template>
  <v-sheet
    class="d-flex flex-column align-center py-10 ga-6 justify-center px-4 border rounded"
    max-width="700px"
    min-width="300px"
    rounded="xl"
    width="90%"
    v-if="editionStore.isOpenForGroup"
  >
    <p class="text-h5 text-uppercase font-weight-bold" style="word-break: break-word;">
      Crie seu grupo e convide seus colegas!
    </p>

    <v-divider class="w-100" />

    <div class="w-50" style="max-width: 700px; min-width: 300px">
      <user-selected
        label="Aluno"
        :max="6"
        user-type="STUDENT"
        :selected-users="selectedStudents"
        @add-user="addStudent"
      />

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
    <p>Você não pode criar um grupo agora. O periodo foi expirado.</p>
  </div>
</template>
