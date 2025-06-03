 <script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    status_content: {
        type: String,
        required: true
    },
    status_color: {
        type: String,
        required: true
    },
    grade: {
        type: [Number, String, null, undefined]
    }
})
</script>
 
 <template>
   
 <div class=" w-100 d-flex justify-space-between flex-wrap ga-8 align-center">
    <div class="d-flex align-center justify-space-between w-100 ga-3">
    <div class="d-flex align-center ga-3">
    <h1 style="font-size: 40px;">{{ props.title }}</h1>

    <v-chip :color="props.status_color" style="width: 150px; display: flex; justify-content: center; align-items: center; font-size: 17px;">{{ props.status_content }}</v-chip>
    </div>

    <v-btn prepend-icon="$delete" variant="text" size="small" style=" color: #EC3223">
        <p style="font-size: 15px; font-weight: 600;">Cancelar Submissão</p>
    </v-btn>
    </div>
    <div class="w-100 d-flex align-center ga-5">
    <p class="opacity-70" style="font-weight: 700; font-size: 20px;">Nota do Trabalho:</p>
    <v-chip :color="props.status_color" class="d-flex justify-center align-center" label style="width: 150px;">{{ !props.grade ?  'Nota não Atribuída' : props.grade }}</v-chip>
    </div>
    
      
 </div>
</template>