import { IEdition } from '@/interfaces/edition'
import api from '@/plugins/api'

class EditionsService {
  async getEditions () {
    try {
      const response = await api.get('/edition/')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch editions')
    }
  }

  async getEdition () {
    try {
      const response = await api.get('/edition-open/')
      return response.data[0]
    } catch (error) {
      throw new Error('Failed to fetch editions')
    }
  }

  async createEdition (editionData: IEdition) {
    try {
      console.log('service', editionData)
      const response = await api.post('/edition/', editionData)
      return response.data
    } catch (error) {
      throw new Error('Failed to create edition')
    }
  }

  async updateEdition (editionId: string, editionData: IEdition) {
    try {
      const response = await api.put(`/edition/${editionId}/`, editionData)
      return response.data
    } catch (error) {
      throw new Error('Failed to update edition')
    }
  }
}

export default new EditionsService()
