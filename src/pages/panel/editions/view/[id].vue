<script lang="ts" setup>
// @ts-ignore
import { computed, onMounted, ref } from "vue";
// @ts-ignore
import { useRoute } from "vue-router";
import { useEdition } from "@/stores/edition";
import { IEdition } from "@/interfaces/edition";

const { state, fetchEditions } = useEdition();

const router = useRoute();
const id = ref(null);
const edition = ref<IEdition | null>(null);

const formatDate = computed(() => {
  return (dateTime: string | any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateTime || '').toLocaleDateString("pt-BR", options);
  };
});

onMounted(() => {
  fetchEditions().then(() => {
    // @ts-ignore
    id.value = router.params?.id;
    // @ts-ignore
    edition.value = state.editions.find((ed: any) => ed.id === Number(id.value));
  });
});

const textButton = ref('Ver Mais')
const seemore = ref(false)
function showinfo(){
  seemore.value = !seemore.value
  textButton.value = seemore.value ? 'Fechar' : 'Ver Mais'
}
const defaultBanner =
  "https://th.bing.com/th/id/OIP.MQJrIQeghQLdcs1uFBZHzwHaEp?rs=1&pid=ImgDetMain"; //reitrar
</script>

<template>
  <LayoutDashboard>
    <v-container>
      <v-btn href="/panel/editions" style="box-shadow: none;" class="mb-2 text-blue"> <v-icon icon="mdi-arrow-left mr-1"></v-icon> Voltar</v-btn>
      <template v-if="edition">
          <div class="h-100 d-flex flex-column justify-space-between pa-10">
            <h2 class="font-weight-bold text-h3 pt-2 mb-7 d-flex align-center" style="gap: 10px;">
              <!-- @vue-ignore -->
              {{ edition.edition_name }}
              <VChip v-if="edition.is_open" class="bg-blue d-flex justify-center align-center" pill style="width: 120px;">Em aberto</VChip>
              <VChip v-else class="bg-red d-flex justify-center align-center" pill style="width: 120px;">Encerrado</VChip>
            </h2>
            <v-row>
              <v-col class="d-flex flex-column ga-4 justify-start" cols="6">
                <span class="text-primary font-weight-bold">INFORMAÇÕES</span>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Nome:</span>
                  <span>{{ edition?.edition_name }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data do Evento:</span>
                  <span>{{ formatDate(edition?.event_date) }}</span>
                </row>
                <span class="text-primary font-weight-bold">PRAZOS E DATAS</span>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data de início de Submissão:</span>
                  <span>{{ formatDate(edition?.initial_submission_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data de fim de Submissão:</span>
                  <span>{{ formatDate(edition?.final_submission_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data de início de Avaliações:</span>
                  <span>{{ formatDate(edition?.initial_evaluators_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data de fim de Avaliações</span>
                  <span>{{ formatDate(edition?.final_evaluators_date) }}</span>
                </row>
                <v-btn @click="showinfo()" class="bg-blue">{{textButton}}</v-btn>
              </v-col>
              <v-col>
                <img alt="" class="w-100 rounded-xl" :src="edition?.banner?.file || defaultBanner" />
              </v-col>
            </v-row>
          </div>

          <!-- Card do Ver Mais -->
          <div v-if="seemore" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; display: flex; justify-content: center; align-content: center; background-color: rgb(0, 0, 0,0.6); backdrop-filter: blur(5px);">
            <v-col class="d-flex flex-column ga-4 justify-center bg-white rounded" style="height: auto; padding: 100px 40px; max-height: 80vw;" cols="6">
              <div style="display: flex; flex-direction: column; max-height: 80vh; overflow: hidden; overflow-y: scroll; gap: 10px; padding-bottom: 50px;">
                <div style="display: flex; align-items: center; gap: 10px; margin: 30px 0px 10px">
                  <span class="text-primary font-weight-bold">INFORMAÇÕES</span>
                  <VChip class="bg-blue d-flex justify-center align-center" pill style="width: 120px; height: 30px;">Todos</VChip>
                </div>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Nome:</span>
                  <span>{{ edition?.edition_name }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data do Evento:</span>
                  <span>{{ formatDate(edition?.event_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Carga Horária</span>
                  <span>{{ edition?.workload }}H</span>
                </row>
                <div style="display: flex; align-items: center; gap: 10px; margin: 30px 0px 10px">
                  <span class="text-primary font-weight-bold">PRAZOS E DATAS</span>
                  <VChip class="bg-blue d-flex justify-center align-center" pill style="width: 120px; height: 30px;">Todos</VChip>
                </div>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data do Final do Evento:</span>
                  <span>{{ formatDate(edition?.final_event_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data de início de Submissão:</span>
                  <span>{{ formatDate(edition?.initial_submission_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data de fim de Submissão:</span>
                  <span>{{ formatDate(edition?.final_submission_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Segunda Data de início de Submissão:</span>
                  <span>{{ formatDate(edition?.initial_second_submission_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Segunda Data de fim de Submissão:</span>
                  <span>{{ formatDate(edition?.final_second_submission_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data de início de Avaliações:</span>
                  <span>{{ formatDate(edition?.initial_evaluators_date) }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Data de fim de Avaliações</span>
                  <span>{{ formatDate(edition?.final_evaluators_date) }}</span>
                </row>
                <div style="display: flex; align-items: center; gap: 10px; margin: 30px 0px 10px">
                  <span class="text-primary font-weight-bold">LIMITES POR PROJETO</span>
                  <VChip class="bg-red d-flex justify-center align-center" pill style="width: 120px; height: 30px;">Alunos</VChip>
                </div>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite Mínimo de Membros na Equipe</span>
                  <span>{{ edition?.members_min }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite Máximo de Membros na Equipe</span>
                  <span>{{ edition?.members_max }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite Mínimo de Colaboradores no Projeto</span>
                  <span>{{ edition?.collaborators_min }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite Máximo de Colaboradores no Projeto</span>
                  <span>{{ edition?.collaborators_max }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite Mínimo de Matérias</span>
                  <span>{{ edition?.subjects_min }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite Máximo de Matérias</span>
                  <span>{{ edition?.subjects_max }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Quantidade de Avaliadores</span>
                  <span>{{ edition?.evaluators_count }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Límite Máximo de Caracteres por Projeto</span>
                  <span>{{ edition?.words_per_work_max }}</span>
                </row>
                <div style="display: flex; align-items: center; gap: 10px; margin: 30px 0px 10px">
                  <span class="text-primary font-weight-bold">LIMITES DE CARGO</span>
                  <VChip class="bg-green d-flex justify-center align-center" pill style="width: 120px; height: 30px;">Professor</VChip>
                </div>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite de Projetos por Avaliador</span>
                  <span>{{ edition?.works_per_evaluator_max }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite de Projetos por Colaborador</span>
                  <span>{{ edition?.works_per_collaborator_max }}</span>
                </row>
                <row class="d-flex pr-10" style="justify-content: space-between;">
                  <span>Limite de Projetos por Coordenador</span>
                  <span>{{ edition?.works_per_advisor_max }}</span>
                </row>
              </div>
              <v-btn @click="showinfo()" class="bg-blue">{{textButton}}</v-btn>
            </v-col>
          </div>
      </template>
      <template v-else>
        <v-alert color="error" icon="mdi-alert" outlined rounded="lg" text="Não foi possível carregar a edição"
          variant="tonal" />
        <div class="d-flex justify-end">
          <v-btn class="mt-5 px-8" color="error" rounded="xl" to="/panel/editions" variant="flat">
            Voltar
          </v-btn>
        </div>
      </template>
    </v-container>
  </LayoutDashboard>
</template>
