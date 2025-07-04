import api from '@/plugins/api'
import { ICrossCuttingTheme } from '@/interfaces/themes'

class CategoriesService {
  private handleError (error: any, action: string) {
    console.error(`Error during ${action}:`, error)
    throw new Error(`Failed to ${action} work`)
  }

  async getCrossCuttingThemes () {
    try {
      const response = await api.get('/cross_cutting_theme/')
      return response.data
    } catch (error) {
      this.handleError(error, 'get')
    }
  }

  async updateCrossCuttingThemes (theme: ICrossCuttingTheme, advisor: string) {
    try {
      const response = await api.patch(`/cross_cutting_theme/${theme.id}/`, {
        advisor: [
          ...theme.advisor,
          advisor,
        ],
      })
      return response
    } catch (error) {
      this.handleError(error, 'update')
    }
  }

  async removeAdvisorCrossCuttingThemes (theme: ICrossCuttingTheme, advisor: string) {
    try {
      await api.patch(`/cross_cutting_theme/${theme.id}/`, {
        advisor: theme.advisor.filter(adv => adv !== advisor)
      })
    } catch (error) {
      this.handleError(error, 'delete')
    }
  }

  async getOds () {
    try {
      const response = await api.get('/ods/')
      return response.data
    } catch (error) {
      this.handleError(error, 'get')
    }
  }

  async getField () {
    try {
      const response = await api.get('/field/')
      return response.data
    } catch (error) {
      this.handleError(error, 'get')
    }
  }

  async FilterField(name: string){
    try {
      const response = await api.get(`/field/?name=${name}`)
      return response.data
    } catch (error) {
      this.handleError(error, 'get')
    }
  }
}

export default new CategoriesService()
