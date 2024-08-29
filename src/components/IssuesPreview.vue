<template>
  <section class="py-16 my-16 bg-grey-darken-4">
    <div class="py-16">
      <v-container class="w-lg-75" fluid>
        <TitleH1 text="Edições anteriores" />
      </v-container>
      <v-slide-group v-model="model" center-active class="py-8" show-arrows>
        <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }">
          <v-card
            class="mx-3 border-md"
            :class="[
              'ma-4',
              selectedClass,
              { 'border-primary border-opacity-100': isSelected },
              { 'border-white': !isSelected },
            ]"
            height="300"
            rounded="xl"
            variant="outlined"
            width="320"
            @click="toggle"
          >
            <v-icon
              v-if="isSelected"
              class="top-0 right-0 position-absolute pa-8"
              color="primary"
              icon="mdi-close"
              size="16"
            />
            <div class="h-100 d-flex flex-column justify-space-between pa-6">
              <p class="text-info">Em aberto</p>
              <h2
                class="text-primary font-weight-bold text-h5"
                :class="[{ 'text-red': isSelected }]"
              >
                Edição 2024
              </h2>
              <p class="text-grey">
                breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s
                fasd asd asd a as as sad adasd asd a asd sda)....
              </p>
              <p v-if="!isSelected" class="mr-2 font-weight-medium">
                Clique para Ver mais
              </p>
              <p v-else class="mr-2 font-weight-medium">
                Mais informações a baixo
              </p>
            </div>
          </v-card>
        </v-slide-group-item>
        <v-slide-group-item
          v-for="n in 40"
          :key="n"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <v-card
            class="mx-3 border-md"
            :class="[
              'ma-4',
              selectedClass,
              { 'border-primary border-opacity-100': isSelected },
              { 'border-white': !isSelected },
            ]"
            height="300"
            rounded="xl"
            variant="outlined"
            width="320"
            @click="toggle"
          >
            <v-icon
              v-if="isSelected"
              class="top-0 right-0 position-absolute pa-8"
              color="primary"
              icon="mdi-close"
              size="16"
            />
            <div class="h-100 d-flex flex-column justify-space-between pa-6">
              <p class="text-red">finalizado</p>
              <h2
                class="text-primary font-weight-bold text-h5"
                :class="[{ 'text-red': isSelected }]"
              >
                Edição 2023
              </h2>
              <p class="text-grey">
                breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s
                fasd asd asd a as as sad adasd asd a asd sda)....
              </p>
              <p v-if="!isSelected" class="mr-2 font-weight-medium">
                Clique para Ver mais
              </p>
              <p v-else class="mr-2 font-weight-medium">
                Mais informações a baixo
              </p>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
      <v-expand-transition>
        <v-sheet v-if="model != null" height="200">
          <div class="d-flex fill-height align-center justify-center">
            <h3 class="text-h6">Selected {{ model }}</h3>
          </div>
        </v-sheet>
      </v-expand-transition>
    </div>
  </section>
</template>

<script setup>
  const model = ref(null)
</script>
