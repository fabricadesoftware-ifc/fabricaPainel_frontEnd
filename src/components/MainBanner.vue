<script lang="ts" setup>
  const props = defineProps<{
    content?: string;
    text?: string;
    btnvisible: boolean;
    class?: string;
  }>()

  const defaultContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
  const defaultText = 'Painel de projetos oficial do IFC'
  const defaultClass = 'pt-16 border-0'

  const content = props.content || defaultContent
  const text = props.text || defaultText
  const btnvisible = props.btnvisible
  const classDivider = props.class || defaultClass
</script>
<template>
  <v-container class="w-lg-75" fluid>
    <v-divider :class="classDivider" />
    <section class="h-screen mt-0 d-flex justify-center align-center">
      <div>
        <TitleH1
          :content="content"
          :text="text"
        />
        <BtnPrimary
          v-if="btnvisible"
          class="mt-8"
          disabled="Está sessão não está mais disponivel"
          text="Edição 2023"
        />
      </div>
    </section>
  </v-container>
</template>
