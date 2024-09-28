import { defineStore } from 'pinia'
import EditionsService from '@/services/editions'
import CrossCuttingThemeService from '@/services/themes'
import { IEdition } from '@/interfaces/edition'
import { useRouter } from 'vue-router'

export const useEdition = defineStore('edition', () => {
  const state = reactive({
    currentEdition: null as IEdition | null,
    editions: [] as IEdition[],
    themes: [] as any[],
    loading: false,
    error: null as string | null,
  })

  const router = useRouter()
  const userId = 639
  const currentEdition = computed(() => state.currentEdition)
  const crossCuttingThemes = computed(() => state.themes.map(theme => theme.name))
  const alertStudent = computed(() => 'A data de submissão é de ' + state.currentEdition?.initial_submission_date + ' até ' + state.currentEdition?.final_submission_date)
  const teacherStudent = computed(() => 'Registro de Avaliadores (' + state.currentEdition?.initial_submission_date + ' até ' + state.currentEdition?.final_submission_date + ')')

  const setLoading = (loading: boolean) => {
    state.loading = loading
  }

  const setError = (message: string | null) => {
    state.error = message
  }

  const getCrossCuttingThemes = async () => {
    try {
      const response = await CrossCuttingThemeService.getCrossCuttingThemes()
      state.themes = response
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const saveCrossCuttingThemes = async (selectThemes: Number[]) => {
    setLoading(true)
    setError(null)
    try {
      const responses = await Promise.all(
        selectThemes.map(selectTheme => CrossCuttingThemeService.updateCrossCuttingThemes(state.themes.find(theme => theme.name === selectTheme), userId))
      )
      return responses
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
      router.push('/panel')
    }
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
    currentEdition,
    crossCuttingThemes,
    alertStudent,
    teacherStudent,
    fetchEditions,
    fetchCurrentEdition,
    createEdition,
    updateEdition,
    getCrossCuttingThemes,
    saveCrossCuttingThemes,
  }
})
