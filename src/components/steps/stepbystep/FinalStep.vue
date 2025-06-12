<script setup>
    defineProps({
        form_work: {
            type: Object,
            required: true
        }
    })
    defineEmits(['submitPropose'])

    onUnmounted(()=> {
        localStorage.removeItem('actualstep')
    })
</script>
<template>
<div class="d-flex flex-column align-center ga-7">
    <VCard class="w-75 h-75 pa-5 d-flex flex-column overflow-y-auto ga-10 border elevation-0"  :style="{whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }" rounded="xl">
        <div class="d-flex ga-5 align-center flex-wrap">
            <h1 style="font-size: 20px;">Alunos da Equipe:</h1>
            <p v-for="team in form_work.team" :key="team.id">{{ team.name }}</p>
        </div>
        <div class="d-flex ga-5 align-center flex-wrap">
            <h1 style="font-size: 20px;">Disciplinas no projeto:</h1>
            <p v-for="field in form_work.field" :key="field.id">{{ field.name }}</p>
        </div>
        <div class="d-flex ga-5 align-center">
            <h1 style="font-size: 20px;">Tema transversal:</h1>
            <p>{{ form_work.cross_cutting_theme.name }}</p>
        </div>
        <div class="d-flex ga-5 align-center">
            <h1 style="font-size: 20px;">Orientador do projeto:</h1>
            <p>{{ form_work.advisor[0]?.name }}</p>
        </div>
        <div class="d-flex ga-5 align-center flex-wrap">
            <h1 style="font-size: 20px;">Colaboradores do projeto:</h1>
            <p v-for="co_advisor in form_work.co_advisor" :key="co_advisor.id">{{ co_advisor.name }}</p>
        </div>
        <div class="d-flex">
            <h1 class="w-50" style="font-size: 20px;" >Resumo do projeto:</h1>
            <p class="w-100">{{ form_work.abstract }}</p>
        </div>
    </VCard>
    <VBtn color="blue"  class="font-weight-bold text-h6" height="50" width="250"  slim rounded="xl" @click="$emit('submitPropose')">Submeter Proposta</VBtn>
</div>
</template>