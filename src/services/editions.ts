import { IEdition } from '@/interfaces/edition'
import api from '@/plugins/api'

class EditionsService {
  private handleError (error: any, action: string) {
    console.error(`Error during ${action}:`, error)
    throw new Error(`Failed to ${action} edition`)
  }

  async getEditions () {
    try {
      const { data } = await api.get('/edition/')
      return data
    } catch (error) {
      this.handleError(error, 'fetch')
    }
  }

  async getOpenEdition () {
    try {
      const { data } = await api.get('/edition-open/')
      return data[0]
    } catch (error) {
      this.handleError(error, 'fetch')
    }
  }

  async createEdition (editionData: IEdition) {
    try {
      console.log('Creating edition', editionData)
      const { data } = await api.post('/edition/', editionData)
      return data
    } catch (error) {
      this.handleError(error, 'create')
    }
  }

  async updateEdition (editionId: string, editionData: IEdition) {
    try {
      const { data } = await api.put(`/edition/${editionId}/`, editionData)
      return data
    } catch (error) {
      this.handleError(error, 'update')
    }
  }

  async submitFeedback (editionId: string, feedback: string) {
    try {
      await api.get(`needs-changes-work/${editionId}/?message=${feedback}`)
    } catch (error) {
      this.handleError(error, 'submit feedback')
    }
  }
}

export default new EditionsService()
