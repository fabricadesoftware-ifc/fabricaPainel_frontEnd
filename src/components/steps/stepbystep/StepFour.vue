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

const fetchStudents = async (e) => {
    if(e.target.value.length > 3){
        userFiltered.value = await AuthStore.searchUsers(search.value, 'TEACHER')   
    }
}
const AddUser = async (selectedColaborator) => {
    if (selectedColaborator) {
        const colaborator = userFiltered.value.find(col => col.name === selectedColaborator)
        const userExists = WorkStore.WorkStorage.co_advisor.some(stu => stu.email === colaborator.email)
        const isYourAdvisor = WorkStore.WorkStorage.advisor[0].email === colaborator.email
        if (!userExists && !isYourAdvisor){
            WorkStore.WorkStorage.co_advisor.push(colaborator)
        }
        else {
            showMessage(
                `${userExists ? 'esse professor já é seu colaborador' : isYourAdvisor ? 'esse professor já é seu orientador' : ''}`,
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
    const teacherI = WorkStore.WorkStorage.co_advisor.findIndex(te => te.email === email)
    WorkStore.WorkStorage.co_advisor.splice(teacherI, 1)
}

function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

const SearchStudents = debounce(fetchStudents, 1000)
</script>
<template>
    <div style="width: 70%; " class="pa-2 h-100">
        <VAutocomplete rounded="xl" ref="autocompleteRef" @update:model-value="AddUser"
            @input="fetchStudents" placeholder="Pesquise por Colaborador" bg-color="grey-lighten-3" variant="solo"
            append-inner-icon="mdi-magnify" menu-icon="" :no-data-text="noDataMessage"
            :items="userFiltered?.map(s => s.name) || []" :disabled="WorkStore.WorkStorage.co_advisor.length === 5" :hint="WorkStore.WorkStorage.co_advisor.length === 5 ? 'Barra de pesquisa desabilitada, limite máximo atingido' : ''">
        </VAutocomplete>
        <div class="d-flex ga-2 ">
            <p style="font-size: 12px;">* Limite máximo de colaboradores: 5</p>
            <p style="font-size: 12px;">* Limite minimo de colaboradores: 1</p>
        </div>
        <StepContainer title="Colaboradores do seu projeto" :step_array="WorkStore.WorkStorage.co_advisor" :is_subject="false" @RemoveUser="removeUser" :min="1"/>
    </div>
</template>