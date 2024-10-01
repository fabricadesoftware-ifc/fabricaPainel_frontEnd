import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import AssessmentService from '@/services/assessment'

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
    } catch (error: any) {
      setError(error.message)
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

  const updateAssessment = async (id: string, partialData: any) => {
    setLoading(true)
    setError(null)
    try {
      const updatedAssessment = await AssessmentService.updateAssessment(id, partialData)
      const index = state.assessments.findIndex(assessment => assessment.id === id)
      if (index !== -1) {
        state.assessments[index] = updatedAssessment
      }
    } catch (error: any) {
      setError(error.message)
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

  const getAssessmentsByWorkId = async (workId: string) => {
    setLoading(true)
    setError(null)
    try {
      const assessments = await AssessmentService.getAssessments()
      const filteredAssessments = assessments.filter((assessment: any) => assessment.work_id === workId)
      return filteredAssessments
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
    getAssessmentsByWorkId,
  }
})
