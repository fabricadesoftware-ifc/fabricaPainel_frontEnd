<script lang="ts" setup>
// @ts-ignore
import { defineProps } from "vue";
import { useDisplay } from "vuetify";

interface Ods {
   name: string,
   id: number
}

interface Subject {
   name: string,
   id: number
}

interface CrossCuttingTheme {
   name: string,
}

const props = defineProps<{
   subjects: Subject[],
   cross_cutting_theme: CrossCuttingTheme,
   ods?: Ods[]
}>()

const {width} = useDisplay()

</script>
<template>
     <div class="d-flex ga-10 flex-wrap">
            <div class="d-flex flex-column ga-5">
               <p class="opacity-70" :style="{fontWeight: '700', fontSize: width > 780 ? '20px' : '15px'}">Disciplinas:</p>
               <v-sheet class="d-flex ga-3 flex-wrap" :style="{maxWidth: width > 780 ? '300px' : '100%', width: width > 780 ? '300px' : '100%'}">
                    <v-chip :style="{fontSize: width > 780 ? '15px' : '12px'}" v-for="(subject, index) in props.subjects" :key="index" label>{{ subject.name }}</v-chip>
               </v-sheet>
            </div>
            <div class="d-flex flex-column ga-5">
               <p class="opacity-70" :style="{fontWeight: '700', fontSize: width > 780 ? '20px' : '15px'}">Temas Transversal:</p>
                 <v-sheet class="d-flex ga-3 flex-wrap" :style="{maxWidth: width > 780 ? '300px' : '100%', width: width > 780 ? '300px' : '100%'}">
                    <v-chip :style="{fontSize: width > 780 ? '15px' : '12px'}"  label>{{ props.cross_cutting_theme.name }}</v-chip>
               </v-sheet>
            </div>
            <div class="d-flex flex-column ga-5">
               <p class="opacity-70 text-break" :style="{fontWeight: '700', fontSize: width > 780 ? '20px' : '15px'}">Objetivos de Desenvolvimento Sustentável:</p>
               <v-sheet class="d-flex ga-3 flex-wrap" :style="{maxWidth: width > 780 ? '500px' : '100%', width: width > 780 ? '500px' : '100%'}">
                    <v-chip :style="{fontSize: width > 780 ? '15px' : '12px'}" v-for="(od, index) in props.ods" :key="index" label>{{ od.name }}</v-chip>
               </v-sheet>
            </div>
        </div>
</template>