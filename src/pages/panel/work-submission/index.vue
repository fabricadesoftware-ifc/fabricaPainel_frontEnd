<script setup>
import LayoutSteps from "@/components/LayoutSteps.vue";
import { useEdition } from "../../../stores/edition";
import { useAuth } from "@/stores/auth";
import { useCategory } from "@/stores/category";
import { useWork } from "@/stores/work";
import { useRouter } from "vue-router";

const editionStore = useEdition();
const categoryStore = useCategory();
const authStore = useAuth();
const workStore = useWork();
const router = useRouter();

const selectedCoAdvisor = ref();

const validateUserHasWork = async () => {
  try {
    await workStore.fetchUserWorks();
    if (workStore.userWorks.length > 0 || !authStore.isOpenForWork || authStore.user.user_type !== "STUDENT") {
      router.push("/panel");
    }
  } catch (error) {
    console.error(error);
  }
};

const sendWork = async () => {
  try {
    form.team = authStore?.userTeam?.id;
    await workStore.sendWork(form);
    router.push("/panel");
  } catch (error) {
    console.error(error);
  }
};

const form = reactive({
  title: "",
  abstract: "",
  field: [],
  evaluator: [],
  cross_cutting_theme: null,
  team: null,
  advisor: null,
  co_advisor: selectedCoAdvisor,
});

const inProgress = ref(false);

const addUser = (user) => {
  selectedCoAdvisor.value = user;
};

onMounted(() => {
  validateUserHasWork();
  editionStore.fetchCurrentEdition();
  categoryStore.getCrossCuttingThemes();
  categoryStore.getField();
  authStore.getStudents();
  authStore.getUserTeam();
});
</script>

<template>
  <LayoutSteps size="w-md-33" title="Enviar um trabalho">
    <v-form @submit.prevent="sendWork">
      <v-row>
        <v-col cols="12">
          <v-checkbox
            :class="!inProgress ? 'pb-8' : ''"
            label="Esta em andamento"
            v-model="inProgress"
            color="primary"
            hide-details
            density="compact"
            @update:model-value="
              (value) => {
                inProgress = value;
                if (!value) form.advisor = null;
              }
            "
          />
        </v-col>
        <v-expand-transition class="pb-8">
          <v-col cols="12" v-show="inProgress">
            <user-selected
              :selected-users="[]"
              :one="true"
              label="Orientador"
              user-type="TEACHER"
              rounded="xl"
              density="default"
              @add-user="(user) => (form.advisor = user.id)"
            />
          </v-col>
        </v-expand-transition>
        <v-col cols="12">
          <v-autocomplete
            v-model="form.cross_cutting_theme"
            clearable
            :items="categoryStore.crossCuttingThemes"
            label="Temas Transversais"
            rounded="xl"
            variant="outlined"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="form.title"
            label="Título"
            rounded="xl"
            variant="outlined"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="12">
          <user-selected
            v-if="!selectedCoAdvisor"
            label="Co-orientador"
            user-type="TEACHER"
            rounded="xl"
            class="mb-n5 mt-1"
            :selected-users="[]"
            @add-user="addUser"
          />
        </v-col>
        <v-col cols="12" sm="12" class="d-flex align-center justify-center">
          <v-text-field
            v-if="selectedCoAdvisor"
            v-model="selectedCoAdvisor.name"
            label="Co-orientador"
            clearable
            rounded="xl"
            variant="outlined"
            class="mt-n5 mb-n5"
            @click:clear="selectedCoAdvisor = null"
          />
        </v-col>
        <v-col cols="12" sm="12">
          <v-autocomplete
            v-model="form.field"
            chips
            clearable
            :items="categoryStore.field"
            label="Áreas de Conhecimento"
            multiple
            rounded="xl"
            variant="outlined"
            hide-details
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.abstract"
            auto-grow
            counter
            label="Resumo do Projeto"
            rounded="xl"
            rows="1"
            variant="outlined"
            hide-details
          />
        </v-col>
      </v-row>
      <v-btn block class="py-6" color="primary" rounded="xl" @click="sendWork">
        Confirmar
      </v-btn>
    </v-form>
  </LayoutSteps>
</template>

