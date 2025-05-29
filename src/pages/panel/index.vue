<script  setup>
  import router from '@/router';
  import { ref } from 'vue';
  const is_submit = ref(false)
</script>
<template>
  <LayoutPanel>
    <v-container>
      <div class="d-flex justify-space-between align-center text-h6">
        <h1 class="font-weight-bold" style="font-size: 40px;">Submissões</h1>
        <VChip :class="is_submit ? 'bg-green' : 'bg-red'">{{ is_submit ? 'trabalho submetido' : 'trabalho ainda não submetido' }}</VChip>
      </div>
      <div class="d-flex pa-10 flex-column justify-space-between align-center">
        <div class="d-flex align-center  ga-5 w-100">
          <h1 class="text-h5 font-weight-bold" style="font-size: 30px;">XIV Edição da Sepe</h1>
          <VChip class="bg-blue d-flex justify-center align-center" pill style="width: 120px;">Em aberto</VChip>
        </div>
        <div class="pa-10 d-flex flex-column justify-center ga-2 align-center cursor-pointer" @click="is_submit = !is_submit">
          <p class="font-weight-bold" style="font-size: 20px;">Você ainda não possui nenhum trabalho submetido</p>
          <div class="d-flex justify-center align-center ga-2" @click="router.push('/panel/work-submission/')">
            <VBtn class="bg-blue" rounded="pill" flat size="25">
              <VIcon icon="mdi-plus" size="25"></VIcon>
            </VBtn>
            <p class="text-blue font-weight-medium" style="font-size: 20px;">submeta uma proposta</p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center text-h6">
        <h1 class="font-weight-bold" style="font-size: 30px;">Edições anteriores</h1>
      </div>
      <div >
        <div class="d-flex justify-center flex-column ga-5 w-100 pa-10">
          <h1 class="text-h5 font-weight-bold" style="font-size: 30px;">XIII Edição da Sepe</h1>
          <div class="d-flex justify-center align-center ">
          <VCard class="d-flex align-center pa-5 justify-space-between w-75" rounded="lg" elevation="0" :border="true"  width="1000">
            <div class="d-flex align-center ga-3">
              <VCardTitle class="font-weight-bold">Submissão de proposta</VCardTitle>
              <VCardSubtitle>2 de outubro</VCardSubtitle>
              <V-Chip color="green" >Concluido</V-Chip>
            </div>
            <div class="d-flex justify-center align-center text-blue ga-2">
              <VIcon icon="mdi-open-in-new"></VIcon>
              <p>Ver Submissão</p>
            </div>
          </VCard>
          </div>
        </div>
      </div>
    </v-container>
  </LayoutPanel>
</template>
