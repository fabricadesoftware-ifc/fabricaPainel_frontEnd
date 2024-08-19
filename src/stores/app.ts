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
    const colorTheme = computed(() => state.value.layout.theme)
    const darkMode = useStorage('darkMode', false)
    const currentPage = computed(() => state.value.currentPage)
    const links = computed(() => {
      const result = navbar.value.filter((i:any) => i.value === state.value.currentPage)
      return result.length > 0 ? result[0].links : undefined
    })
    const actionLinks = computed(() => {
      const result = navbar.value.filter((i:any) => i.value === state.value.currentPage)
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
                text: 'Edições',
                value: '/',
                links: [
                  {
                    text: 'Atual',
                    value: '/',
                  }, {
                    text: 'Anteriores',
                    value: '/',
                  },
                ],
                actions: [
                  {
                    text: 'Nova Edição',
                    value: '/',
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
