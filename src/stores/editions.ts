import { defineStore } from 'pinia'
import EditionsService from '@/services/editions'
import { IEdition } from '@/interfaces/edition'

export const useEdition = defineStore('edition', () => {
  const state = reactive({
    currentEdition: null as IEdition | null,
    editions: [] as IEdition[],
    loading: false,
    error: null as string | null,
  })

  const setLoading = (loading: boolean) => {
    state.loading = loading
  }

  const setError = (message: string | null) => {
    state.error = message
  }

  const fetchEditions = async () => {
    setLoading(true)
    setError(null)
    try {
      const editions = await EditionsService.getEditions()
      state.editions = editions
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentEdition = async () => {
    setLoading(true)
    setError(null)
    try {
      const edition = await EditionsService.getOpenEdition()
      state.currentEdition = edition
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const createEdition = async (editionData: IEdition) => {
    setLoading(true)
    setError(null)
    try {
      const newEdition = await EditionsService.createEdition(editionData)
      state.editions.push(newEdition)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateEdition = async (editionId: string, editionData: IEdition) => {
    setLoading(true)
    setError(null)
    try {
      const updatedEdition = await EditionsService.updateEdition(editionId, editionData)
      const index = state.editions.findIndex((edition : any) => edition.id === editionId)
      if (index !== -1) {
        state.editions[index] = updatedEdition
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    state,
    fetchEditions,
    fetchCurrentEdition,
    createEdition,
    updateEdition,
  }
})
