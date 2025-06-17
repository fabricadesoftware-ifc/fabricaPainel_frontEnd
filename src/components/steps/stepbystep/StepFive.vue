<script setup>
import { useWork } from '@/stores/work';
const workStore = useWork()
</script>
<template>
    <div style="width: 70%; margin-bottom: 80px;" class="pa-2 d-flex flex-column ga-5 h-100">

        <VLabel >Título do Trabalho</VLabel>
        <div>
            <v-text-field v-model="workStore.WorkStorage.title" maxlength="200"></v-text-field>   
        </div> 

        <VLabel >Escreva uma proposta de integração com no máximo 500 palavras</VLabel>
        <div>
            <VTextarea v-model="workStore.WorkStorage.abstract" counter="500 palavras" maxlength="500" variant="outlined" auto-grow rounded="xl" rows="19"></VTextarea>   
        </div> 
    </div>
</template>