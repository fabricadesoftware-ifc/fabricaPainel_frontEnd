<template>
  <v-container fluid>
    <v-container class="w-lg-75 py-4 d-flex flex-column justify-center align-center" fluid>
      <div class=" text-center">
        <img alt="" height="64px" src="@/assets/footer_logos2.png">
        <p class="pt-8 text-grey">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, deleniti, quisquam facilis sunt soluta saepe molestias non neque tenetur molestiae voluptate perferendis officiis eum?
        </p>
      </div>
      <v-list class="d-flex flex-row justify-center bg-transparent mt-6 ga-8">
        <v-list-item
          class="rounded-xl"
          color="primary"
          link
          title="PÁGINA INICIAL"
          variant="plain"
        />
        <v-list-item
          class="rounded-xl"
          color="primary"
          link
          title="SOBRE O PROJETO"
          variant="plain"
        />
        <v-list-item
          class="rounded-xl"
          color="primary"
          link
          title="TODAS AS EDIÇÕES"
          variant="plain"
        />
      </v-list>
      <v-divider class="mt-10 w-100" />
      <v-row class="w-100 align-center mt-6" no-gutters>
        <v-col cols="12" md="6">
          <div>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4"
              :icon="icon"
              variant="plain"
            />
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <section class="text-right text-body-2">
            <v-list-item class="rounded-lg" :title="`${ new Date().getFullYear() } — FabricaPainel`" variant="plain" />
          </section>
        </v-col>
      </v-row>
    </v-container>
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
