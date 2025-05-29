<script setup>
import { useWork } from '@/stores/work';
import CardUser from '../layout/CardUser.vue';
import InformativeAlert from '../../InformativeAlert.vue';
import StepContainer from '../../inputs/StepContainer.vue'
import { showMessage } from '@/utils/toastify';
import { useAuth } from '@/stores/auth';
import StudentSelected from '@/components/inputs/StudentSelected.vue';
const AuthStore = useAuth()
const WorkStore = useWork()
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

<<<<<<< HEAD
const hintInput = computed(() => {
    if(WorkStore.WorkStorage.team.length === 7){
        return 'limite máximo atingido'
=======
const fetchStudents = async (e) => {
    if (e.target.value.length > 3) {
        userFiltered.value = await AuthStore.searchUsers(search.value, 'STUDENT')
>>>>>>> 939d5a2736794e32dcb68ce2b6733f333f4004a2
    }
    return ''
})

const AddUser = async (selectedStudent) => {
    console.log(selectedStudent)
    if (selectedStudent) {
<<<<<<< HEAD
        const searchUsers = await AuthStore.searchUsers(selectedStudent.user, selectedStudent.user_type)
        console.log(searchUsers)
        if(searchUsers.length !== 0){
            const team = searchUsers[0]?.team.length > 0
            const notRepeatUser = props.team.some(stu => stu.registration === Number(selectedStudent.user))
            console.log(team, notRepeatUser, props.team)
            if(!team && !notRepeatUser){
                WorkStore.WorkStorage.team.push(searchUsers[0])
                console.log(searchUsers)
            }
            else{
                showMessage(
                `Este usuario já se encontra em uma equipe`,
                "error",
                1500,
                "top-right",
                "auto",
                false
            );
            }       
=======
        const student = userFiltered.value.find(stu => stu.registration === selectedStudent)
        const userExists = props.team.some(stu => stu.email === student.email)
        console.log(userExists, student)
        if (student?.team.length === 0 || !userExists) {
            WorkStore.WorkStorage.team.push(student)
>>>>>>> 939d5a2736794e32dcb68ce2b6733f333f4004a2
        }
        else {
            showMessage(
                `Estudante não encontrado`,
                "error",
                1500,
                "top-right",
                "auto",
                false
            );
        }
    }

    console.log(WorkStore.WorkStorage.team)
}

function removeUser(email) {
    WorkStore.RemoveUsersInWork(email)
}

onMounted(() => {
    const executed = localStorage.getItem('executed')
    if (!executed) {
        WorkStore.WorkStorage?.team?.push(AuthStore.user)
        localStorage.setItem('executed', 'true')
    }
})
</script>
<template>
<<<<<<< HEAD
    <div style="width: 70%;" class="pa-2 h-100">
        <StudentSelected rounded="xl" :disabled="WorkStore.WorkStorage.team.length === 7" :hint="hintInput" error_msg="estudante não encontrado" placeholder="pesquise por um estudante" label="pesquise pela matricula do estudante" user-type="STUDENT" @addUser="AddUser"/>
        <div class="d-flex ga-2 mt-5">
=======
    <div style="width: 70%; " class="pa-2 h-100">
        <VAutocomplete rounded="xl" ref="autocompleteRef" @update:model-value="AddUser" @input="fetchStudents"
            placeholder="Pesquise pelo estudante" bg-color="grey-lighten-3" variant="solo"
            append-inner-icon="mdi-magnify" menu-icon="" :no-data-text="noDataMessage"
            :items="userFiltered?.map(s => s.registration) || []" :disabled="WorkStore.WorkStorage.team?.length === 7"
            :hint="WorkStore.WorkStorage.team?.length === 7 ? 'Barra de pesquisa desabilitada, limite máximo atingido' : ''">
        </VAutocomplete>
        <div class="d-flex ga-2 ">
>>>>>>> 939d5a2736794e32dcb68ce2b6733f333f4004a2
            <p style="font-size: 12px;">* Limite máximo de estudantes: 7</p>
            <p style="font-size: 12px;">* Limite minimo de estudantes: 3</p>
        </div>
        <StepContainer title="Sua Equipe" no_arr_msg="Não há equipe" :step_array="WorkStore.WorkStorage.team"
            :is_subject="false" :me="props.me" @RemoveUser="removeUser" :min="3" />
    </div>
</template>