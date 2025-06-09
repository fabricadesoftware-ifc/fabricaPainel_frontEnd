<script setup>
import { useWork } from '@/stores/work';
import { showMessage } from '@/utils/toastify';
import { useAuth } from '@/stores/auth';
import { useEdition } from '@/stores/edition';
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

const hintInput = computed(() => {
    const maxMembers = editionStore.currentEdition?.members_max || 7
    if(WorkStore.WorkStorage.team.length === maxMembers){
        return 'limite máximo atingido'
    }
    return ''
})




const AddUser = async (selectedStudent) => {
    if (selectedStudent) {
        const searchUsers = await AuthStore.searchUsers(selectedStudent.user, selectedStudent.user_type)


        if(searchUsers.length !== 0){
            const team = (await verifyUserWorks(searchUsers[0]))
            console.log('user esta em equipe', team)
            console.log(team)
            const notRepeatUser = props.team.some(stu => stu.registration === Number(selectedStudent.user))
            if(!team && !notRepeatUser){
                WorkStore.WorkStorage.team.push(searchUsers[0])
                console.log(searchUsers)
            }
            else{
                showMessage(
                `Este usuario já se encontra em uma equipe`,
                "error",
                1500,
                "top-right",
                "auto",
                false
            );
            }
        }
        else {
            showMessage(
                `Estudante não encontrado`,
                "error",
                1500,
                "top-right",
                "auto",
                false
            );
        }
    }

    console.log(WorkStore.WorkStorage.team)
}

function removeUser(email) {
    WorkStore.RemoveUsersInWork(email)
}

onMounted(async () => {
    // Verificar se o usuário já tem um grupo e carregar a equipe
    if (AuthStore.user.team && AuthStore.user.team.length > 0) {
        // Se já tem equipe, buscar os dados completos dos membros da equipe
        try {
            // Para cada ID de membro da equipe, buscar os dados completos
            const teamMembers = []
            for (const teamId of AuthStore.user.team) {
                // Se teamId for um objeto, usar diretamente
                if (typeof teamId === Object) {
                    teamMembers.push(teamId)
                } else {
                    // Se for um ID, buscar o usuário
                    const userData = await AuthStore.searchUsers(teamId.toString(), 'STUDENT')
                    if (userData && userData.length > 0) {
                        teamMembers.push(userData[0])
                    }
                }
            }
            // Adicionar o usuário atual se não estiver na lista
            const currentUserInTeam = teamMembers.find(member => member.id === AuthStore.user.id)
            if (!currentUserInTeam) {
                teamMembers.push(AuthStore.user)
            }
            WorkStore.WorkStorage.team = teamMembers
        } catch (error) {
            console.error('Erro ao carregar membros da equipe:', error)
            // Fallback: adicionar apenas o usuário atual
            WorkStore.WorkStorage.team = [AuthStore.user]
        }
    } else {
        // Se não tem equipe, adicionar apenas o usuário atual
        // Verificar se o usuário atual já está na equipe para evitar duplicação
        const currentUserInTeam = WorkStore.WorkStorage.team.find(member => member.id === AuthStore.user.id)
        if (!currentUserInTeam) {
            WorkStore.WorkStorage.team.push(AuthStore.user)
        }
    }
})
</script>
<template>
    <div style="width: 70%;" class="pa-2 h-100">
        <StudentSelected rounded="xl" :disabled="WorkStore.WorkStorage.team.length === (editionStore.currentEdition?.members_max || 7)" :hint="hintInput" error_msg="estudante não encontrado" placeholder="pesquise por um estudante" label="pesquise pela matricula do estudante" user-type="STUDENT" @addUser="AddUser" />
        <div class="d-flex ga-2 mt-5">
            <p style="font-size: 12px;">* Limite máximo de estudantes: {{ editionStore.currentEdition?.members_max || 7 }}</p>
            <p style="font-size: 12px;">* Limite minimo de estudantes: {{ editionStore.currentEdition?.members_min || 3 }}</p>
        </div>
        <StepContainer title="Sua Equipe" no_arr_msg="Não há equipe" :step_array="WorkStore.WorkStorage.team"
            :is_subject="false" :me="props.me" @RemoveUser="removeUser" :min="editionStore.currentEdition?.members_min || 3" />
    </div>
</template>
