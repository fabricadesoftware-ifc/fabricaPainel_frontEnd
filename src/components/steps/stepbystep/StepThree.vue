<script setup>
import { useWork } from '@/stores/work';
import { useEdition } from '@/stores/edition';
import { showMessage } from '@/utils/toastify';
import { useAuth } from '@/stores/auth';
import { hasReachedWorkLimit } from '@/utils/steps/works';
import { useDisplay } from 'vuetify';
import { hasReachedWorkLimit } from '@/utils/steps/works';
const AuthStore = useAuth()
const WorkStore = useWork()
const EditionStore = useEdition()

const hintInput = computed(() => {
    if(WorkStore.WorkStorage.advisor.length === 1){
        return 'limite máximo atingido'
    }
    return ''
})

const AddUser = async (selectedAdvisor) => {
    if (selectedAdvisor) {
        const findadvisor = WorkStore.WorkStorage.collaborators.find(s => s.email === selectedAdvisor.email )

        if(!findadvisor){
            await WorkStore.fetchUserWorks('TEACHER', selectedAdvisor.id)
            console.log(WorkStore.state)
            const limiteReached = hasReachedWorkLimit(
            selectedAdvisor,
            WorkStore.advisorWorks,
            EditionStore.currentEdition.works_per_advisor_max,
            true
            )
            if (limiteReached) {
                showMessage(
                'Este orientador não está mais disponível',
                "error",
                1500,
                "top-right",
                "auto",
                false)
            } else {
            await AuthStore.getUserThemes(selectedAdvisor.id)
            
            console.log(AuthStore.userThemes)
            if (AuthStore.userThemes.length > 0 && AuthStore.userThemes.some(s => s.name == WorkStore.WorkStorage.cross_cutting_theme.name)) {
            WorkStore.WorkStorage.advisor.push(selectedAdvisor)
            } else {
                showMessage(
                'Esse orientador não está relacionado a matéria transversal escolhida',
                "error",
                1500,
                "top-right",
                "auto",
                false)
            }
        }
        }
        else{
            showMessage(
                'esse orientador é seu colaborador',
                "error",
                1500,
                "top-right",
                "auto",
                false)
        }
    
    
    
    }
}
function removeUser(){
    WorkStore.WorkStorage.advisor = []
}
const {width} = useDisplay()

const heightComputed = computed(() => {
    if(width.value < 500){
        return 300
    }
    return 400
})
</script>
<template>
    <div :style="width > 950 ? {width: '70%'} : {width: '100%'}" class="pa-2 h-100">
        <TeacherSelected  :disabled="WorkStore.WorkStorage.advisor.length === 1" :hint="hintInput" error_msg="orientador não encontrado" placeholder="pesquise pelo orientador" label="pesquise pelo professor" userType="TEACHER" @addUser="AddUser" @removeUser="removeUser"/>
        <div class="d-flex ga-2 mt-2">
            <p style="font-size: 12px;">* Limite máximo de orientadores: 1</p>
            <p style="font-size: 12px;">* Limite minimo de orientadores: 1</p>
        </div>
        <StepContainer :painel_height="heightComputed" title="Orientador do seu projeto" :step_array="WorkStore.WorkStorage.advisor" :is_subject="false" @RemoveUser="removeUser" :min="1" no_arr_msg="Nenhum orientador selecionado"/>
    </div>
</template>
