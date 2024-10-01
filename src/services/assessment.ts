import api from '@/plugins/api'

class AssessmentService {
  private handleError (error: any, action: string) {
    console.error(`Error during ${action}:`, error)
    throw new Error(`Failed to ${action} assessment`)
  }

  async createAssessment (assessment: any) {
    try {
      const { data } = await api.post('/assessment/', assessment)
      return data
    } catch (error) {
      this.handleError(error, 'create')
    }
  }

  async getAssessments () {
    try {
      const { data } = await api.get('/assessment/')
      return data
    } catch (error) {
      this.handleError(error, 'fetch')
    }
  }

  async getAssessment (id: string) {
    try {
      const { data } = await api.get(`/assessment/${id}/`)
      return data
    } catch (error) {
      this.handleError(error, 'fetch')
    }
  }

  async updateAssessment (id: string, partialData: any) {
    try {
      const { data } = await api.patch(`/assessment/${id}/`, partialData)
      return data
    } catch (error) {
      this.handleError(error, 'patch')
    }
  }

  async deleteAssessment (id: string) {
    try {
      const { data } = await api.delete(`/assessment/${id}/`)
      return data
    } catch (error) {
      this.handleError(error, 'delete')
    }
  }
}

export default new AssessmentService()
