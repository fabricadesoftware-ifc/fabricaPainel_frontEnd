import api from '@/plugins/api'

class StudentAssessmentService {
  private handleError (error: any, action: string) {
    console.error(`Error during ${action}:`, error)
    throw new Error(`Failed to ${action} student assessment`)
  }

  async getAssessments () {
    try {
      const { data } = await api.get('/student-assessment/')
      return data
    } catch (error) {
      this.handleError(error, 'fetch')
    }
  }

  async getAssessment (id: string) {
    try {
      const { data } = await api.get(`/student-assessment/${id}/`)
      return data
    } catch (error) {
      this.handleError(error, 'fetch')
    }
  }

  async createAssessment (assessment: any) {
    try {
      const { data } = await api.post('/student-assessment/', assessment)
      return data
    } catch (error) {
      this.handleError(error, 'create')
    }
  }

  async updateAssessment (id: string, assessment: any) {
    try {
      const { data } = await api.put(`/student-assessment/${id}/`, assessment)
      return data
    } catch (error) {
      this.handleError(error, 'update')
    }
  }

  async patchAssessment (id: string, partialData: any) {
    try {
      const { data } = await api.patch(`/student-assessment/${id}/`, partialData)
      return data
    } catch (error) {
      this.handleError(error, 'patch')
    }
  }

  async deleteAssessment (id: string) {
    try {
      await api.delete(`/student-assessment/${id}/`)
    } catch (error) {
      this.handleError(error, 'delete')
    }
  }
}

export default new StudentAssessmentService()
