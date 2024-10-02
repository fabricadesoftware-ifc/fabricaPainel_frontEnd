import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import authService from '@/services/auth'
import { useEdition } from './edition'
import { showMessage } from '@/utils/toastify'
import { useRoute } from 'vue-router'

export const useAuth = defineStore('user', () => {
  const state = reactive({
    isLogged: false,
    user: {
      id: '',
      name: '',
      email: '',
      user_type: '',
      team: [],
    },
    students: [] as Array<{ id: string; name: string }>,
    token: '',
    refresh: '',
    resetPasswordToken: '',
    team: {},
    userTeam: {},
  })

  const editionStore = useEdition()
  const router = useRoute()

  const isLogged = computed(() => state.isLogged)
  const user = computed(() => state.user)
  const token = computed(() => state.token)
  const refresh = computed(() => state.refresh)
  const resetPasswordToken = computed(() => state.resetPasswordToken)
  const uid = computed(() => state.user.id)
  const formattedStudents = computed(() => {
    return state.students.map((student: { name: string }) => {
      return student.name
    })
  })
  const students = computed(() => state.students)
  const isOpenForWork = computed(() => state.user.user_type === 'STUDENT' && editionStore.isOpenForWork)
  const isOpenForRegister = computed(() => state.user.user_type === 'TEACHER' && editionStore.isOpenForWork)
  const isOpenForAprove = computed(() => editionStore.isOpenForAprove)
  const team = computed(() => state.team)
  const userTeam = computed(() => state.userTeam)

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const refresh = localStorage.getItem('refresh')
    if (token && refresh) {
      state.isLogged = true
      state.token = token
      state.refresh = refresh
      refreshToken()
    }
  }

  const refreshToken = async () => {
    try {
      const { access } = await authService.refreshToken(state.refresh)
      const decoded_token = jwtDecode(access)
      state.token = access
      localStorage.setItem('token', access)
      state.user = await authService.getUser(decoded_token?.user_id)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getPassword = async (email: string) => {
    try {
      const data = await authService.forgetPassword(email)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const resetPassword = async (password: string) => {
    try {
      if (!state.resetPasswordToken) {
        return
      }
      const data = await authService.resetPassword(
        password,
        state.resetPasswordToken
      )
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const verifyToken = async (token: string) => {
    try {
      await authService.verifyToken(token)
      state.resetPasswordToken = token
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { access, refresh } = await authService.login(email, password)
      // eslint-disable-next-line camelcase
      const decoded_token = jwtDecode(access)
      state.isLogged = true
      state.token = access
      state.refresh = refresh
      localStorage.setItem('token', access)
      localStorage.setItem('refresh', refresh)
      state.user = await authService.getUser(decoded_token?.user_id)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = () => {
    state.isLogged = false
    state.token = ''
    state.refresh = ''
    state.user = {
      id: '',
      name: '',
      email: '',
      user_type: '',
      team: [],
    }
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
  }

  const getStudents = async () => {
    try {
      const data = await authService.getStudents()
      state.students = data
    } catch (error) {
      console.error(error)
    }
  }

  const getUserInfo = async () => {
    try {
      const data = await authService.getUser(state.user.id)
      state.user = data
    } catch (error) {
      console.error(error)
    }
  }

  const getUser = async (id: string) => {
    try {
      const data = await authService.getUser(id)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getUserTeam = async () => {
    try {
      const data = await authService.getUserTeam(state.user.id)
      console.log(data[0])
      state.userTeam = data[0]
      console.log(`userTeam: ${state.userTeam?.id}`)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getTeam = async (id: string) => {
    try {
      const data = await authService.getTeam(id)
      state.team = data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const leaveTeam = async (team: any) => {
    try {
      const data = await authService.updateTeam(team.id, team)
      state.team = data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const createTeam = async (team: any) => {
    const data = await authService.createTeam(team)
    state.team = data
  }

  const updateTeam = async (team: any) => {
    try {
      const data = await authService.updateTeam(team.id, team)
      state.team = data
    } catch (error: any) {
      console.log(error)
      showMessage(error.response.data.error, 'error', 3000, 'top-right', 'light', false)
      throw error
    }
  }

  const resendInvite = async (data: any) => {
    try {
      await authService.resendInvite(data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    isLogged,
    user,
    token,
    refresh,
    resetPasswordToken,
    uid,
    formattedStudents,
    isOpenForWork,
    isOpenForRegister,
    isOpenForAprove,
    students,
    team,
    getStudents,
    getUser,
    getUserInfo,
    getPassword,
    resetPassword,
    verifyToken,
    checkAuth,
    login,
    logout,
    getTeam,
    leaveTeam,
    createTeam,
    updateTeam,
    resendInvite,
    userTeam,
    getUserTeam,
  }
})
