<script setup>
import { useAuth } from "@/stores/auth";
import { useEdition } from "@/stores/edition";
import { showMessage } from "@/utils/toastify";

const authStore = useAuth();
const editionStore = useEdition();
const loading = ref(false);

async function leaveTeam() {
  loading.value = true;
  try {
    const newTeam = {
      id: authStore.team.id,
      user_id: authStore.user.id,
      action: "leave",
    };

    await authStore.leaveTeam(newTeam);

    window.location.reload();
  } catch (error) {
    console.log(error);
    showMessage("Erro ao sair do grupo.", "error", 3000, "top-right", "light", false);
  }
  loading.value = false;
}

async function resendInvite(token, userId) {
  try {
    const newTeam = {
      user_id: userId,
      token: token,
      team_id: authStore.team.id,
    };
    await authStore.resendInvite(newTeam);
    showMessage("Convite reenviado.", "success", 3000, "top-right", "light", false);
  } catch (error) {
    console.log(error);
    showMessage("Erro ao reenviar convite.", "error", 3000, "top-right", "light", false);
  }
}

async function removeUser(user_id) {
  try {
    const data = {
      user_id: user_id,
      action: 'remove',
      id: authStore.team.id,
    }
    await authStore.updateTeam(data)
    if (authStore.user.team.length) {
    await authStore.getTeam(authStore.user.team[0]);
    }
  } catch (error) {
    console.log(error);
    showMessage("Erro ao remover usuário.", "error", 3000, "top-right", "light", false);
  }
}

async function addUser(user_id) {
  console.log('safa')
}

onMounted(async () => {
  loading.value = true;
  if (authStore.user.team.length) {
    await authStore.getTeam(authStore.user.team[0]);
  }
  await authStore.getStudents()
  await editionStore.fetchCurrentEdition()
  loading.value = false;
});
</script>

<template>
  <div v-if="loading" class="d-flex align-center justify-center h-100 w-100">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
  <v-main class="d-flex align-center justify-center h-100" v-else>
    <v-avatar
      class="position-absolute left-0 top-0 ma-4 d-flex align-center cursor-pointer"
      color="grey-lighten-4"
      @click="$router.push('/')"
    >
      <v-icon color="grey-darken-1"> mdi-arrow-left </v-icon>
    </v-avatar>

    <v-sheet
      v-if="authStore.user.team.length > 0"
      class="d-flex flex-column ga-2 pa-8 rounded-xl border"
      max-width="700px"
      min-width="400px"
      width="70vh"
    >
      <p class="text-h4">Meu grupo</p>
      <v-divider />

      <add-user-group v-if="editionStore.isOpenForGroup"@update:loading="(value) => loading = value" />

      <v-list class="bg-transparent d-flex flex-column ga-5">
        <user-list
          v-for="{ user } in authStore.team.accept_tokens"
          :key="user.id"
          :user="user"
        >
          <template #status>
            <v-chip
              v-if="user.id != authStore.user.id"
              class="position-absolute right-0 mx-2"
              color="primary"
              density="comfortable"
            >
              <div class="d-flex ga-2">
                <v-icon>mdi-check</v-icon>
                <p>Aceito</p>
              </div>
            </v-chip>
          </template>
        </user-list>

        <user-list
          v-if="editionStore.isOpenForGroup"
          v-for="{ user } in authStore.team.tokens"
          :key="user.id"
          :user="user"
        >
          <template #status>
            <v-chip
              v-if="user.id != authStore.user.id"
              class="position-absolute right-0 mx-2"
              color="warning"
              density="comfortable"
            >
              <div class="d-flex ga-2">
                <v-icon>mdi-timer-sand-empty</v-icon>
                <p>Pendente</p>
              </div>
            </v-chip>
          </template>
        </user-list>

        <user-list
          v-if="editionStore.isOpenForGroup"
          v-for="{ user, token } in authStore.team.reject_tokens"
          :key="user.id"
          :user="user"
        >
          <template #status>
            <div class="d-flex flex-column ga-2">
              <v-chip
                v-if="user.id != authStore.user.id"
                color="warning"
                density="comfortable"
                @click="resendInvite(token, user.id)"
              >
                <div class="d-flex ga-2 cursor-pointer">
                  <v-icon>mdi-reload</v-icon>
                  <p>Reeviar Email</p>
                </div>
              </v-chip>
              <v-chip
                v-if="user.id != authStore.user.id"
                color="error"
                density="comfortable"
                @click="removeUser(user.id)"
              >
                <div class="d-flex ga-2">
                  <v-icon>mdi-close</v-icon>
                  <p>Rejeitado</p>
                </div>
              </v-chip>
            </div>
          </template>
        </user-list>
      </v-list>

      <div class="w-100" style="max-width: 700px; min-width: 300px" v-if="editionStore.isOpenForGroup">
        <v-btn
          block
          class="rounded-lg"
          color="error"
          width="100px"
          @click="leaveTeam"
        >
          Sair do grupo
        </v-btn>
      </div>
    </v-sheet>

    <create-group v-else @change-loading="(value) => loading = value" />
  </v-main>
</template>
