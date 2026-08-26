import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import WorkService from '@/services/works'
import { useEdition } from '@/stores/edition'
import { useAuth } from './auth'
import { ICrossCuttingTheme } from '@/interfaces/themes'
import { IWorkStorage } from '@/interfaces/work'
import { showMessage } from '@/utils/toastify'
import { useStorage } from '@vueuse/core'

export const useWork = defineStore('work', () => {
  const editionStore = useEdition()
  const authStore = useAuth()
  const state = useStorage('worksstorage', {
    works: [] as any[],
    userWorks: [] as any[],
    advisorWorks: [] as any[],
    collaboratorWorks: [] as any[],
    evaluatorWorks: [] as any[],
    currentWork: null as any | null,
    myWorks: [] as any[],
    loading: false,
    error: null as string | null,
  })

  const WorkStorage = <IWorkStorage> reactive({
      title: '',
      abstract: '',
      field: [],
      advisor: [],
      cross_cutting_theme: {name: 'Escolha Uma Matéria Transversal'} as ICrossCuttingTheme,
      team: [],
      ods: [],
      collaborators: [],
      integrated_project: false
  })

  const team = computed(() => WorkStorage.team )
  const allWorks = computed(() => state.value.works)
  const currentWork = computed(() => state.value.currentWork)
  const userWorks = computed(() => state.value.userWorks)
  const advisorWorks = computed(()=> state.value.advisorWorks)
  const collaboratorWorks = computed(()=> state.value.collaboratorWorks)
  const evaluatorWorks = computed(()=> state.value.evaluatorWorks)

  const getWorkByCrossCuttingTheme = async (crossCuttingTheme: string) => {
    setLoading(true)
    setError(null)
    try {
      const myWorks = await WorkService.getWorkByCrossCuttingTheme(crossCuttingTheme)
      state.value.myWorks = myWorks
    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
    } finally {
      setLoading(false)
    }
  }

  const setLoading = (loading: boolean) => {
    state.value.loading = loading
  }

  const setError = (message: string | null) => {
    state.value.error = message
  }

  const fetchWorks = async () => {
    setLoading(true)
    setError(null)
    try {
      const works = await WorkService.getWorks()

      state.value.works = works
    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
    } finally {
      setLoading(false)
    }
  }

  type TeamMember = {id: number}
  type Team = {
    team_members: TeamMember[]
    [key: string]:any
  }
  const sendWork = async () => {
    setError(null)
    let teamCreatedInThisCall = false
    let teamId = null
    try {

      if ((authStore.user as any)?.team && (authStore.user as any).team.length > 0) {

        const userTeamData = (authStore.user as any).team

        for (let team of userTeamData as Team[]) {
        let teamMembers: number[] = (team.team_members.map((s:{id:number}) => s.id))

        let teamStored: any[] = (WorkStorage.team.map(s => s.id))
        teamMembers.sort((a,b) => a - b)
        teamStored.sort((a,b) => a - b)
        if (teamMembers.every(((value, index) => value === teamStored[index] ))) {
        teamId = team.id
        }
        }
      }
      if (!teamId) {


        try {
          const newTeam = {
            team_members: WorkStorage.team.map((member: any) => member.id),
            edition: editionStore.currentEdition?.id,
          }

          const createdTeam = await (authStore as any).createTeam(newTeam)

          teamId = createdTeam?.id || (authStore.team as any)?.id
          teamCreatedInThisCall = true

        } catch (createError: any) {
          console.error('Erro ao criar equipe:', createError)
          throw new Error('Erro ao criar equipe: ' + createError.message)
        }
      }


        const newWork = await WorkService.sendWork({
          title: WorkStorage.title || 'teste',
          abstract: WorkStorage.abstract,
          field: WorkStorage.field.map(f => f.id),
          advisor: WorkStorage.advisor[0]?.id,
          cross_cutting_theme: WorkStorage.cross_cutting_theme?.id,
          collaborators: WorkStorage.collaborators.map(co => co.id),
          integrated_project: WorkStorage.integrated_project,
          ods: WorkStorage.ods,

          team: teamId,
          edition: editionStore.currentEdition?.id,
        })


        state.value.works.push(newWork)
        showMessage('Trabalho enviado com sucesso!', 'success', 2000, 'top-right', 'light', true)

        // Só limpa o formulário depois de confirmar o envio, senão uma falha passageira
        // apagava tudo que o aluno preencheu e ele tinha que refazer do zero.
        WorkStorage.title = ''
        WorkStorage.abstract = ''
        WorkStorage.field = []
        WorkStorage.advisor = []
        WorkStorage.cross_cutting_theme = { name: 'Escolha Uma Matéria Transversal' } as ICrossCuttingTheme
        WorkStorage.team = []
        WorkStorage.ods = []
        WorkStorage.collaborators = []
        WorkStorage.integrated_project = false

    } catch (error: any) {
      console.error('Erro completo na submissão:', error)

      // Desfaz a equipe criada agora pra não deixar uma órfã travando nova tentativa.
      if (teamCreatedInThisCall && teamId) {
        try {
          await (authStore as any).deleteTeam(teamId)
        } catch (rollbackError) {
          console.error('Erro ao desfazer criação da equipe após falha no envio do trabalho:', rollbackError)
        }
      }

      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
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
      const index = state.value.works.findIndex(work => work.id === workId)
      if (index !== -1) {
        state.value.works[index] = patchedWork
      }
    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const coverteData = (date: any) => {
    return new Date(date).toLocaleString('pt-BR')
  }

  const getWork = async (workId: string) => {
    setLoading(true)
    setError(null)
    try {
      const selectedWork = await WorkService.getWork(workId)
      state.value.currentWork = selectedWork
    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserWorks = async (user_type: string, id: string) => {
    setLoading(true)
    setError(null)
    try {
      const works = await WorkService.getUserWorks(user_type, id)
      if (user_type == 'STUDENT') state.value.userWorks = works
      else {
        state.value.advisorWorks = works?.advisor ?? []
        state.value.collaboratorWorks = works?.collaborator ?? []
        state.value.evaluatorWorks = works?.evaluator ?? []
      }
    
      return works
    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
    } finally {
      setLoading(false)
    }
  }

  const approveWork = async () => {
    setLoading(true)
    setError(null)
    try {

      await WorkService.approveWork(state.value.currentWork.verification_token)
      state.value.currentWork.status = 2
      showMessage('Trabalho aprovado com sucesso!', 'success', 2000, 'top-right', 'light', true)

    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
      throw error
    } finally {
      setLoading(false)
    }
  }

   const rejectWork = async () => {
    setLoading(true)
    setError(null)
    try {
      await WorkService.rejectWork(state.value.currentWork.verification_token)
      state.value.currentWork.status = 4
      showMessage('Proposta Rejeitada com sucesso', 'success', 2000, 'top-right', 'light', false)


    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const RemoveUsersInWork = (email: string) => {
      const user = WorkStorage.team.findIndex(stu => stu?.email === email)
      WorkStorage.team.splice(user, 1)
  }

  const removeWork = async (id: string | number, token: string) => {
    try {
    await WorkService.cancelWork(id, token)
    showMessage('Proposta Cancelada com Sucesso', 'success', 2000, 'top-right', 'light', false)

    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
      throw error
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
    advisorWorks,
    collaboratorWorks,
    evaluatorWorks,
    approveWork,
    rejectWork,
    WorkStorage,
    RemoveUsersInWork,
    removeWork,
    team
  }
})