<script setup>
import { useAuth } from "@/stores/auth";
import { showMessage } from "@/utils/toastify";

const authStore = useAuth();

const emits = defineEmits(["add-members"]);

const student = ref(null);
const selectedStudents = ref([]);

const users = computed(() => {
  const users_team = authStore.team?.team_members || [];
  const user_reject =
    authStore.team?.reject_tokens?.map((tm) => tm.user) || [];
  const user_pending =
    authStore.team?.tokens?.map((tm) => tm.user) || [];
  const selected = selectedStudents.value || [];
  return [
    ...users_team,
    ...user_reject,
    ...user_pending,
    ...selected,
  ];
})

const filteredStudents = computed(() => {
  return authStore.students.filter((s) => {
    return !users.value.map((u) => u.id).some((st) => st === s.id);
  });
});

function addMembers() {
  emits("add-members", selectedStudents.value);
  selectedStudents.value = [];
}

function addStudent(student) {
  if (6 - users.value.length < 1) {
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

function customFilter(item, queryText, itemText) {
  const search = queryText.toLowerCase();
  return (
    String(item.name).toLowerCase().includes(search) ||
    String(item.email).toLowerCase().includes(search)
  );
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

        <user-selected
          label="Aluno"
          user-type="STUDENT"
          :selected-users="users"
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

        <v-btn
          color="primary"
          @click="() => (addMembers(), (isActive.value = false))"
        >
          Adicionar Membros
        </v-btn>
      </v-card>
    </template>
  </v-dialog>
</template>
