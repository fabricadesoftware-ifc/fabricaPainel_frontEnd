 <script lang="ts" setup>
import { userCase, validate_user_function } from '@/utils/works'

const emits = defineEmits([
    'buttonAction'
])
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
    },
    user_function: {
        type: String,
        default: ''
    },
    student_able_to_cancel: {
        type: Boolean,
    },
    advisor_able_to_give_grade: {
        type: Boolean,
    },
    evaluator_able_to_give_grade: {
        type: Boolean,
    }
    
})

const showButtonBasedOnUserAndDate = (user_function:String) => {
    switch (user_function) {
        case 'STUDENT':
            return props.student_able_to_cancel
        case 'ADVISOR': 
            return props.advisor_able_to_give_grade
        case 'EVALUATOR': 
            return props.evaluator_able_to_give_grade
    }
}

onMounted(()=> {
    validate_user_function(props.user_function)
    console.log(showButtonBasedOnUserAndDate(props.user_function))
})

</script>
 
 <template>
   
 <div class=" w-100 d-flex justify-space-between flex-wrap ga-8 align-center">
    <div class="d-flex align-center justify-space-between w-100 ga-3">
    <div class="d-flex align-center ga-3">
    <h1 style="font-size: 40px;">{{ props.title }}</h1>

    <v-chip :color="props.status_color" style="width: 150px; display: flex; justify-content: center; align-items: center; font-size: 17px;">{{ props.status_content }}</v-chip>
    </div>

    <v-btn @click="emits('buttonAction')" v-if="showButtonBasedOnUserAndDate(props.user_function) && (props.status_content != 'Aprovado' && props.status_content != 'Cancelado')" :prepend-icon="userCase.icon" variant="text" size="small" :style="`color: ${userCase.color}; brightness: 50%; `">
        <p style="font-size: 15px; font-weight: 600;">{{
            userCase.text  
}}</p>
    </v-btn>
    </div>
    <div class="w-100 d-flex align-center ga-5">
    <p class="opacity-70" style="font-weight: 700; font-size: 20px;">Nota do Trabalho:</p>
    <v-chip :color="props.grade == '' ? 'yellow-darken-3' : 'green-darken-3'" class="d-flex justify-center align-center" label style="width: 150px;">{{ !props.grade ?  'Nota não Atribuída' : props.grade }}</v-chip>
    </div>
    
      
 </div>
</template>