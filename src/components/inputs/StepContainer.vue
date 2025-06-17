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
            type: Number,
            default: 420,
        }
    })
</script>
<template>
    <div class="mt-7" :style="{height: painel_height + 'px'}">
            <VCard class="pa-5 border d-flex flex-column  elevation-0 rounded-lg h-100">
                <div class="d-flex flex-wrap ga-5  justify-space-between align-center">
                    <h1 class="font-weight-bold text-center text-h5">{{ title }}</h1>
                    <VChip :color="step_array?.length < min ? 'red' : 'green'"
                        class="font-weight-bold d-flex justify-center align-center " style="width: 250px;">
                        {{ step_array?.length < min ? 'limite minimo não atingido'
                            : 'limite minimo atingido' }}</VChip>
                </div>
                <div class="d-flex flex-column mt-5 ga-10 pa-2 h-75 overflow-y-auto">
                    <VCardSubtitle v-if="step_array?.length === 0">
                       {{ no_arr_msg }}
                    </VCardSubtitle>
                    <div v-if="!is_subject" class="d-flex ga-5 pa-2 flex-column ">
                    <CardUser
                        v-for="step in step_array" :key="step.id" :me="me"
                        :email="step?.email" :name="step?.name"  @click="$emit('removeUser', step.email)"/>
                    </div>
                    <div v-else class="d-flex justify-start ga-10 w-100 align-center flex-wrap pa-5">
                        <VChip v-for="subject in step_array" closable :key="subject.id" @click:close="$emit('ExcludeSub', subject.id)">{{ subject.name }}</VChip>
                    </div>
                    </div>
            </VCard>
        </div>
</template>
