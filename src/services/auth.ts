import api from '@/plugins/api'
import { buildApiError } from '@/utils/apiError'

class AuthService {
  private handleError (error: any, fallbackMessage: string): never {
    console.error(`Error: ${fallbackMessage}`, error)
    throw buildApiError(error, fallbackMessage)
  }

  async forgetPassword (email: string) {
    try {
      const { data } = await api.post('forget_password/', { email })
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível solicitar a redefinição de senha.')
    }
  }

  async resetPassword (new_password: string, token: string) {
    try {
      const { data } = await api.post('reset_password/', { new_password, token })
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível redefinir sua senha.')
    }
  }

  async verifyToken (token: string) {
    try {
      const { data } = await api.post('validate_password_token/', { token })
      return data
    } catch (error) {
      this.handleError(error, 'Este link de redefinição é inválido ou expirou.')
    }
  }

  async login (email: string, password: string) {
    try {

      const { data } = await api.post('token/', { email, password },)

      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível entrar. Verifique seu email e senha.')
    }
  }

  async getUser (id: string) {
    try {
      const { data } = await api.get(`users/${id}`)

      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar o usuário.')
    }
  }

  async GetMe(){
     try {
      const { data } = await api.get(`users/me/`)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar seus dados.')
    }
  }

  async getStudents () {
    try {
      const { data } = await api.get('users/?type=STUDENT')
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar os estudantes.')
    }
  }

  async getTeam (id: string) {
    try {
      const { data } = await api.get(`team/${id}`)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar a equipe.')
    }
  }

  async refreshToken (refresh: string) {
    try {
      const { data } = await api.post('token/refresh/', { refresh })
      return data
    } catch (error) {
      this.handleError(error, 'Sua sessão expirou.')
    }
  }

  async logout (refresh: string) {
    await api.post('token/logout/', { refresh })
  }

  async getUserTeam (id: string) {
    try {
      const { data } = await api.get(`team/?team_member_id=${id}`)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar sua equipe.')
    }
  }

  async updateTeam (id: string, team: any) {
    try {
      const { data } = await api.patch(`team/${id}/`, team)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível atualizar a equipe.')
    }
  }

  async createTeam (team: any) {
    try {
      const { data } = await api.post('team/', team)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível criar a equipe.')
    }
  }

  async deleteTeam (id: string | number) {
    try {
      await api.delete(`team/${id}/`)
    } catch (error) {
      this.handleError(error, 'Não foi possível remover a equipe.')
    }
  }

  async acceptInvite (team: any) {
    try {
      const { data } = await api.patch('team/', team)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível aceitar o convite.')
    }
  }

  async resendInvite (token: any) {
    try {
      const { data } = await api.post('resend-invite-team/', token)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível reenviar o convite.')
    }
  }

  async getUserThemes (id: string) {
    try {
      const { data } = await api.get(`cross_cutting_theme/?advisor_id=${id}`)
      return data
    } catch (error) {
      this.handleError(error, 'Não foi possível carregar os temas.')
    }
  }

  async searchUsers (search: string, type: string) { 
    const { data } = await api.get(`users/?registration=${search}&type=${type}`);
    return data;
  }
  
  async searchTeacher(search: string, type:string){
    const {data} = await api.get(`users/?name=${search}&type=${type}`)
    return data
  }

  async getEvaluatorByUserId (userId: string) {
    const { data } = await api.get(`evaluators/?user_id=${userId}`)
    return data
  }
}

export default new AuthService()
