<template>
  <v-container class="w-lg-75 py-4" fluid>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <img alt="" height="64px" src="@/assets/Logo_IFC_extendida_araquari.png">
        <img alt="" class="pt-3 pl-3" height="64px" src="@/assets/logo_FABRICA.png">
        <p class="pa-2 text-grey">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sed. Excepturi sint incidunt est doloribus aliquam, cupiditate iusto et eaque accusamus natus voluptas, laudantium optio. Aspernatur hic doloremque a voluptatibus!
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <v-list class="d-flex flex-row justify-end">
          <v-list-item link title="List Item 1" />
          <v-list-item link title="List Item 2" />
          <v-list-item link title="List Item 3" />
        </v-list>
        <div class="d-flex flex-row justify-end">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            color="primary"
            :icon="icon"
            variant="plain"
          />
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-12" />
    <section class="text-center d-flex flex-column">

      <p class="mt-8 text-grey-darken-1">
        {{ new Date().getFullYear() }} — <strong>FabricaPainel</strong>
      </p>
    </section>
  </v-container>
</template>

<script setup>

  const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ]

</script>

<!-- <v-row no-gutters>
  <v-col class="d-flex justify-start align-center" cols="10">
    <img alt="" height="64px" src="@/assets/Logo_IFC_extendida_araquari.png">
    <img alt="" class="pt-3 pl-3" height="64px" src="@/assets/logo_FABRICA.png">
  </v-col>
  <v-col class="d-flex justify-end align-center">
    <v-btn
      class="border border-primary"
      color="info"
      icon="mdi-help"
      rounded="xl"
      size="small"
      to="/"
      variant="tonal"
    />
  </v-col>
</v-row> -->
