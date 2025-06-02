import { computed } from "vue";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import authService from "@/services/auth";
import { useEdition } from "./edition";
import { showMessage } from "@/utils/toastify";
import { useStorage } from "@vueuse/core";

export const useAuth = defineStore("user", () => {
  const state = useStorage("state_user", {
    isLogged: false,
    user: {
      id: "",
      name: "",
      email: "",
      user_type: "",
      team: null,
    },
    tokenEmail: "",
    students: [] as Array<{ id: string; name: string }>,
    token: "",
    refresh: "",
    resetPasswordToken: "",
    team: null,
    userTeam: {},
    userThemes: [],
  });

  const editionStore = useEdition();

  const isLogged = computed(() => state.value.isLogged);
  const user = computed(() => state.value.user);
  const token = computed(() => state.value.token);
  const refresh = computed(() => state.value.refresh);
  const resetPasswordToken = computed(() => state.value.resetPasswordToken);
  const uid = computed(() => state.value.user.id);
  const formattedStudents = computed(() => {
    return state.value.students.map((student: { name: string }) => {
      return student.name;
    });
  });
  const students = computed(() => state.value.students);
  const isOpenForWork = computed(
    () => state.value.user.user_type === "STUDENT" && editionStore.isOpenForWork
  );
  const isOpenForRegister = computed(
    () =>
      state.value.user.user_type === "TEACHER" && editionStore.isOpenForRegister
  );
  const isOpenForEvaluation = computed(
    () =>
      state.value.user.user_type === "TEACHER" &&
      editionStore.isOpenForEvaluation
  );
  const isOpenForAprove = computed(() => editionStore.isOpenForAprove);
  const team = computed(() => state.value.team);
  const userTeam = computed(() => state.value.userTeam);
  const userThemes = computed(() => state.value.userThemes);

  const setTokenEmail = (email: string) => {
    state.value.tokenEmail = email;
  }

  const checkAuth = async () => {
    try {
      if (refresh) {
        await refreshToken();
        state.value.isLogged = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const { access } = await authService.refreshToken(state.value.refresh);
      const decoded_token = jwtDecode(access);
      state.value.token = access;
      localStorage.setItem("token", access);
      // @ts-ignore
      state.value.user = await authService.getUser(decoded_token?.user_id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getPassword = async () => {
    try {
      const data = await authService.forgetPassword(state.value?.tokenEmail);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const resetPassword = async (password: string) => {
    try {
      if (!state.value.resetPasswordToken) {
        return;
      }
      const data = await authService.resetPassword(
        password,
        state.value.resetPasswordToken
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const verifyToken = async (token: string) => {
    try {
      await authService.verifyToken(token);
      state.value.resetPasswordToken = token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { access, refresh } = await authService.login(email, password);
      // eslint-disable-next-line camelcase
      const decoded_token = jwtDecode(access);
      state.value.isLogged = true;
      state.value.token = access;
      state.value.refresh = refresh;
      // @ts-ignore
      state.value.user = await authService.getUser(decoded_token?.user_id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    state.value.isLogged = false;
    state.value.token = "";
    state.value.refresh = "";
    state.value.user = {
      id: "",
      name: "",
      email: "",
      user_type: "",
      team: null,
    };
    state.value.team = null;
    state.value.userTeam = {};
  };

  const getStudents = async () => {
    try {
      const data = await authService.getStudents();
      state.value.students = data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const data = await authService.getUser(state.value.user.id);
      state.value.user = data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (id: string) => {
    try {
      const data = await authService.getUser(id);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const GetMe = async () => {
      state.value.user = await authService.GetMe()
      console.log(state.value.user)
  }

  const getUserTeam = async () => {
    try {
      const data = await authService.getUserTeam(state.value.user.id);
      state.value.userTeam = data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getTeam = async (id: string) => {
    try {
      const data = await authService.getTeam(id);
      state.value.team = data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const leaveTeam = async (team: any) => {
    try {
      await authService.updateTeam(team.id, team);
      state.value.team = null;
      state.value.user.team = null;
    } catch (error) {
      console.error(error);
      showMessage(
        "Erro ao sair do grupo.",
        "error",
        3000,
        "top-right",
        "light",
        false
      );
      throw error;
    }
  };

  const createTeam = async (team: any) => {
    try {
      const data = await authService.createTeam(team);
      await getTeam(data.id);
    } catch (error: any) {
      showMessage(
        error.response.data.error,
        "error",
        3000,
        "top-right",
        "light",
        false
      );
      throw error;
    }
  };

  const updateTeam = async (team: any) => {
    try {
      await authService.updateTeam(team.id, team);
      await getTeam(team.id);
    } catch (error: any) {
      showMessage(
        error.response.data.error,
        "error",
        3000,
        "top-right",
        "light",
        false
      );
      throw error;
    }
  };

  const resendInvite = async (data: any) => {
    try {
      await authService.resendInvite(data);
      await getTeam(data.team_id);
      showMessage(
        "Convite reenviado.",
        "success",
        3000,
        "top-right",
        "light",
        false
      );
    } catch (error) {
      console.error(error);
      showMessage(
        "Erro ao reenviar convite.",
        "error",
        3000,
        "top-right",
        "light",
        false
      );
      throw error;
    }
  };

  const getUserThemes = async () => {
    try {
      const data = await authService.getUserThemes(state.value.user.id);
      state.value.userThemes = data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const searchUsers = async (search: string, type: string) => {
    try {
      const data = await authService.searchUsers(search, type);
      console.log(data, type)
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const searchTeacher = async (search: string, type: string) => {
    try {
      const data = await authService.searchTeacher(search, type);
      console.log(data, type)
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getEvaluatorByUserId = async(userId: string) => {
    try {
      const data = await authService.getEvaluatorByUserId(userId);
      return data;
    } catch (error) {
      console.error(error);
      return [];
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
    isOpenForEvaluation,
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
    getUserThemes,
    userThemes,
    searchUsers,
    setTokenEmail,
    getEvaluatorByUserId,
    GetMe,
    searchTeacher
  };
});
