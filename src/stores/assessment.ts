import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import AssessmentService from '@/services/assessment'
import { showMessage } from '@/utils/toastify'

export const useAssessmentStore = defineStore('assessment', () => {
  const state = reactive({
    assessments: [] as any[],
    currentAssessment: null as any | null,
    loading: false,
    error: null as string | null,
  })

  const allAssessments = computed(() => state.assessments)
  const currentAssessment = computed(() => state.currentAssessment)

  const setLoading = (loading: boolean) => {
    state.loading = loading
  }

  const setError = (message: string | null) => {
    state.error = message
  }

  const fetchAssessments = async () => {
    setLoading(true)
    setError(null)
    try {
      const assessments = await AssessmentService.getAssessments()
      state.assessments = assessments
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const createAssessment = async (assessment: any) => {
    setLoading(true)
    setError(null)
    try {
      const newAssessment = await AssessmentService.createAssessment(assessment)
      state.assessments.push(newAssessment)
      showMessage('Nota salva com sucesso!', 'success', 2000, 'top-right', 'light', true)
    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getAssessment = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const assessment = await AssessmentService.getAssessment(id)
      state.currentAssessment = assessment
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

    const getAssessmentsByWork = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const assessment = await AssessmentService.getAssesmentByWork(id)
      state.currentAssessment = assessment
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateAssessment = async (id: string, partialData: any) => {
    setLoading(true)
    setError(null)
    try {
      const updatedAssessment = await AssessmentService.updateAssessment(id, partialData)
      const index = state.assessments.findIndex(assessment => assessment.id === id)
      if (index !== -1) {
        state.assessments[index] = updatedAssessment
      }
      showMessage('Nota atualizada com sucesso!', 'success', 2000, 'top-right', 'light', true)
    } catch (error: any) {
      setError(error.message)
      showMessage(error.message, 'error', 4000, 'top-right', 'light', false)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteAssessment = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await AssessmentService.deleteAssessment(id)
      state.assessments = state.assessments.filter(assessment => assessment.id !== id)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    state,
    allAssessments,
    currentAssessment,
    fetchAssessments,
    createAssessment,
    getAssessment,
    updateAssessment,
    deleteAssessment,
    getAssessmentsByWork,
  }
})
