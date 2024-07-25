import api from '@/plugins/axios'

class WorkService {
  async getWorks() {
    try {
      const response = await api.get('work/')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async createWork(data) {
    try {
      const response = await api.post('work/', data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async updateWork(id, data) {
    try {
      const response = await api.put(`work/${id}/`, data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteWork(id) {
    try {
      const response = await api.delete(`work/${id}/`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default new WorkService()
