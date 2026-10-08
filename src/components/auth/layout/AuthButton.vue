
<script lang="ts" setup>
// @ts-ignore
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    alternative_text: {
        type: String,
    },
    router_link: {
        type: String,
    }
})

// Botao de submit de verdade: quem trata o envio e o <v-form @submit.prevent> em volta.
// (Com type="button" + @click o navegador nao enxerga um formulario sendo enviado e nao
// oferece "salvar senha".) Enter nos campos tambem envia, sem handler extra.
</script>
<template>



<v-btn block color="primary" class="py-6" rounded="lg" type="submit">
    Enviar
</v-btn>

<p class="text-center mt-4" style="font-size: 0.9rem">
    <router-link class="text-decoration-none text-primary" :to="`${props.router_link}`">{{ props.alternative_text }}</router-link>
</p>


</template>