<script setup>
import { useDisplay } from 'vuetify';
import CardUser from '../steps/layout/CardUser.vue';
const props = defineProps({
    step_array: {
        type: Array,
        default: [],
        required: true
    },
    me: {
        type: Object,
        default: {}
    },
    min: {
        type: Number,
        required: 1
    },
    is_subject: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    no_arr_msg: {
        type: String,
        required: true
    },
    painel_height: {
        type: [Number, String],
        default: 820,
    }
})

const containerStyle = computed(() => {
    const height = props.painel_height | 350
    return { height: Number.isFinite(Number(height)) ? `${height}px` : String(height) }
})

const cardRef = ref(null)
const listRef = ref(null)

watch(() => props.step_array?.length, (newLength, oldLength) => {
    if (!newLength || newLength <= (oldLength || 0)) return
    nextTick(() => {
        // o scroll pode acontecer no VCard ou no container interno, dependendo da altura do painel
        for (const el of [cardRef.value?.$el, listRef.value]) {
            if (el) el.scrollTop = el.scrollHeight
        }
    })
})
</script>
<template>
    <div class="mt-7 d-flex flex-column" :style="containerStyle">
        <VCard ref="cardRef" class="pa-5 d-flex flex-column elevation-0 overflow-auto rounded-lg h-100 flex-1" border="opacity-43 md">

            <div class="d-flex flex-wrap ga-5 justify-space-between align-center">
                <h1 class="font-weight-bold text-center text-h5" :class="painel_height === 225 ? 'text-h6' : ''">{{
                    title }}</h1>
                <VChip :color="step_array?.length < min ? 'red' : 'green'"
                    class="font-weight-bold d-flex justify-center align-center " style="width: 250px;">
                    {{ step_array?.length < min ? 'limite minimo não atingido' : 'limite minimo atingido' }}</VChip>
            </div>
            <div ref="listRef" class="d-flex flex-column mt-5 ga-10 pa-2 flex-grow-1 overflow-y-auto"
                style="min-height: 0;">
                <VCardSubtitle v-if="step_array?.length === 0">
                    {{ no_arr_msg }}
                </VCardSubtitle>
                <div v-if="!is_subject" class="d-flex ga-5 pa-2 flex-column ">
                    <CardUser v-for="step in step_array" :key="step.id" :me="me" :email="step?.email" :name="step?.name"
                        :specialities="step?.specialities"
                        @removeUser="props.me.id == step.id ? '' : $emit('removeUser', step.email)" />
                </div>
                <div v-else class="d-flex justify-start ga-5 w-100 align-center flex-wrap ">
                    <VChip v-for="subject in step_array" closable :key="subject.id"
                        @click:close="$emit('ExcludeSub', subject.id)">{{ subject.name }}</VChip>
                </div>
            </div>
        </VCard>
    </div>
</template>
