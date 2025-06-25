import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import WorkService from '@/services/works'
import { useEdition } from '@/stores/edition'
import { useAuth } from './auth'
import { ICrossCuttingTheme } from '@/interfaces/themes'
import { IWorkStorage } from '@/interfaces/work'
import { showMessage } from '@/utils/toastify'

export const useWork = defineStore('work', () => {
  const editionStore = useEdition()
  const authStore = useAuth()
  const state = reactive({
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
      cross_cutting_theme: {} as ICrossCuttingTheme,
      team: [],
      ods: [],
      collaborators: [],
      integrated_project: false
  })

  const team = computed(() => WorkStorage.team )
  const allWorks = computed(() => state.works)
  const currentWork = computed(() => state.currentWork)
  const userWorks = computed(() => state.userWorks)
  const advisorWorks = computed(()=> state.advisorWorks)
  const collaboratorWorks = computed(()=> state.collaboratorWorks)
  const evaluatorWorks = computed(()=> state.evaluatorWorks)

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

  type TeamMember = {id: number}
  type Team = {
    team_members: TeamMember[]
    [key: string]:any 
  }
  const sendWork = async () => {
    setError(null)
    try {
      let teamId = null

      // Primeiro verifica se o usuário tem uma equipe, e se tiver compara se alguma das equipes é a mesma que ele colocou no trabalho
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
        // Se não há equipe existente, criar uma nova com os membros do WorkStorage
      if (!teamId) {
        
      
        try {
          const newTeam = {
            team_members: WorkStorage.team.map((member: any) => member.id),
            edition: editionStore.currentEdition?.id,
          }
          
          const createdTeam = await (authStore as any).createTeam(newTeam)
         
          teamId = createdTeam?.id || (authStore.team as any)?.id
         
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

          team: teamId,
          edition: editionStore.currentEdition?.id,
        })
       

        state.works.push(newWork)
        showMessage('Trabalho enviado com sucesso!', 'success', 2000, 'top-right', 'light', true)

       
        
    } catch (error: any) {
      console.error('Erro completo na submissão:', error)
     
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
      // Limpa o WorkStorage
        WorkStorage.title = ''
        WorkStorage.abstract = ''
        WorkStorage.field = []
        WorkStorage.advisor = []
        WorkStorage.cross_cutting_theme = {} as ICrossCuttingTheme
        WorkStorage.team = []
        WorkStorage.collaborators = []
        WorkStorage.integrated_project = false
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

  const fetchUserWorks = async (user_type: string, id: string) => {
    setLoading(true)
    setError(null)
    try {
      const works = await WorkService.getUserWorks(user_type, id)
      if (user_type == 'STUDENT') state.userWorks = works
      else {
        state.advisorWorks = works.advisor
        state.collaboratorWorks = works.collaborator
        state.evaluatorWorks = works.evaluator
        
      }
      console.log(state.userWorks)
      return works
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
      const user = WorkStorage.team.findIndex(stu => stu?.email === email)
      WorkStorage.team.splice(user, 1)
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
    advisorWorks,
    collaboratorWorks,
    evaluatorWorks,
    approveWork,
    WorkStorage,
    RemoveUsersInWork,
    removeWork,
    team
  }
})
