import { reactive } from 'vue'
import { defineStore } from 'pinia'
import StudentAssessmentService from '@/services/studentAssessment'

export const useStudentAssessment = defineStore('studentAssessment', () => {
  const state = reactive({
    assessments: [] as any[],
    currentAssessment: null as any | null,
    loading: false,
    error: null as string | null,
  })

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
      const assessments = await StudentAssessmentService.getAssessments()
      state.assessments = assessments
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchAssessment = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const assessment = await StudentAssessmentService.getAssessment(id)
      state.currentAssessment = assessment
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
      const newAssessment = await StudentAssessmentService.createAssessment(assessment)
      state.assessments.push(newAssessment)
      return newAssessment
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateAssessment = async (id: string, assessment: any) => {
    setLoading(true)
    setError(null)
    try {
      const updatedAssessment = await StudentAssessmentService.updateAssessment(id, assessment)
      const index = state.assessments.findIndex(a => a.id === id)
      if (index !== -1) {
        state.assessments[index] = updatedAssessment
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const patchAssessment = async (id: string, partialData: any) => {
    setLoading(true)
    setError(null)
    try {
      const patchedAssessment = await StudentAssessmentService.patchAssessment(id, partialData)
      const index = state.assessments.findIndex(a => a.id === id)
      if (index !== -1) {
        state.assessments[index] = patchedAssessment
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
      await StudentAssessmentService.deleteAssessment(id)
      state.assessments = state.assessments.filter(a => a.id !== id)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    state,
    fetchAssessments,
    fetchAssessment,
    createAssessment,
    updateAssessment,
    patchAssessment,
    deleteAssessment
  }
})
