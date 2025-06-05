<script lang="ts" setup>
const props = defineProps({
   subjects: {
      type: [Array],
      required: true
   },
   cross_cutting_theme: {
      type: Object,
      required: true
   }
})

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
        </div>
</template>