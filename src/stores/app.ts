import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

export const uselayout = defineStore("layoutDefault", () => {
  const initialState = reactive({
    layout: {} as any,
    drawer: false as any,
    loading: false as any,
  });

  const router = useRouter();
  const currentPage: ComputedRef<string> = computed(
    () => router.currentRoute.value.path
  );
  const state = useStorage("layout", initialState);
  const loading = computed(() => state.value.loading);
  const drawer = computed(() => state.value.drawer);
  const canUseAdminArea = () => {
    const authStore = useAuth();
    return authStore.user?.user_type === "ADMIN" || Boolean(authStore.user?.is_management);
  };
  const filterByPermission = (items: any[] = []) => {
    return items.filter((item) => !item.adminOnly || canUseAdminArea());
  };
  const navbar = computed(() => filterByPermission(state.value.layout.navbar ?? []));
  const navbarDashboard = computed(() => filterByPermission(state.value.layout.navbarDashboard ?? []));
  const colorTheme = computed(() => state.value.layout.theme);
  const darkMode = useStorage("darkMode", false);
  const links = computed(() => {
    const result = navbarDashboard.value.filter((i: any) => {
      return i.value.split("/")[2] === currentPage.value.split("/")[2];
    });
    return result.length > 0 ? filterByPermission(result[0].links ?? []) : undefined;
  });
  const actionLinks = computed(() => {
    const result = navbarDashboard.value.filter((i: any) => {
      return i.value.split("/")[2] === currentPage.value.split("/")[2];
    });
    return result.length > 0 ? filterByPermission(result[0].actions ?? []) : undefined;
  });

  const eraseWords = (link: any) => {
    // Apenas normaliza o caminho alvo, sem alterar o estado reativo da rota atual
    return "/panel/" + link;
  };

  const toggleDrawer = () => (state.value.drawer = !state.value.drawer);
  const toggleDarkMode = () => (darkMode.value = !darkMode.value);
  const getSettings = async () => {
    try {
      const data = {
        results: {
          theme: "primary",
          navbar: [
            {
              text: "Página Inicial",
              value: "/",
            },
            {
              text: "Edições",
              value: eraseWords("editions"),
            },
            {
              text: "Propostas",
              value: eraseWords("works"),
            },
            {
              text: "Administrativo",
              value: "/panel/admin/proposals",
              adminOnly: true,
            },
          ],
          navbarDashboard: [
            {
              text: "Edições",
              value: "/panel/editions",
              links: [
                {
                  text: "Atual",
                  value: "/panel/editions",
                },
                {
                  text: "Anteriores",
                  value: "/panel/editions",
                },
              ],
              actions: [
                {
                  text: "Nova Edição",
                  value: "/panel/editions/add",
                },
              ],
            },
            {
              text: "Servidores",
              value: "/panel/colaborators",
              links: [
                {
                  text: "Permissões",
                  value: "/panel/colaborators",
                },
              ],
              actions: [],
            },
            {
              text: "Propostas",
              value: "/panel/works",
              links: [
                {
                  text: "Submissoes",
                  value: "/panel/works",
                },
              ],
              actions: [],
            },
            {
              text: "Administrativo",
              value: "/panel/admin/proposals",
              adminOnly: true,
              links: [
                {
                  text: "Propostas",
                  value: "/panel/admin/proposals",
                },
                {
                  text: "Relatorios",
                  value: "/panel/admin/reports",
                },
              ],
              actions: [],
            },
          ],
        },
      };
      state.value.layout = data.results;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    navbar,
    navbarDashboard,
    colorTheme,
    drawer,
    loading,
    darkMode,
    links,
    actionLinks,
    currentPage,
    getSettings,
    toggleDrawer,
    toggleDarkMode,
  };
});
