import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import authService from "@/services/auth";
import { th } from "vuetify/locale";

export const useAuth = defineStore("user", () => {
    const state = reactive({
        isLogged: false,
        user: {
            name: "",
            email: "",
            role: "",
        },
        token: "",
        refresh: "",
        resetPasswordToken: "",
    })

    const isLogged = computed(() => state.isLogged)
    const user = computed(() => state.user)
    const token = computed(() => state.token)
    const refresh = computed(() => state.refresh)
    const resetPasswordToken = computed(() => state.resetPasswordToken)

    const checkAuth = () => {
        const token = localStorage.getItem("token")
        const refresh = localStorage.getItem("refresh")
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
            localStorage.setItem("token", access)
            state.user = await authService.getUser(decoded_token?.user_id)
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    const getPassword = async (email: string) => {
        try {
            const data = await authService.forgetPassword(email)
            return data
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    const resetPassword = async (password: string) => {
        try {
            if (!state.resetPasswordToken) {
                return
            }
            console.log(password, state.resetPasswordToken)
            const data = await authService.resetPassword(password, state.resetPasswordToken)
            console.log(data)
            return data
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    const verifyToken = async (token: string) => {
        try {
            await authService.verifyToken(token)
            state.resetPasswordToken = token
        }
        catch (error) {
            console.error(error)
            console.log('bilau')
            throw error
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const { access, refresh } = await authService.login(email, password)
            const decoded_token = jwtDecode(access)
            state.isLogged = true
            state.token = access
            state.refresh = refresh
            localStorage.setItem("token", access)
            localStorage.setItem("refresh", refresh)
            state.user = await authService.getUser(decoded_token?.user_id)
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }

    const logout = () => {
        state.isLogged = false
        state.token = ""
        state.refresh = ""
        state.user = {
            name: "",
            email: "",
            role: "",
        }
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
    }

    return {
        isLogged,
        user,
        token,
        refresh,
        resetPasswordToken,
        getPassword,
        resetPassword,
        verifyToken,
        checkAuth,
        login,
        logout,
    }
})