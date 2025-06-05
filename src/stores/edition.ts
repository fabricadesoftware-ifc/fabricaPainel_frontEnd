import { defineStore } from 'pinia'
import EditionsService from '@/services/editions'
import { IEdition } from '@/interfaces/edition'
import { showMessage } from '@/utils/toastify'
import { useStorage } from '@vueuse/core'

export const useEdition = defineStore('edition', () => {
  const state = useStorage('editionstorage', {
    currentEdition: null as IEdition | null,
    editions: [] as IEdition[],
    loading: false,
    error: null as string | null,
  })

  const currentEdition = computed(() => state.value.currentEdition)
  const alertStudent = computed(() => 'A data de submissão é de ' + state.value.currentEdition?.initial_submission_date + ' até ' + state.value.currentEdition?.final_submission_date)
  const teacherStudent = computed(() => 'Registro de Avaliadores (' + state.value.currentEdition?.initial_registration_evaluator_date + ' até ' + state.value.currentEdition?.final_registration_evaluator_date + ')')

  const isOpenForWork = computed(() => {
    const currentDate = new Date()
    const initialSubmissionDate = new Date(state.value.currentEdition?.initial_submission_date)
    const finalSubmissionDate = new Date(state.value.currentEdition?.final_submission_date)
    return initialSubmissionDate <= currentDate && finalSubmissionDate >= currentDate
  })
  const isOpenForRegister = computed(() => {
    const currentDate = new Date()
    const initialSubmissionDate = new Date(state.value.currentEdition?.initial_registration_theme_date)
    const finalSubmissionDate = new Date(state.value.currentEdition?.final_registration_theme_date)
    return initialSubmissionDate <= currentDate && finalSubmissionDate >= currentDate
  })
  const isOpenForAprove = computed(() => {
    const currentDate = new Date()
    const initialAdvisorDate = new Date(state.value.currentEdition?.initial_advisor_date)
    const finalAdvisorDate = new Date(state.value.currentEdition?.final_advisor_date)
    return initialAdvisorDate <= currentDate && finalAdvisorDate >= currentDate
  })
  const isOpenForGroup = computed(() => {
    const currentDate = new Date()
    const initialThemeDate = new Date(state.value.currentEdition?.initial_registration_theme_date)
    const finalSubmissionDate = new Date(state.value.currentEdition?.final_submission_date)
    return initialThemeDate <= currentDate && finalSubmissionDate >= currentDate
  })
  const isOpenForEvaluation = computed(() => {
    const currentDate = new Date()
    const initialEvaluationDate = new Date(state.value.currentEdition?.initial_evaluators_date)
    const finalEvaluationDate = new Date(state.value.currentEdition?.final_evaluators_date)
    return initialEvaluationDate <= currentDate && finalEvaluationDate >= currentDate
  })

  const setLoading = (loading: boolean) => {
    state.value.loading = loading
  }

  const setError = (message: string | null) => {
    state.value.error = message
  }

  const fetchEditions = async () => {
    setLoading(true)
    setError(null)
    try {
      const editions = await EditionsService.getEditions()
      state.value.editions = editions
      console.log(editions)
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
      state.value.currentEdition = edition
      console.log(edition)
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
      state.value.editions.push(newEdition)
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
      const index = state.value.editions.findIndex((edition : any) => edition.id === editionId)
      if (index !== -1) {
        state.value.editions[index] = updatedEdition
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
      showMessage('Feedback enviado com sucesso', 'success', 3000, 'top-right', 'light', false)
    } catch (error: any) {
      setError(error.message)
      throw error
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
    isOpenForEvaluation,
    fetchEditions,
    fetchCurrentEdition,
    createEdition,
    updateEdition,
    submitFeedback,
  }
})
