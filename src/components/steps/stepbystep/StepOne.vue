<script setup>
import { ref, computed, nextTick } from 'vue';
import { useWork } from '@/stores/work';
import CardUser from '../layout/CardUser.vue';
import InformativeAlert from '../../InformativeAlert.vue';
import StepContainer from '../../inputs/StepContainer.vue'
import { showMessage } from '@/utils/toastify';
import { useAuth } from '@/stores/auth';
const AuthStore = useAuth()
const WorkStore = useWork()
const search = ref('')
const autocompleteRef = ref(null)
const userFiltered = ref([])
const props = defineProps({
    me: {
        type: Object,
        required: true
    },
    team: {
        type: Array,
        required: true
    }
})

const fetchStudents = async (e) => {
    if(e.target.value.length > 3){
        userFiltered.value = await AuthStore.searchUsers(search.value, 'STUDENT')   
    }
}
const AddUser = async (selectedStudent) => {
    if (selectedStudent) {
        const student = userFiltered.value.find(stu => stu.name === selectedStudent)
        const userExists = props.team.some(stu => stu.email === student.email)
        console.log(userExists, student)
        if (student?.team.length === 0 || !userExists) {
            WorkStore.WorkStorage.team.push(student)
        }
        else {
            showMessage(
                `'Esse estudante já possui uma equipe'`,
                "error",
                1500,
                "top-right",
                "auto",
                false
            );
        }

        setTimeout(async () => {
            await nextTick()
            autocompleteRef.value?.reset()
        }, 300)
    }
}

function removeUser(email){
    WorkStore.RemoveUsersInWork(email)
}

function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

const SearchStudents = debounce(fetchStudents, 1000)

onMounted(() => {
    const executed = localStorage.getItem('executed')
    if (!executed) {
        WorkStore.WorkStorage?.team?.push(AuthStore.user)
        localStorage.setItem('executed', 'true')
    }
})  
</script>
<template>
    <div style="width: 70%; " class="pa-2 h-100">
        <VAutocomplete rounded="xl" ref="autocompleteRef" @update:model-value="AddUser"
            @input="fetchStudents" placeholder="Pesquise pelo estudante" bg-color="grey-lighten-3" variant="solo"
            append-inner-icon="mdi-magnify" menu-icon="" :no-data-text="noDataMessage"
            :items="userFiltered?.map(s => s.name) || []" :disabled="WorkStore.WorkStorage.team?.length === 7" :hint="WorkStore.WorkStorage.team?.length === 7 ? 'Barra de pesquisa desabilitada, limite máximo atingido' : ''">
        </VAutocomplete>
        <div class="d-flex ga-2 ">
            <p style="font-size: 12px;">* Limite máximo de estudantes: 7</p>
            <p style="font-size: 12px;">* Limite minimo de estudantes: 3</p>
        </div>
        <StepContainer title="Sua Equipe" no_arr_msg="Não há equipe" :step_array="WorkStore.WorkStorage.team" :is_subject="false" :me="props.me" @RemoveUser="removeUser" :min="3"/>
    </div>
</template>