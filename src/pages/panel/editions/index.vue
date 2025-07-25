<script lang="ts" setup>
// @ts-ignore
import { computed, onMounted } from "vue";
// @ts-ignore
import { useRouter } from "vue-router";
import { useEdition } from "@/stores/edition";
import { useAuth } from "@/stores/auth";
import { useDisplay } from "vuetify";
import { IEdition } from "@/interfaces/edition";


const { user } = useAuth();
const {width} = useDisplay();
const { state, fetchEditions } = useEdition();
const router = useRouter();

// Corrigido para usar o 'id' em vez de 'edition_name'
const selectCard = (id: number) => {
  router.push(`/panel/editions/view/${id}`);
};



const formatDate = computed(() => {
  return (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateTime).toLocaleDateString("pt-BR", options);
  };
});

const openEdition = computed(() => {
  return state?.editions?.find((edition: { is_open: any; }) => edition.is_open);
});
//tem que ver se qa initial_submission_date será apos a data atual
const upcomingEditions = computed<IEdition[]>(() => {
  return state?.editions?.filter((edition: { initial_submission_date?: string | null }) => {
    if (!edition.initial_submission_date) return edition;
    return new Date(edition.initial_submission_date) > new Date();
  });
});

const closedEditions = computed<IEdition[]>(() => {
  return state?.editions?.filter((edition: { is_open: any, final_event_date?: string | null}) => !edition.is_open && !edition.final_event_date || new Date(edition.final_event_date ?? '') < new Date());
});

onMounted(() => {
  fetchEditions();
});
</script>

<template>
  <LayoutPanel>
     <v-container class="w-100">
    <div class="d-flex flex-row flex-wrap ga-4">
      <h1 :style="{fontSize: width > 780 ? '40px' : '32px'}">Edições</h1>
      <!-- Edição Futuras -->

      <div v-if="upcomingEditions?.length" class="mb-8 mt-10 w-100" :class="width > 780 ? 'px-16' : 'px-4'">
        <h2 class="mb-5">Edições Futuras</h2>
        <v-card :key="upcomingEditions[0]?.id"  class="border-md w-100" rounded="xl" variant="outlined">
          <div class="d-flex flex-column justify-space-between" style="padding: 40px;">
            <v-row style="justify-content: space-between; display: flex; align-items: center; min-height: 50px; gap: 15px;">
              <div>
                <h2 class="font-weight-bold text-h5">
                  {{ upcomingEditions[0]?.edition_name }}
                </h2>
              </div>
              <div>
                <p style="color: gray;">{{ formatDate(upcomingEditions[0]?.event_date ?? '') }} <span style="color: black;">até</span> {{ formatDate(upcomingEditions[0]?.final_event_date ?? '') }}</p>
              </div>
              <div>
                <v-chip class="text-capitalize bg-yellow" text-color="white">Em Breve</v-chip>
              </div>
              <div>
                <v-btn class="text-blue" style="display: flex; align-items: center; gap: 5px; cursor: pointer;" flat @click="selectCard(Number(upcomingEditions[0]?.id))"><img src="@/assets/icons/externalLink.svg" alt="">Ver Edição</v-btn>
              </div>
            </v-row>
          </div>
        </v-card>
      </div>


      <!-- Edição em aberto -->
      <div v-if="openEdition" class="mb-8 mt-10 w-100" :class="width > 780 ? 'px-16' : 'px-4'">
        <h2 class="mb-5">Edição em Aberto</h2>
        <v-card :key="openEdition?.id"  class="border-md w-100" rounded="xl" variant="outlined">
          <div class="d-flex flex-column justify-space-between" style="padding: 40px;">
            <v-row style="justify-content: space-between; display: flex; align-items: center; min-height: 50px; gap: 15px;">
              <div>
                <h2 class="font-weight-bold text-h5">
                  {{ openEdition?.edition_name }}
                </h2>
              </div>
              <div>
                <p style="color: gray;">{{ formatDate(openEdition?.event_date ?? '') }} <span style="color: black;">até</span> {{ formatDate(openEdition?.final_event_date ?? '') }}</p>
              </div>
              <div>
                <v-chip class="text-capitalize" color="#4ED700" text-color="white">Em Aberto</v-chip>
              </div>
              <div>
                <v-btn class="text-blue" style="display: flex; align-items: center; gap: 5px; cursor: pointer;" flat @click="selectCard(Number(openEdition?.id))"><img src="@/assets/icons/externalLink.svg" alt="">Ver Edição</v-btn>
              </div>
            </v-row>
          </div>
        </v-card>
      </div>

      <!-- Se não houver edição em aberto-->
      <div v-else-if="!openEdition && !upcomingEditions.length"  class="mb-8 mt-10 w-100 px-16" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <h1 :style="{fontSize: width > 780 ? '32px' : '20px'}" style="text-align: center;">Ainda não há uma edição cadastrada neste ano!</h1>
        <v-btn v-if="user?.user_type == 'ADMIN'" flat class="text-primary" to="/panel/editions/add" :style="{fontSize: width > 780 ? '20px' : '16px'}"><img src="@/assets/icons/AddIcon.svg" :style="{width: width > 780 ? '32px' : '20px'}" alt="">Cadastrar Edição</v-btn>
      </div>

      <!-- Demais edições -->
      <div class="mb-8 w-100" :class="width > 780 ? 'px-16' : 'px-4'" style="display: flex; flex-direction: column; gap: 20px;">
        <h2 v-if="closedEditions.length" class="mt-8 mb-5 w-100">Edições Anteriores</h2>
        <v-card v-for="edition in closedEditions.slice().reverse()" :key="edition.id" class="border-md w-100" rounded="xl"
          variant="outlined">
          <div class="d-flex flex-column justify-space-between" style="padding: 40px;">
            <v-row style="justify-content: space-between; display: flex; align-items: center; min-height: 50px; gap: 15px;">
              <div>
                <h2 class="font-weight-bold text-h5">
                  {{ edition.edition_name }}
                </h2>
              </div>
              <div>
                <p style="color: gray;">{{ formatDate(edition?.event_date ?? '') }} <span style="color: black;">até</span> {{ formatDate(edition?.final_event_date ?? '') }}</p>
              </div>
              <div>
                <v-chip class="text-capitalize bg-primary" text-color="white">Concluida</v-chip>
              </div>
              <div>
                <p class="text-blue" style="display: flex; align-items: center; gap: 5px; cursor: pointer;" @click="selectCard(Number(edition?.id))"><img src="@/assets/icons/externalLink.svg" alt=""> Ver Edição</p>
              </div>
            </v-row>
          </div>
        </v-card>
      </div>
    </div>
    </v-container>
  </LayoutPanel>
</template>
