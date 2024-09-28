import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'

export const uselayout = defineStore(
  'layoutDefault',
  () => {
    const initialState = reactive({
      layout: {} as any,
      drawer: false as any,
      loading: false as any,
    })

    const router = useRouter()
    const currentPage: ComputedRef<string> = computed(() => router.currentRoute.value.path)

    const state = useStorage('layout', initialState)
    const loading = computed(() => state.value.loading)
    const drawer = computed(() => state.value.drawer)
    const navbar = computed(() => state.value.layout.navbar)
    const navbarDashboard = computed(() => state.value.layout.navbarDashboard)
    const colorTheme = computed(() => state.value.layout.theme)
    const darkMode = useStorage('darkMode', false)
    const links = computed(() => {
      const result = navbarDashboard.value.filter((i:any) => {
        return i.value.split('/')[2] === currentPage.value.split('/')[2]
      })
      return result.length > 0 ? result[0].links : undefined
    })
    const actionLinks = computed(() => {
      const result = navbarDashboard.value.filter((i:any) => {
        return i.value.split('/')[2] === currentPage.value.split('/')[2]
      })
      return result.length > 0 ? result[0].actions : undefined
    })

    const toggleDrawer = () => state.value.drawer = !state.value.drawer
    const toggleDarkMode = () => darkMode.value = !darkMode.value
    const getSettings = async () => {
      try {
        const data = {
          results: {
            theme: 'primary',
            navbar: [
              {
                text: 'Página Inicial',
                value: '/',
              }, {
                text: 'Sobre o Projeto',
                value: '/about',
              }, {
                text: 'Todas as Edições',
                value: '/editions',
              },
            ],
            navbarDashboard: [
              {
                text: 'Edições',
                value: '/dashboard/editions',
                links: [
                  {
                    text: 'Atual',
                    value: '/dashboard/editions',
                  }, {
                    text: 'Anteriores',
                    value: '/dashboard/editions/all',
                  },
                ],
                actions: [
                  {
                    text: 'Nova Edição',
                    value: '/dashboard/editions/add',
                  },
                ],
              }, {
                text: 'Servidores',
                value: '/dashboard/colaborators',
                links: [
                  {
                    text: 'Permissões',
                    value: '/dashboard/colaborators',
                  },
                ],
                actions: [],
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
    }
  }
)
