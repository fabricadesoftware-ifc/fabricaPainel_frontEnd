import api from '@/plugins/api'

class WorkService {
  async sendWork (work: any) {
    try {
      const response = await api.post('/work/', work)
      console.log('response', response.data)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch editions')
    }
  }

  async getWorks () {
    try {
      const response = await api.get('/work/')
      console.log('response', response.data)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch editions')
    }
  }
}

export default new WorkService()
