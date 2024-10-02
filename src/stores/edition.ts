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

  const currentEdition = computed(() => state.currentEdition)
  const alertStudent = computed(() => 'A data de submissão é de ' + state.currentEdition?.initial_submission_date + ' até ' + state.currentEdition?.final_submission_date)
  const teacherStudent = computed(() => 'Registro de Avaliadores (' + state.currentEdition?.initial_submission_date + ' até ' + state.currentEdition?.final_submission_date + ')')

  const isOpenForWork = computed(() => {
    const currentDate = new Date()
    const initialSubmissionDate = new Date(state.currentEdition?.initial_submission_date)
    const finalSubmissionDate = new Date(state.currentEdition?.final_submission_date)
    return initialSubmissionDate <= currentDate && finalSubmissionDate >= currentDate
  })
  const isOpenForRegister = computed(() => {
    const currentDate = new Date()
    const initialSubmissionDate = new Date(state.currentEdition?.initial_registration_theme_date)
    const finalSubmissionDate = new Date(state.currentEdition?.final_registration_theme_date)
    return initialSubmissionDate <= currentDate && finalSubmissionDate >= currentDate
  })
  const isOpenForAprove = computed(() => {
    const currentDate = new Date()
    const initialAdvisorDate = new Date(state.currentEdition?.initial_advisor_date)
    const finalAdvisorDate = new Date(state.currentEdition?.final_advisor_date)
    return initialAdvisorDate <= currentDate && finalAdvisorDate >= currentDate
  })
  const isOpenForGroup = computed(() => {
    const currentDate = new Date()
    const initialThemeDate = new Date(state.currentEdition?.initial_registration_theme_date)
    const finalSubmissionDate = new Date(state.currentEdition?.final_submission_date)
    console.log(initialThemeDate, currentDate, finalSubmissionDate)
    console.log(initialThemeDate <= currentDate && finalSubmissionDate >= currentDate)
    return initialThemeDate <= currentDate && finalSubmissionDate >= currentDate
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
    console.log(editionData)
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

  const updateEdition = async (editionId: any, editionData: IEdition) => {
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

  const submitFeedback = async (editionId: string, feedback: string) => {
    setLoading(true)
    setError(null)
    try {
      await EditionsService.submitFeedback(editionId, feedback)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    state,
    currentEdition,
    alertStudent,
    teacherStudent,
    isOpenForWork,
    isOpenForRegister,
    isOpenForAprove,
    isOpenForGroup,
    fetchEditions,
    fetchCurrentEdition,
    createEdition,
    updateEdition,
    submitFeedback,
  }
})
