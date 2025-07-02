<script setup>
import { ref, watch } from 'vue';
import { defineEmits } from 'vue';
const grade = ref(0)
const feedback = ref('')

watch(grade, (newVal) => {
    
    const module = Math.abs(grade.value)
    grade.value = module
    Math.abs(grade.value)
    if (grade.value > 10) {
        grade.value = 10
    } else if (grade.value < 0) {
        grade.value = 0
    }
    if (!Number.isInteger(grade.value)) {
        const tofix = grade.value.toFixed(2)
          grade.value = Number(tofix)
    }
  
})

const emits = defineEmits(['giveGrade', 'close'])

const sendWorkData = () => {
    emits('giveGrade', {
    work_grade: grade.value,
    comittee_feedback: feedback.value
    }
    )
} 
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
                <input style="outline: none; height: 100px; font-size: 25px;" class="text-center align-center" v-model="grade" type="Number">
</div>
                <div style="width: 200px; height: 3px;" class=" bg-blue-darken-2"></div>
            </div>

        <div>
            
        <div class="d-flex w-100 flex-column ga-3">
            <p style="font-size: 20px;" class="text-grey-darken-3">Mensagem de feedback</p>

            <v-textarea name="input-7-1" variant="filled" auto-grow v-model="feedback"></v-textarea>
        </div>
        <VCardActions class="w-100 d-flex  justify-end">
          <VBtn class="font-weight-bold" @click="emits('close')"> cancelar 
          <template #prepend></template></VBtn>
          <VBtn class="bg-blue rounded-xl" style="width: 150px;" @click="sendWorkData"> confirmar </VBtn>
        </VCardActions>
        </div>

        </div>
       
       </div>
    </v-dialog>
</template>