import api from '@/plugins/api'
import { ICrossCuttingTheme } from '@/interfaces/themes'

class CrossCuttingThemesService {
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

  async updateCrossCuttingThemes (theme: ICrossCuttingTheme, advisor: number) {
    try {
      const response = await api.patch(`/cross_cutting_theme/${theme.id}/`, {
        id: theme.id,
        name: theme.name,
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
}

export default new CrossCuttingThemesService()
