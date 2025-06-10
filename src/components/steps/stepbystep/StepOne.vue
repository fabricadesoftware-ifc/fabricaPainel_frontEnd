<script setup>
import { useWork } from '@/stores/work';
import { showMessage } from '@/utils/toastify';
import { useAuth } from '@/stores/auth';
import { useEdition } from '@/stores/edition';
import { loadTeamMembers, AddUser } from '@/utils/user';
const AuthStore = useAuth()
const WorkStore = useWork()
const editionStore = useEdition()
const autocompleteRef = ref(null)
const userFiltered = ref([])
const props = defineProps({
    me: {
        type: Object,
        required: true
    },
    team: {
        type: Array,
        required: true
    },
    isproject_integrated: {
        type: Boolean,
        required: true,
        default: true
    }
})

const verifyUserWorks = async (user) => {
    const result = await WorkStore.fetchUserWorks(user.user_type, user.id)
    console.log('Trabalhos encontrados:', result)

    return result.some(work => 
    [1, 2, 3].includes(work.status) &&
    work.edition?.year === new Date().getFullYear(),
    
)

}

const verifyUserClass = (user) => {
    return user.user_classes.some((s) => s.year == new Date().getFullYear())
}

const hintInput = computed(() => {
    const maxMembers = editionStore.currentEdition?.members_max || 7
    if (WorkStore.WorkStorage.team.length === maxMembers) {
        return 'limite máximo atingido'
    }
    return ''
})

const handleAddUser = async (selectedStudent) => {
  await AddUser({
    selectedStudent: selectedStudent,
    searchUsersFn: AuthStore.searchUsers,
    verifyUserClassFn: verifyUserClass,
    verifyUserWorksFn: verifyUserWorks,
    team: WorkStore.WorkStorage.team,
    isProjectIntegrated: props.isproject_integrated,
    me: props.me,
    pushToTeam: (user) => WorkStore.WorkStorage.team.push(user)
  })
}

function removeUser(email) {
    WorkStore.RemoveUsersInWork(email)
}

onMounted(async () => {
    const team = await loadTeamMembers({
      currentUser: AuthStore.user,
      teamIds: AuthStore.user.team,
      currentTeam: WorkStore.WorkStorage.team,
      searchUserFn: AuthStore.searchUsers,  
    })

    WorkStore.WorkStorage.team = team
})
</script>
<template>
    <div style="width: 70%;" class="pa-2 h-100">
        <StudentSelected rounded="xl"
            :disabled="WorkStore.WorkStorage.team.length === (editionStore.currentEdition?.members_max || 7)"
            :hint="hintInput" error_msg="estudante não encontrado" placeholder="pesquise por um estudante"
            label="pesquise pela matricula do estudante" user-type="STUDENT" @addUser="handleAddUser" />
        <div class="d-flex ga-2 mt-5">
            <p style="font-size: 12px;">* Limite máximo de estudantes: {{ editionStore.currentEdition?.members_max || 7
                }}</p>
            <p style="font-size: 12px;">* Limite minimo de estudantes: {{ editionStore.currentEdition?.members_min || 3
                }}</p>
        </div>
        <StepContainer title="Sua Equipe" no_arr_msg="Não há equipe" :step_array="WorkStore.WorkStorage.team"
            :is_subject="false" :me="props.me" @RemoveUser="removeUser"
            :min="editionStore.currentEdition?.members_min || 3" />
    </div>
</template>
