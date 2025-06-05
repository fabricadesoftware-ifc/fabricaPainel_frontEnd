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
      co_advisor: [],
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
      authStore.team

      const newWork = await WorkService.sendWork({
        title: WorkStorage.value.title || 'teste',
        abstract: WorkStorage.value.abstract,
        fields: WorkStorage.value.field.map(f => f.id),
        advisor: WorkStorage.value.advisor[0]?.id,
        cross_cutting_theme: WorkStorage.value.cross_cutting_theme?.id,
        co_advisor: WorkStorage.value.co_advisor.map(co => co.id),
        integrated_project: WorkStorage.value.integrated_project,
        team: (authStore.team as any)?.id,
        edition: editionStore.currentEdition?.id,
      })
      state.works.push(newWork)
      console.log(editionStore.state)
    } catch (error: any) {
      console.error(error)
      setError(error.message)
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
