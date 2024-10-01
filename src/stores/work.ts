import { reactive } from 'vue'
import { defineStore } from 'pinia'
import WorkService from '@/services/works'
import { useCategory } from '@/stores/category'
import { useEdition } from '@/stores/edition'
import { useAuth } from './auth'

export const useWork = defineStore('work', () => {
  const categoryStore = useCategory()
  const editionStore = useEdition()
  const state = reactive({
    works: [] as any[],
    userWorks: [] as any[],
    currentWork: null as any | null,
    myWorks: [] as any[],
    loading: false,
    error: null as string | null,
  })

  const authStore = useAuth()

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
      state.works = works
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const sendWork = async (work: any) => {
    setError(null)
    try {
      console.log(work)
      const newWork = await WorkService.sendWork({
        ...work,
        cross_cutting_theme: categoryStore.state.themes.find((t: { name: string }) => t.name === work.cross_cutting_theme).id,
        ods: work.ods.map((odsItem: string) => categoryStore.state.ods.find((o: { name: string }) => o.name === odsItem).id),
        field: work.field.map((fieldItem: string) => categoryStore.state.field.find((f: { name: string }) => f.name === fieldItem).id),
        edition: editionStore.currentEdition?.id,
        evaluator: [],
        team: work.team,
      })
      state.works.push(newWork)
    } catch (error: any) {
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
  }
})
