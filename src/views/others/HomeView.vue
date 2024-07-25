<script setup>
import { computed, ref } from "vue";
  const text = ref('')
  const limit = 255
  const errmsg = computed(() =>{
    if(text.value.length > limit){
      return 'o campo deve ter no maximo 255 caracteres' 
    }
    return 'cadastre seu trabalho max: 255 caracteres'
  })
</script>
<template>
  <div>
    <h1>Home</h1>
    <p>Home page content</p>
    <input placeholder="texto" v-model="text">
    <p>{{errmsg}} - {{text.length}}</p>
  </div>
</template>
<style scoped>
</style>