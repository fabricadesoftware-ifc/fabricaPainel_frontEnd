<script setup>
import { ref } from 'vue';
const grade = ref(0)

const showGrade = () => {
    console.log(grade.value)
}

const rules = [
    v => v > 10 || 'A nota deve ser no máximo 10',
    v => v < 10 || 'A nota deve ser no mínimo 0',
    v => v !== null && v !== '' || 'A nota é obrigatória',
]

const emits = defineEmits(['giveGrade', 'close'])
</script>
<template>
    <v-dialog
        scrollable fullscreen 
         :overlay="false"
        transition="dialog-transition"
    >
    <div class="w-100 h-100 d-flex justify-center align-center">
        <div style="width: 700px;" class="bg-white d-flex flex-column rounded-lg pa-5 ga-15">
            <div class="d-flex flex-column ga-2">
            <h2 style="font-size: 25px;" class="text-grey-darken-4">Atribuir Nota ao Trabalho</h2>
            <p style="font-size: 20px;" class="text-grey-darken-3">Coloque o valor da nota de 0 a 10</p>
            </div>  

            <div class="w-100 d-flex flex-column justify-center align-center ga-5">
                <!-- <p class="text-h3 text-grey-darken-3">{{ grade.toFixed(1) }}</p> -->

                <div class="d-flex justify-start align-center">
   <v-number-input required v-model="grade" :rules="rules" max="10" min="0" control-variant="default"></v-number-input>
</div>
                <div style="width: 100px; height: 3px;" class=" bg-blue-darken-2"></div>
            </div>

            <div>
                    <!-- <v-slider
        color="blue"
        track-color="black"
        thumb-color="blue"
        thumb-label="always"
        v-model="grade"
        min="0"
        max="10"
        step="0.1"  
     
        ></v-slider> -->
    <!-- <div class="w-100 px-1 text-grey-darken-3 d-flex justify-space-between">
        <p v-for="(num, index) in [0, 5, 10]">
            {{ num }}
        </p>
    </div> -->
            </div>
        <div>
        <VCardActions class="w-100 d-flex  justify-end">
          <VBtn class="font-weight-bold" @click="emits('close')"> cancelar 
          <template #prepend></template></VBtn>
          <VBtn class="bg-blue rounded-xl" style="width: 150px;" @click="emits('giveGrade', grade)"> confirmar </VBtn>
        </VCardActions>
        </div>
        </div>
       
       </div>
    </v-dialog>
</template>