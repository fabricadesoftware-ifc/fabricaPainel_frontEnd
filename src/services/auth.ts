import api from '@/plugins/api'

class AuthService {
  private handleError (error: any, action: string) {
    console.error(`Error during ${action}:`, error)
    throw new Error(`Failed to ${action} user`)
  }

  async forgetPassword (email: string) {
    try {
      const { data } = await api.post('forget_password/', { email })
      return data
    } catch (error) {
      this.handleError(error, 'forgot password')
    }
  }

  async resetPassword (new_password: string, token: string) {
    try {
      const { data } = await api.post('reset_password/', { new_password, token })
      return data
    } catch (error) {
      this.handleError(error, 'reset password')
    }
  }

  async verifyToken (token: string) {
    try {
      const { data } = await api.post('validate_password_token/', { token })
      return data
    } catch (error) {
      this.handleError(error, 'verify token')
    }
  }

  async login (email: string, password: string) {
    try {
      const { data } = await api.post('token/', { email, password })
      return data
    } catch (error) {
      this.handleError(error, 'login')
    }
  }

  async getUser (id: string) {
    try {
      const { data } = await api.get(`users/${id}`)
      return data
    } catch (error) {
      this.handleError(error, 'get user')
    }
  }

  async getStudents () {
    try {
      const { data } = await api.get('users/?type=STUDENT')
      return data
    } catch (error) {
      this.handleError(error, 'get students')
    }
  }

  async getTeam (id: string) {
    try {
      const { data } = await api.get(`team/${id}`)
      return data
    } catch (error) {
      this.handleError(error, 'get group')
    }
  }

  async refreshToken (refresh: string) {
    try {
      const { data } = await api.post('token/refresh/', { refresh })
      return data
    } catch (error) {
      this.handleError(error, 'refresh token')
    }
  }

  async getUserTeam (id: string) {
    try {
      const { data } = await api.get(`team/?team_member_id=${id}`)
      return data
    } catch (error) {
      this.handleError(error, 'get user team')
    }
  }

  async updateTeam (id: string, team: any) {
    const { data } = await api.patch(`team/${id}/`, team)
    return data
  }

  async createTeam (team: any) {
    const { data } = await api.post('team/', team)
    return data
  }

  async acceptInvite (team: any) {
    try {
      const { data } = await api.patch('team/', team)
      return data
    } catch (error) {
      this.handleError(error, 'accept invite')
    }
  }

  async resendInvite (token: any) {
    try {
      const { data } = await api.post('resend-invite-team/', token)
      return data
    } catch (error) {
      this.handleError(error, 'resend invite')
    }
  }

  async getUserThemes (id: string) {
    try {
      const { data } = await api.get(`cross_cutting_theme/?advisor_id=${id}`)
      return data
    } catch (error) {
      this.handleError(error, 'get user themes')
    }
  }
}

export default new AuthService()
