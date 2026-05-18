<script setup>
    defineProps({
      img: {
        type: [String, Object],
        default: null
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
  width: min(100%, 420px);
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 50px
}

.custom-label img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
