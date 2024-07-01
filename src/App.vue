<script setup>
import { useScreen } from '@/composables/screen';
const { menu } = useScreen();
</script>

<template>
<div>
<component :is="menu" />
<RouterView />
</div>
</template>
