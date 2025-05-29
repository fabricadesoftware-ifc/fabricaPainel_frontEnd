<script setup>
import { ref, computed, nextTick,onMounted } from 'vue';
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
const AddUser = async (selectedAdvisor) => {
    if (selectedAdvisor) {
        const advisor = userFiltered.value.find(stu => stu.name === selectedAdvisor)
        WorkStore.WorkStorage.advisor.push(advisor)
    }
}

function removeUser(){
    WorkStore.WorkStorage.advisor = []
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
            @input="fetchStudents" placeholder="Pesquise por Orientador" bg-color="grey-lighten-3" variant="solo"
            append-inner-icon="mdi-magnify" menu-icon="" :no-data-text="noDataMessage"
            :items="userFiltered?.map(s => s.name) || []" :disabled="WorkStore.WorkStorage.advisor.length === 1" :hint="WorkStore.WorkStorage.advisor.length === 1 ? 'Barra de pesquisa desabilitada, limite máximo atingido' : ''">
        </VAutocomplete>
        <div class="d-flex ga-2 ">
            <p style="font-size: 12px;">* Limite máximo de orientadores: 1</p>
            <p style="font-size: 12px;">* Limite minimo de orientadores: 1</p>
        </div>
        <StepContainer title="Orientador do seu projeto" :step_array="WorkStore.WorkStorage.advisor" :is_subject="false" @RemoveUser="removeUser" :min="1"/>
    </div>
</template>