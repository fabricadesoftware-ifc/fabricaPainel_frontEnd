import { reactive } from 'vue'
import { defineStore } from 'pinia'
import EditionsService from '@/services/editions'
import CrossCuttingThemeService from '@/services/themes'
import WorkService from '@/services/works'
import { useRouter } from 'vue-router'

export const usePanel = defineStore(
  'usePanel',
  () => {
    const state = reactive({
      current: {
        year: 2024,
        theme: 'Technology and Innovation',
        edition_name: 'Tech Innovators',
        initial_submission_date: '2024-01-15',
        final_submission_date: '2024-03-01',
        initial_advisor_date: '2024-03-05',
        final_advisor_date: '2024-04-15',
        initial_evaluators_date: '2024-04-20',
        final_evaluators_date: '2024-05-10',
        initial_registration_theme_date: '2024-01-15',
        final_registration_theme_date: '2024-02-15',
        initial_registration_evaluators_date: '2024-02-20',
        final_registration_evaluators_date: '2024-03-10',
        workload: 120,
        banner: null,
        logo: null,
      },
      themes: [],
    })

    const router = useRouter()
    const currentEdition = computed(() => state.current)
    const crossCuttingThemes = computed(() => state.themes.map(theme => theme.name))

    const routerDates = computed(() => {
      return {
        registration_theme: {
          range: [state.current.initial_registration_theme_date, state.current.final_registration_theme_date],
          link: '/panel/registration-of-topics',
        },
        submission: {
          range: [state.current.initial_submission_date, state.current.final_submission_date],
          link: '/panel/work-submission',
        },
        advisor: {
          range: [state.current.initial_advisor_date, state.current.final_advisor_date],
          link: '/panel/evaluation',
        },
        registration_evaluators: {
          range: [state.current.initial_registration_evaluators_date, state.current.final_registration_evaluators_date],
          link: '/panel/registration_evaluators',
        },
        evaluators: {
          range: [state.current.initial_evaluators_date, state.current.final_evaluators_date],
          link: '/panel/evaluators',
        },
      }
    })

    const selectRouter = () => {
      console.log('routerDates', routerDates.value)
      const currentDate = new Date().toISOString().split('T')[0]
      console.log(currentDate) // Exemplo: "2024-09-05"

      console.log('routerDates', routerDates)
      console.log('currentDate', currentDate)
      for (const key in routerDates.value) {
        console.log('key', key)

        const range = (routerDates.value)[key].range
        const link = (routerDates.value)[key].link
        const initialDate = new Date(range[0]).toISOString().split('T')[0]
        const finalDate = new Date(range[1]).toISOString().split('T')[0]

        console.log('range', range)
        console.log('link', link)
        console.log('initialDate', initialDate)
        console.log('finalDate', finalDate)

        if (currentDate >= initialDate && currentDate <= finalDate) {
          router.push(link)
        }
      }

      router.push('/not-found')
    }

    const createEdition = async (form: any) => {
      try {
        console.log('pinia', form)
        const response = await EditionsService.createEdition(form)
        return response
      } catch (error) {
        throw new Error('Failed to create edition')
      }
    }

    const getEdition = async () => {
      try {
        const response = await EditionsService.getEdition()
        state.current = response
      } catch (error) {
        throw new Error('Failed to fetch editions')
      }
    }

    const getCrossCuttingThemes = async () => {
      try {
        const response = await CrossCuttingThemeService.getCrossCuttingThemes()
        state.themes = response
      } catch (error) {
        throw new Error('Failed to fetch cross-cutting themes')
      }
    }

    const saveCrossCuttingThemes = async () => {
      try {
        console.log(state.themes.map(theme => ({ ...theme, advisor: [...theme.advisor, 1] })))
        const responses = await Promise.all(
          state.themes.map(theme => CrossCuttingThemeService.saveCrossCuttingThemes(theme, [...theme.advisor, 1]))
        )
        return responses
      } catch (error) {
        console.error('Failed to save cross-cutting themes:', error)
        throw new Error('Failed to save cross-cutting themes')
      } finally {
        router.push('/panel')
      }
    }

    const sendWork = async (work: any) => {
      try {
        const themeId = state.themes.find(theme => theme.name === work.cross_cutting_theme)?.id
        const response = await WorkService.sendWork({
          ...work,
          cross_cutting_theme: themeId,
          field: [
            1,
          ],
          evaluator: [
            1,
          ],
          initial_submission_work_date: new Date().toISOString().split('T')[0],
          team: 1,
          ods: [
            1,
          ],
        })
        return response
      } catch (error) {
        throw new Error('Failed to send work')
      }
    }

    const getWorks = async () => {
      try {
        const response = await WorkService.getWorks()
        return response
      } catch (error) {
        throw new Error('Failed to fetch works')
      }
    }

    return {
      currentEdition,
      crossCuttingThemes,
      createEdition,
      getEdition,
      selectRouter,
      getCrossCuttingThemes,
      saveCrossCuttingThemes,
      sendWork,
      getWorks,
    }
  }
)
