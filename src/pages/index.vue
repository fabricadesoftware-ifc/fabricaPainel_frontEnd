<template>
  <v-divider class="pt-16 border-0" />
  <section class="py-16 my-16">
    <TitleH1
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      text="Sistema oficial dos PI da gurizada"
    />
    <BtnPrimary
      class="mt-8"
      disabled="Está sessão não está mais disponivel"
      text="Edição 2023"
    />
  </section>
  <section class="py-16 my-16">
    <TitleH1 text="Edições anteriores" />
    <v-slide-group
      v-model="model"
      center-active
      show-arrows
    >
      <v-slide-group-item>
        <v-card
          class="mx-3 border-md border-primary border-opacity-100"
          height="300"
          variant="outlined"
          rounded="xl"
          width="280"
          @click="toggle"
        >
          <div class="h-100 d-flex flex-column justify-space-between pa-6">
            <p class="text-disabled">finalizado</p>
            <h2 class="text-primary font-weight-medium">Edição 2023</h2>
            <p class="text-grey">breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s fasd asd  asd a as as sad adasd asd a asd sda)....</p>
            <p
              class="mr-2 text-primary font-weight-medium"
            >
              Clique para Ver mais
            </p>
          </div>
        </v-card>
        <v-card
          class="mx-3 border-md border-disabled border-opacity-25"
          height="300"
          variant="outlined"
          rounded="xl"
          width="280"
          @click="toggle"
        >
          <div class="h-100 d-flex flex-column justify-space-between pa-6">
            <p class="text-disabled">finalizado</p>
            <h2 class="text-disabled font-weight-medium">Edição 2023</h2>
            <p class="text-grey">breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s fasd asd  asd a as as sad adasd asd a asd sda)....</p>
            <p
              class="mr-2 text-disabled font-weight-medium"
            >
              Clique para Ver mais
            </p>
          </div>
        </v-card>
        <v-card
          class="mx-3 border-md border-disabled border-opacity-25"
          height="300"
          variant="outlined"
          rounded="xl"
          width="280"
          @click="toggle"
        >
          <div class="h-100 d-flex flex-column justify-space-between pa-6">
            <p class="text-disabled">finalizado</p>
            <h2 class="text-disabled font-weight-medium">Edição 2023</h2>
            <p class="text-grey">breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s fasd asd  asd a as as sad adasd asd a asd sda)....</p>
            <p
              class="mr-2 text-disabled font-weight-medium"
            >
              Clique para Ver mais
            </p>
          </div>
        </v-card>
        <v-card
          class="mx-3 border-md border-disabled border-opacity-25"
          height="300"
          variant="outlined"
          rounded="xl"
          width="280"
          @click="toggle"
        >
          <div class="h-100 d-flex flex-column justify-space-between pa-6">
            <p class="text-disabled">finalizado</p>
            <h2 class="text-disabled font-weight-medium">Edição 2023</h2>
            <p class="text-grey">breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s fasd asd  asd a as as sad adasd asd a asd sda)....</p>
            <p
              class="mr-2 text-disabled font-weight-medium"
            >
              Clique para Ver mais
            </p>
          </div>
        </v-card>
        <v-card
          class="mx-3 border-md border-disabled border-opacity-25"
          height="300"
          variant="outlined"
          rounded="xl"
          width="280"
          @click="toggle"
        >
          <div class="h-100 d-flex flex-column justify-space-between pa-6">
            <p class="text-disabled">finalizado</p>
            <h2 class="text-disabled font-weight-medium">Edição 2023</h2>
            <p class="text-grey">breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s fasd asd  asd a as as sad adasd asd a asd sda)....</p>
            <p
              class="mr-2 text-disabled font-weight-medium"
            >
              Clique para Ver mais
            </p>
          </div>
        </v-card>
        <v-card
          class="mx-3 border-md border-disabled border-opacity-25"
          height="300"
          variant="outlined"
          rounded="xl"
          width="280"
          @click="toggle"
        >
          <div class="h-100 d-flex flex-column justify-space-between pa-6">
            <p class="text-disabled">finalizado</p>
            <h2 class="text-disabled font-weight-medium">Edição 2023</h2>
            <p class="text-grey">breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s fasd asd  asd a as as sad adasd asd a asd sda)....</p>
            <p
              class="mr-2 text-disabled font-weight-medium"
            >
              Clique para Ver mais
            </p>
          </div>
        </v-card>
        <v-card
          class="mx-3 border-md border-disabled border-opacity-25"
          height="300"
          variant="outlined"
          rounded="xl"
          width="280"
          @click="toggle"
        >
          <div class="h-100 d-flex flex-column justify-space-between pa-6">
            <p class="text-disabled">finalizado</p>
            <h2 class="text-disabled font-weight-medium">Edição 2023</h2>
            <p class="text-grey">breve desrição sobre oq rolou sla (asdfasdf saf a asdfas asd s fasd asd  asd a as as sad adasd asd a asd sda)....</p>
            <p
              class="mr-2 text-disabled font-weight-medium"
            >
              Clique para Ver mais
            </p>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </section>
  <section class="py-16 my-16">
    <TitleH1
      content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      text="Sistema de Avaliação"
    />
    <v-row class="w-50 pt-16 pl-2 ml-auto">
      <v-btn
        class="mr-4"
        color="primary"
        rounded="xl"
        size="large"
        text="ENTRAR COMO AVALIADOR"
        variant="flat"
      />
      <v-btn
        color="primary"
        rounded="xl"
        size="large"
        text="ENTRAR COMO Orientador"
        variant="outlined"
      />
    </v-row>
  </section>
</template>

<script lang="ts" setup></script>
