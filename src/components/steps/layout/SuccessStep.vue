<script setup lang="ts">
import router from '@/router';

</script>
<template>
    <div class="position-absolute bottom-0 mb-16" > 
        <VBtn rounded="pill" size="40" elevation="0" class="me-10 w-100 bg-blue" @click="router.push('/panel/works/')"><VIcon icon="mdi-arrow-left"></VIcon>voltar</VBtn>
    </div>
    <div>
        <div class="d-flex flex-column mb-10 align-center">
            <h1 style="font-size: 80px; color: #1F8BDD85; letter-spacing: 15px; top: 125px;" class="position-absolute">SUCESSO</h1>
            <VImg src="../../../assets/trophy.png" width="300"></VImg>
            <VDivider></VDivider>
            <VCardTitle class="font-weight-bold text-h5">Submissão de proposta realizada com sucesso!</VCardTitle>
            <VCardSubtitle class="">Agora basta esperar sua proposta ser avaliada e aprovada.</VCardSubtitle>
        </div>
    </div>    
</template>