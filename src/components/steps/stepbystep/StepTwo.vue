<script setup>
import { useCategory } from '@/stores/category';
import { useWork } from '@/stores/work';
import { useEdition } from '@/stores/edition';
import { showMessage } from '@/utils/toastify';
import { useDisplay } from 'vuetify';
const CategoryStore = useCategory()
const WorkStore = useWork()
const editionStore = useEdition()
const subjectFiltered = ref([])
const ThemeItems = ref([])
const autocompleteRef = ref(null)
const selectedSub = ref(null)

function selectedTheme(value){
    
    const theme = ThemeItems.value.find(t => t.name === value)
    WorkStore.WorkStorage.cross_cutting_theme = theme
    WorkStore.WorkStorage.advisor = []
}

const AddSubject = (value) => {
    const selectedField = subjectFiltered.value?.find(s => s.name === value)
    const findField = WorkStore.WorkStorage.field.find(s => s.name === selectedField?.name)
    if (selectedField && !findField) {
        WorkStore.WorkStorage.field.push(selectedField)
         const findFilteredField = subjectFiltered.value.findIndex(s => s.name === selectedField?.name)
        subjectFiltered.value.splice(findFilteredField, 1)
        
        autocompleteRef.value.blur()
        selectedSub.value = null
   
    } else {
        showMessage(
            'essa matéria já foi selecionada',
            'error',
            1500,
            'top-right',
            'auto',
            false
        )
    }
}

function RemoveSubject(value) {
    console.log(WorkStore.WorkStorage.field)
    console.log(value)
    const findField = WorkStore.WorkStorage.field.findIndex(s => s.id === value)
    subjectFiltered.value.push(WorkStore.WorkStorage.field[findField])
    WorkStore.WorkStorage.field.splice(findField, 1)

    
}

onMounted(async () => {
    subjectFiltered.value = await CategoryStore.getField()
    ThemeItems.value = await CategoryStore.getCrossCuttingThemes()

    

    for(const field of WorkStore.WorkStorage.field){
        const findISub = subjectFiltered.value.findIndex(sub => sub.name === field.name)
        subjectFiltered.value.splice(findISub, 1)
        console.log(field)
    }

})
const {width}= useDisplay()

const heightComputed = computed(() => {
    if(width.value < 500){
        return 240
    }
    return 300
})
</script>
<template>
    <div :style="width > 950 ? {width: '70%'} : {width: '100%'}" class="pa-2 h-100">
        <VAutocomplete v-model="selectedSub" rounded="xl"  @update:model-value="AddSubject"  placeholder="Selecione a matéria" bg-color="grey-lighten-3" variant="solo"
            no-data-text="todas as matérias foram selecionadas"
            :items="subjectFiltered?.map(s => s.name)" ref="autocompleteRef">
        </VAutocomplete>
        <div class="d-flex ga-2">
            <p style="font-size: 12px;">* Limite minimo de matérias: {{ editionStore.currentEdition?.subjects_min || 3 }}</p>
        </div>
        <StepContainer :painel_height="heightComputed" title="As matérias integradas no seu projeto" no_arr_msg="você ainda não selecionou as matérias" :step_array="WorkStore.WorkStorage.field" :is_subject="true" :min="editionStore.currentEdition?.subjects_min || 3" @excludeSub="RemoveSubject"/>
        <div class="pa-5 ga-2 d-flex flex-column">
            <p class="font-weight-bold text-h6 ">Tema Transversais do seu projeto</p>
            <VSelect variant="outlined" v-model="WorkStore.WorkStorage.cross_cutting_theme.name" rounded="xl" :items="ThemeItems.map(t => t.name)" @update:model-value="(value) => selectedTheme(value)"></VSelect>
        </div>
    </div>
</template>
