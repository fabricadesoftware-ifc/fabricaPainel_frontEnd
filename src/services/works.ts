import api from '@/plugins/api'

class WorkService {
  private handleError (error: any, action: string) {
    console.error(`Error during ${action}:`, error)
    throw new Error(`Failed to ${action} work`)
  }

  async sendWork (work: any) {
    try {
      const { data } = await api.post('/work/', work)
      console.log('Work created:', data)
      return data
    } catch (error) {
      this.handleError(error, 'create')
    }
  }

  async getWorks () {
    try {
      const { data } = await api.get('/work/')
      console.log('Works fetched:', data)
      return data
    } catch (error) {
      this.handleError(error, 'fetch')
    }
  }

  async updateWork (workId: string, partialWorkData: any) {
    try {
      const { data } = await api.patch(`/work/${workId}/`, partialWorkData)
      console.log('Work partially updated:', data)
      return data
    } catch (error) {
      this.handleError(error, 'patch')
    }
  }
}

export default new WorkService()
