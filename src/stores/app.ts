import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const uselayout = defineStore(
  'layoutDefault',
  () => {
    const initialState = reactive({
      layout: {},
      drawer: false,
      loading: false,
      currentPage: '/',
    })

    const state = useStorage('layout', initialState)
    const loading = computed(() => state.value.loading)
    const drawer = computed(() => state.value.drawer)
    const navbar = computed(() => state.value.layout.navbar)
    const navbarDashboard = computed(() => state.value.layout.navbarDashboard)
    const colorTheme = computed(() => state.value.layout.theme)
    const darkMode = useStorage('darkMode', false)
    const currentPage = computed(() => state.value.currentPage)
    const links = computed(() => {
      const result = navbarDashboard.value.filter((i:any) => i.value === state.value.currentPage)
      return result.length > 0 ? result[0].links : undefined
    })
    const actionLinks = computed(() => {
      const result = navbarDashboard.value.filter((i:any) => i.value === state.value.currentPage)
      return result.length > 0 ? result[0].actions : undefined
    })

    const toggleDrawer = () => state.value.drawer = !state.value.drawer
    const toggleDarkMode = () => darkMode.value = !darkMode.value
    const setPage = (page: string) => state.value.currentPage = page
    const getSettings = async () => {
      try {
        // const data = await getLayout();
        const data = {
          results: {
            theme: 'primary',
            navbar: [
              {
                text: 'Página Inicial',
                value: '/',
              }, {
                text: 'Sobre o Projeto',
                value: '/settings',
              }, {
                text: 'Todas as Edições',
                value: '/colaborators',
              },
            ],
            navbarDashboard: [
              {
                text: 'Edições',
                value: '/dashboard',
                links: [
                  {
                    text: 'Atual',
                    value: '/dashboard',
                  }, {
                    text: 'Anteriores',
                    value: '/dashboard',
                  },
                ],
                actions: [
                  {
                    text: 'Nova Edição',
                    value: '/dashboard',
                  },
                ],
              }, {
                text: 'Colaboradores',
                value: '/colaborators',
              }, {
                text: 'Configurações',
                value: '/settings',
              },
            ],
          },
        }
        state.value.layout = data.results
      } catch (error) {
        console.error(error)
      }
    }

    return {
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
      setPage,
      toggleDrawer,
      toggleDarkMode,
    }
  }
)
