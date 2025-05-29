<script setup>
import { ref } from 'vue';
import { useCategory } from '@/stores/category';
import { useWork } from '@/stores/work';
import CardUser from '../layout/CardUser.vue';
import StepContainer from '../../inputs/StepContainer.vue'
const CategoryStore = useCategory()
const WorkStore = useWork()
const userFiltered = ref([])
const ThemeItems = ref([])
const autocompleteRef = ref(null)

function selectedTheme(value){
    const theme = ThemeItems.value.find(t => t.name === value)
    WorkStore.WorkStorage.cross_cutting_theme = theme
}

const AddUser = async (selectedsubject) => {
    if (selectedsubject) {
        const subject = userFiltered.value.find(sub => sub.name === selectedsubject)
        const findISub = userFiltered.value.findIndex(sub => sub.name === selectedsubject)
        userFiltered.value.splice(findISub, 1)
        WorkStore.WorkStorage.field.push(subject)
        setTimeout(async () => {
            await nextTick()
            autocompleteRef.value?.reset()
        }, 300)
    }
}

function RemoveSubject(subject){
    const SubjectIndex = WorkStore.WorkStorage.field.findIndex(sub => sub.id === subject)
    const Subject_exclude = WorkStore.WorkStorage.field.splice(SubjectIndex, 1)
    userFiltered.value.push(Subject_exclude)
}

onMounted(async () => {
    userFiltered.value = await CategoryStore.getField()
    ThemeItems.value = await CategoryStore.getCrossCuttingThemes()
    
    for(const field of WorkStore.WorkStorage.field){
        const findISub = userFiltered.value.findIndex(sub => sub.name === field.name)
        userFiltered.value.splice(findISub, 1)
        console.log(field)
    }
})
</script>
<template>
    <div style="width: 70%; " class="pa-2 h-100">
        <VAutocomplete rounded="xl"  @update:model-value="AddUser"  placeholder="Selecione a matéria" bg-color="grey-lighten-3"  variant="none"
            no-data-text="todas as matérias foram selecionadas"
            :items="userFiltered?.map(s => s.name)" ref="autocompleteRef">
        </VAutocomplete>
        <div class="d-flex ga-2">
            <p style="font-size: 12px;">* Limite minimo de matérias: 3</p>
        </div>
        <StepContainer :painel_height="300" title="As matérias integradas no seu projeto" no_arr_msg="você ainda não selecionou as matérias" :step_array="WorkStore.WorkStorage.field" :is_subject="true" :min="3" @excludeSub="RemoveSubject"/>
        <div class="pa-5 ga-2 d-flex flex-column">
            <p class="font-weight-bold text-h6 ">Tema Transversais do seu projeto</p>
            <VSelect variant="outlined" v-model="WorkStore.WorkStorage.cross_cutting_theme.name" rounded="xl" :items="ThemeItems.map(t => t.name)" @update:model-value="(value) => selectedTheme(value)"></VSelect>
        </div>    
    </div>
</template>