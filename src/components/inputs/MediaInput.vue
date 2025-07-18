<script setup>
    defineProps({
      img: {
        type: URL,
        required: true
      }
    })
</script>
<template>
  <label for="imgFile" class="custom-label" >
    <p v-if="!img">+</p>
    <img :src="img" v-else/>
  </label>
  <input type="file" class="d-none" id="imgFile" @change="$emit('changeImg', $event)" />
</template>
<style scoped>
.custom-label {
  border: 3px solid #ccc;
  border-style: dotted;
  width: 400px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 50px
}
</style>