import api from '@/plugins/api'
import { buildApiError } from '@/utils/apiError'

class AssessmentService {
  private handleError (error: any, fallbackMessage: string): never {
    console.error(`Error: ${fallbackMessage}`, error)
    throw buildApiError(error, fallbackMessage)
  }

  async createAssessment (assessment: any) {
    try {
      const { data } = await api.post('/assessment/', assessment)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível salvar a nota do trabalho.')
    }
  }

  async getAssessments () {
    try {
      const { data } = await api.get('/assessment/')
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar as notas.')
    }
  }

  async getAssessment (id: string) {
    try {
      const { data } = await api.get(`/assessment/${id}/`)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar a nota.')
    }
  }

  async getAssesmentByWork (id: string) {
     try {
      const { data } = await api.get(`/assessment/?work=${id}`)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar a nota do trabalho.')
    }
  }

  async updateAssessment (id: string, partialData: any) {
    try {
      const { data } = await api.patch(`/assessment/${id}/`, partialData)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível atualizar a nota do trabalho.')
    }
  }

  async deleteAssessment (id: string) {
    try {
      const { data } = await api.delete(`/assessment/${id}/`)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível remover a nota do trabalho.')
    }
  }
}

export default new AssessmentService()
