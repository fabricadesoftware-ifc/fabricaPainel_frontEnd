import { reactive } from 'vue'
import { defineStore } from 'pinia'
import WorkService from '@/services/works'

export const useWork = defineStore('work', () => {
  const state = reactive({
    works: [] as any[],
    currentWork: null as any | null,
    myWorks: [] as any[],
    loading: false,
    error: null as string | null,
  })

  const allWorks = computed(() => state.works)

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
    setLoading(true)
    setError(null)
    try {
      const newWork = await WorkService.sendWork(work)
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

  return {
    state,
    allWorks,
    fetchWorks,
    getWorkByCrossCuttingTheme,
    sendWork,
    updateWork,
    coverteData,
  }
})
