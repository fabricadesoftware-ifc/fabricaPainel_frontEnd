<script setup>
import { computed, watch } from 'vue'
import { useEdition } from '@/stores/edition';
import { useWork } from '@/stores/work';
import { useDisplay } from 'vuetify';

const workStore = useWork()
const editionStore = useEdition()
const { width, height } = useDisplay()
const wComputed = computed(() => width.value)

const RowComputed = computed(() => height.value < 750 ? 8 : 15)

const maxWords = computed(() => editionStore.currentEdition?.words_per_work_max || 0)
const minWords = computed(() => editionStore.currentEdition?.words_per_work_min || 0)

const wordCount = computed(() => {
    const text = workStore.WorkStorage.abstract?.trim() || ''
    return text ? text.split(/\s+/).length : 0
})

const abstractColor = computed(() =>
    maxWords.value > 0 && wordCount.value === maxWords.value ? 'error' : undefined
)

// Enforce max words by preventing new content when limit is reached
watch(() => workStore.WorkStorage.abstract, (val) => {
    if (!val || maxWords.value === 0) return
    const words = val.trim().split(/\s+/)
    if (words.length > maxWords.value) {
        workStore.WorkStorage.abstract = words.slice(0, maxWords.value).join(' ')
    }
})

const abstractRules = [
    () => wordCount.value >= minWords.value || `Mínimo de ${minWords.value} palavras`,
    () => (maxWords.value === 0 || wordCount.value <= maxWords.value) || `Máximo de ${maxWords.value} palavras`
]
</script>

<template>
    <div class="w-100 pa-2 d-flex flex-column ga-5 max-w-100 ">
        <div :style="{ width: width <= 375 ? '90%' : '70%', marginBottom: '80px', margin: '0 auto' }"
            class="pa-2 d-flex flex-column ga-5 h-100 ">

            <VLabel>Título do Trabalho</VLabel>
            <div>
                <v-text-field v-model="workStore.WorkStorage.title" maxlength="200"></v-text-field>
            </div>
            <div class="d-flex ga-2 mt-5">
                <p style="font-size: 12px;">* Limite mínimo de palavras: {{
                    editionStore.currentEdition.words_per_work_min }}</p>
                <p style="font-size: 12px;">* Limite máximo de palavras: {{
                    editionStore.currentEdition.words_per_work_max }}</p>
            </div>
            <div>
                <VTextarea v-model="workStore.WorkStorage.abstract" variant="outlined" auto-grow rounded="xl"
                    :rows="RowComputed" :rules="abstractRules" :color="abstractColor">
                    <template #counter>
                        <span :class="{
                            'text-error': wordCount < minWords || (maxWords > 0 && wordCount === maxWords)
                        }">
                            {{ wordCount }} / {{ maxWords }} palavras
                        </span>
                    </template>
                </VTextarea>
            </div>
        </div>
    </div>
</template>