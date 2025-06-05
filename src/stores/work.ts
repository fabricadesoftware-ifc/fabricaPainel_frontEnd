import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import WorkService from '@/services/works'
import { useEdition } from '@/stores/edition'
import { useAuth } from './auth'
import { useStorage } from '@vueuse/core'
import { ICrossCuttingTheme } from '@/interfaces/themes'
import { IWorkStorage } from '@/interfaces/work'
import { showMessage } from '@/utils/toastify'

export const useWork = defineStore('work', () => {
  const editionStore = useEdition()
  const authStore = useAuth()
  const state = reactive({
    works: [] as any[],
    userWorks: [] as any[],
    currentWork: null as any | null,
    myWorks: [] as any[],
    loading: false,
    error: null as string | null,
  })

  const WorkStorage = useStorage<IWorkStorage>('workstorage', {
      title: '',
      abstract: '',
      field: [],
      advisor: [],
      cross_cutting_theme: {} as ICrossCuttingTheme,
      team: [],
      collaborators: [],
      integrated_project: false
  })

  const team = computed(() => WorkStorage.value.team )
  const allWorks = computed(() => state.works)
  const currentWork = computed(() => state.currentWork)
  const userWorks = computed(() => state.userWorks)

  const getWorkByCrossCuttingTheme = async (crossCuttingTheme: string) => {
    setLoading(true)
    setError(null)
    try {
      const myWorks = await WorkService.getWorkByCrossCuttingTheme(crossCuttingTheme)
      state.myWorks = myWorks
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const setLoading = (loading: boolean) => {
    state.loading = loading
  }

  const setError = (message: string | null) => {
    state.error = message
  }

  const fetchWorks = async () => {
    setLoading(true)
    setError(null)
    try {
      const works = await WorkService.getWorks()
      console.log(works)
      state.works = works
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const sendWork = async () => {
    setError(null)
    try {
      let teamId = null

      console.log('=== DEBUG TEAM DETECTION ===')
      console.log('authStore.team:', authStore.team)
      console.log('authStore.user:', authStore.user)
      console.log('authStore.user?.team:', (authStore.user as any)?.team)
      console.log('WorkStorage.value.team:', WorkStorage.value.team)
      console.log('WorkStorage.value.team.length:', WorkStorage.value.team.length)

      // Primeiro, verificar se há uma equipe no authStore
      if ((authStore.team as any)?.id) {
        teamId = (authStore.team as any).id
        console.log('Team ID encontrado no authStore:', teamId)
      }
      // Senão, verificar se o usuário tem uma equipe
      else if ((authStore.user as any)?.team && (authStore.user as any).team.length > 0) {
        const userTeamData = (authStore.user as any).team[0]
        // Se userTeamData for um número (ID da equipe), usar diretamente
        // Se for um objeto, tentar extrair o ID
        if (typeof userTeamData === 'number') {
          teamId = userTeamData
        } else {
          teamId = userTeamData?.team_id || userTeamData?.id
        }
        console.log('Team ID encontrado no user.team:', teamId)
      }
      // Se não há equipe existente, criar uma nova com os membros do WorkStorage
      else if (WorkStorage.value.team.length >= (editionStore.currentEdition?.members_min || 3)) {
        console.log('Criando nova equipe com membros:', WorkStorage.value.team)
        try {
          const newTeam = {
            team_members: WorkStorage.value.team.map((member: any) => member.id),
            sender_id: (authStore.user as any).id,
            edition: editionStore.currentEdition?.id,
          }
          console.log('Dados da nova equipe a ser criada:', newTeam)
          const createdTeam = await (authStore as any).createTeam(newTeam)
          console.log('Resposta da criação da equipe:', createdTeam)
          teamId = createdTeam?.id || (authStore.team as any)?.id
          console.log('Nova equipe criada com ID:', teamId)
        } catch (createError: any) {
          console.error('Erro ao criar equipe:', createError)
          throw new Error('Erro ao criar equipe: ' + createError.message)
        }
      }
      // Se ainda não temos teamId, tentar usar a equipe existente como fallback
      else if (WorkStorage.value.team.length > 0) {
        console.log('Tentando fallback: criando equipe mesmo com menos de 3 membros')
        try {
          const newTeam = {
            team_members: WorkStorage.value.team.map((member: any) => member.id),
            sender_id: (authStore.user as any).id,
            edition: editionStore.currentEdition?.id,
          }
          console.log('Dados da equipe fallback:', newTeam)
          const createdTeam = await (authStore as any).createTeam(newTeam)
          teamId = createdTeam?.id || (authStore.team as any)?.id
          console.log('Equipe fallback criada com ID:', teamId)
        } catch (fallbackError) {
          console.error('Erro no fallback de criação de equipe:', fallbackError)
        }
      }

      console.log('Team ID final:', teamId)

      if (!teamId) {
        throw new Error('Erro: Não foi possível determinar ou criar uma equipe para este trabalho. Verifique se você tem membros suficientes na equipe.')
      }

      const newWork = await WorkService.sendWork({
        title: WorkStorage.value.title || 'teste',
        abstract: WorkStorage.value.abstract,
        fields: WorkStorage.value.field.map(f => f.id),
        advisor: WorkStorage.value.advisor[0]?.id,
        cross_cutting_theme: WorkStorage.value.cross_cutting_theme?.id,
        collaborators: WorkStorage.value.collaborators.map(co => co.id),
        integrated_project: WorkStorage.value.integrated_project,
        team: teamId,
        edition: editionStore.currentEdition?.id,
      })
      state.works.push(newWork)
      console.log('Trabalho enviado com sucesso! Team ID:', teamId)
    } catch (error: any) {
      console.error('Erro completo na submissão:', error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateWork = async (workId: string, partialWorkData: any) => {
    setLoading(true)
    setError(null)
    try {
      const patchedWork = await WorkService.updateWork(workId, partialWorkData)
      const index = state.works.findIndex(work => work.id === workId)
      if (index !== -1) {
        state.works[index] = patchedWork
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // data q vem = 2024-09-28T01:33:06.548Z
  const coverteData = (date: any) => {
    // converter para dd/mm/aaaa hh:mm
    return new Date(date).toLocaleString('pt-BR')
  }

  const getWork = async (workId: string) => {
    setLoading(true)
    setError(null)
    try {
      const selectedWork = await WorkService.getWork(workId)
      state.currentWork = selectedWork
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserWorks = async () => {
    setLoading(true)
    setError(null)
    try {
      const userType = authStore.user.user_type
      const userId = authStore.user.id
      const works = await WorkService.getUserWorks(userType, userId)
      state.userWorks = works
      console.log(state.userWorks)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const approveWork = async () => {
    setLoading(true)
    setError(null)
    try {
      await WorkService.approveWork(state.currentWork.verification_token)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const RemoveUsersInWork = (email: string) => {
      const user = WorkStorage.value.team.findIndex(stu => stu?.email === email)
      WorkStorage.value.team.splice(user, 1)
  }

  const removeWork = async (id: string | number, token: string) => {
    try {
    await WorkService.cancelWork(id, token)
    showMessage('Proposta Cancelada com Sucesso', 'success', 2000, 'top-right', 'light', false)

    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }

  }
  return {
    state,
    allWorks,
    fetchWorks,
    getWorkByCrossCuttingTheme,
    sendWork,
    updateWork,
    coverteData,
    getWork,
    currentWork,
    fetchUserWorks,
    userWorks,
    approveWork,
    WorkStorage,
    RemoveUsersInWork,
    removeWork,
    team
  }
})
