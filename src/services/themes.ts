import api from '@/plugins/api'

class CrossCuttingThemesService {
  async getCrossCuttingThemes () {
    try {
      const response = await api.get('/cross_cutting_theme/')
      console.log('response', response.data)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch editions')
    }
  }

  async saveCrossCuttingThemes (theme: Object, advisor: Array<number>) {
    try {
      console.log(theme.id, theme.name, advisor)
      const response = await api.patch(`/cross_cutting_theme/${theme.id}/`, {
        name: theme.name,
        advisor,
      })
      return response
    } catch (error) {
      throw new Error('Failed to save cross-cutting themes')
    }
  }
}

export default new CrossCuttingThemesService()
