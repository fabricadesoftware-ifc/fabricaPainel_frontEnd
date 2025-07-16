<script setup lang="ts">
// @ts-nocheck
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
const {width} = useDisplay()
const router = useRouter();

defineProps({
    to: {
       type: String,
       required: true 
    }
})
</script>
<template>
    <div class="position-absolute bottom-0 mb-16" >
        <VBtn rounded="pill" size="40" elevation="0" class="me-10 w-100 bg-blue" @click="router.push(`${to}`)"><VIcon icon="mdi-arrow-left"></VIcon>voltar</VBtn>
    </div>
    <div>
        <div class="d-flex flex-column mb-10 align-center" :style="{marginTop: width < 750 ? '100px' : '250px'}">
            <h1 :style="{fontSize: width < 750 ? '35px' : '80px', color: '#1F8BDD85', letterSpacing: '15px', top: width < 750 ? '80px':'125px'}" class="position-absolute">SUCESSO</h1>
            <VImg src="../../../assets/trophy.png"  :width="width < 750 ? '200' : '300'" ></VImg>
            <VDivider></VDivider>
            <VCardTitle class="font-weight-bold text-h5 text-wrap">Submissão de proposta realizada com sucesso!</VCardTitle>
            <VCardSubtitle class="text-wrap">Agora basta esperar sua proposta ser avaliada e aprovada.</VCardSubtitle>
        </div>
    </div>
</template>