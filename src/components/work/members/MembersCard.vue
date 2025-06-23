<script lang="ts" setup>
// @ts-ignore
const props = defineProps({
    member: {
        type: Object,
        required: true
    },
    user_id: {
        type: [Number, String, null],
        default: null
    },
    member_id: {
        type: [Number,String],
        default: null
    },
    status: {
        type: [Number, String],
        default: 1
    }
})

const resolveAdvisorOrCollaboratorStatus = (status: Number | String) => {
    switch (status) {
        case 1: {
            return {
                text: 'Pendente',
                color: 'yellow-darken-2'
            }
        }
        case 2: {
            return {
                text: 'Aprovado',
                color: 'green-darken-2'
            }
        }
        case 3: {
            return {
                text: 'Rejeitado',
                color: 'red-darken-2'
            }
        }
        default:
            return {
                text: 'Pendente',
                color: 'yellow-darken-2'
            }
    }
}

onMounted(()=> {
    console.log(props.member_id)
})
</script>
<template>
      <div class="d-flex justify-space-between">

                <div>
                    <div class="d-flex align-center ga-10">
                        <p style=" font-size: 18px;">{{ props.member.name }}</p>
                        <v-chip v-if="props.user_id == props.member_id" color="blue-darken-2 d-flex justify-center align-center" style="width: 60px; height: 25px; font-size: 13px;">Você</v-chip>

                    </div>
                    <p class="opacity-60" style="font-size: 15px;">{{ props.member.email }}</p>
                </div>
                      <v-chip class="d-flex justify-center align-center" :color="resolveAdvisorOrCollaboratorStatus(props.status).color" label style="width: 150px;">{{ resolveAdvisorOrCollaboratorStatus(props.status).text }}</v-chip>


        </div>
</template>