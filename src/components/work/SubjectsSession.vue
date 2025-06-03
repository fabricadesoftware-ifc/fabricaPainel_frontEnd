<script lang="ts" setup>
const temas = [
    'Geografia', 'Matemática', 'Desenvolvimento Web', 'Banco de Dados', 'Artes'
]
</script>
<template>
     <div class="d-flex ga-10">
            <div class="d-flex flex-column ga-5">
               <p class="opacity-70" style="font-weight: 700; font-size: 20px;">Disciplinas:</p>
               <v-sheet class="d-flex ga-3 flex-wrap" style="max-width: 300px; width: 300px;">
                    <v-chip style="font-size: 15px;" v-for="(subject, index) in temas" :key="index" label>{{ subject }}</v-chip>
               </v-sheet>
            </div>
            <div class="d-flex flex-column ga-5">
               <p class="opacity-70" style="font-weight: 700; font-size: 20px;">Temas Transversal:</p>
                 <v-sheet class="d-flex ga-3 flex-wrap" style="max-width: 300px; width: 300px;">
                    <v-chip style="font-size: 15px;" v-for="(subject, index) in temas" :key="index" label>{{ subject }}</v-chip>
               </v-sheet>
            </div>
        </div>
</template>