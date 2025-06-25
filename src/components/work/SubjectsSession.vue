<script lang="ts" setup>
interface Ods {
   name: String,
   id: Number
}

interface Subject {
   name: String,
   id: Number
}

interface CrossCuttingTheme {
   name: String,
}

const props = defineProps<{
   subjects: Subject[],
   cross_cutting_theme: CrossCuttingTheme,
   ods?: Ods[]
}>()

</script>
<template>
     <div class="d-flex ga-10">
            <div class="d-flex flex-column ga-5">
               <p class="opacity-70" style="font-weight: 700; font-size: 20px;">Disciplinas:</p>
               <v-sheet class="d-flex ga-3 flex-wrap" style="max-width: 300px; width: 300px;">
                    <v-chip style="font-size: 15px;" v-for="(subject, index) in props.subjects" :key="index" label>{{ subject.name }}</v-chip>
               </v-sheet>
            </div>
            <div class="d-flex flex-column ga-5">
               <p class="opacity-70" style="font-weight: 700; font-size: 20px;">Temas Transversal:</p>
                 <v-sheet class="d-flex ga-3 flex-wrap" style="max-width: 300px; width: 300px;">
                    <v-chip style="font-size: 15px;"  label>{{ props.cross_cutting_theme.name }}</v-chip>
               </v-sheet>
            </div>
            <div class="d-flex flex-column ga-5">
               <p class="opacity-70 text-break" style="font-weight: 700; font-size: 20px;">Objetivos de Desenvolvimento Sustentável:</p>
               <v-sheet class="d-flex ga-3 flex-wrap" style="max-width: 500px; width: 500px;">
                    <v-chip style="font-size: 15px;" v-for="(od, index) in props.ods" :key="index" label>{{ od.name }}</v-chip>
               </v-sheet>
            </div>
        </div>
</template>