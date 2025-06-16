
<script lang="ts" setup>
const props = defineProps({
    alternative_text: {
        type: String,
    },
    router_link: {
        type: String,
    }
})

const emits = defineEmits([
    'action'
])

const email = defineModel('email')
</script>
<template>
    
           
             
              <v-btn block color="primary" class="py-6" rounded="lg" @click="emits('action')">
                Enviar
              </v-btn>
               <p class="text-center mt-4" style="font-size: 0.9rem">
                <router-link class="text-decoration-none text-primary" :to="`${props.router_link}`">{{ props.alternative_text }}</router-link>
              </p>
        
        
</template>