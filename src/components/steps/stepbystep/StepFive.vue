<script setup>
import { useWork } from '@/stores/work';
import { useDisplay } from 'vuetify';
const workStore = useWork()
const { width, height } = useDisplay()
const wComputed = computed(() => width.value)
const RowComputed = computed(() => {
    if (height.value < 950) {
        return 16
    }
    return 30
})
</script>
<template>
    <div class="w-100 pa-2 d-flex flex-column ga-5 h-100">
        <div style="width: 70%; margin-bottom: 80px;" class="pa-2 d-flex flex-column ga-5 h-100">

            <VLabel>Título do Trabalho</VLabel>
            <div>
                <v-text-field v-model="workStore.WorkStorage.title" maxlength="200"></v-text-field>
            </div>
            <p class="text-grey-lighten-1">Escreva uma proposta de integração com no máximo 500 palavras...</p>
            <div>
                <VTextarea v-model="workStore.WorkStorage.abstract" counter="500 palavras" maxlength="500"
                    variant="outlined" auto-grow rounded="xl" :rows="RowComputed"></VTextarea>
            </div>
        </div>
    </div>
</template>