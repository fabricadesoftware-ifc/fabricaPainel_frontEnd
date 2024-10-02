<script setup>
import { useAuth } from "@/stores/auth";
import { showMessage } from "@/utils/toastify";

const authStore = useAuth();

const emits = defineEmits(["add-members"]);

const student = ref(null);
const selectedStudents = ref([]);
const filteredStudents = computed(() => {
  const users_team_ids = authStore.team?.team_members?.map((tm) => tm.id) || [];
  const user_reject_ids =
    authStore.team?.reject_tokens?.map((tm) => tm.user.id) || [];
  const user_pending_ids =
    authStore.team?.tokens?.map((tm) => tm.user.id) || [];
  const selected_ids = selectedStudents.value.map((s) => s.id) || [];
  const user_ids = [
    ...users_team_ids,
    ...user_reject_ids,
    ...user_pending_ids,
    ...selected_ids,
  ];

  return authStore.students.filter((s) => {
    return !user_ids.some((st) => st === s.id);
  });
});

function addMembers() {
  emits("add-members", selectedStudents.value);
  selectedStudents.value = [];
}

function addStudent(student) {
  const users_team_ids = authStore.team?.team_members?.map((tm) => tm.id) || [];
  const user_reject_ids =
    authStore.team?.reject_tokens?.map((tm) => tm.user.id) || [];
  const user_pending_ids =
    authStore.team?.tokens?.map((tm) => tm.user.id) || [];
  const selected_ids = selectedStudents.value.map((s) => s.id) || [];
  const user_ids = [
    ...users_team_ids,
    ...user_reject_ids,
    ...user_pending_ids,
    ...selected_ids,
  ];

  if (6 - user_ids.length < 1) {
    showMessage(
      "Você pode adicionar no máximo 6 membros",
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
});
</script>

<template>
  <v-dialog max-width="700px" min-width="400px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn variant="tonal" color="primary" v-bind="activatorProps">
        <v-icon>mdi-account-plus</v-icon>
        <span>Convidar</span>
      </v-btn>
    </template>

    <template #default="{ isActive }">
      <v-card variant="flat" rounded class="pa-6">
        <p class="text-h5">Convidar Membros</p>

        <v-divider class="my-4" />

        <v-autocomplete
          v-model="student"
          density="comfortable"
          hide-details="auto"
          item-title="name"
          item-value="id"
          :items="filteredStudents"
          label="Pesquisar alunos"
          variant="outlined"
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
                  @click="addStudent(item.raw)"
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
                      {{ s.name }}
                      {{ s.id == authStore.user.id ? "(Você)" : "" }}
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

        <v-btn color="primary" @click="() => (addMembers(), isActive.value = false)">
          Adicionar Membros
        </v-btn>
      </v-card>
    </template>
  </v-dialog>
</template>
