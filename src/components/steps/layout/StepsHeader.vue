<script setup>
    defineProps({
        user: {
            type: Object,
            required: true
        },
    })
</script>
<template>
    <div class="d-flex justify-space-between align-center pa-2">
        <p class="text-blue ms-10" style="font-size: 15px;">Precisa de Ajuda?</p>
        <div class="d-flex align-center jusitfy-center ga-3">
            <VImg :src="user.img" width="40" rounded="xl"></VImg>
            <p class="font-weight-bold me-10" style="font-size: 15px;">{{ user.name }}</p>
        </div>
    </div>
</template>
