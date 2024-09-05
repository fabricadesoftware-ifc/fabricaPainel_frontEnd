import { computed, reactive } from 'vue'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const usefilter = defineStore(
  'filterDefault',
  () => {
    const initialState = reactive({
      filter: {},
      options: [],
      editions: [],
      loading: false,
      years: [],
      category: [],
    })

    const state = useStorage('filter', initialState)

    const getCategory = async () => {
      try {
        const data = {
          results: [
            {
              id: 1,
              name: 'Categoria 1',
            }, {
              id: 2,
              name: 'Categoria 2',
            }, {
              id: 3,
              name: 'Categoria 3',
            },
          ],
        }
        state.value.category.push(data.results)
      } catch (error) {
        console.error(error)
      }
    }
  }
)
