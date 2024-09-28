import { reactive } from 'vue'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

interface Edition {
  id: number
  year: string
  edition_name: string
  text: string
  to: string
  status: boolean
  category: Array<number>
}

interface Ano {
  year: number
}

interface Anos {
  years: Array<Number>;
  max: Number;
  min: Number;
  seasons: Object;
}

interface Categoria {
  id: number
  category: string
}

export const usefilter = defineStore('filterDefault', () => {
  const initialState = reactive({
    filter: {},
    options: [],
    editions: [] as Edition[],
    loading: false,
    years: [] as Ano[],
    category: [] as Categoria[],
    yearsProcessed: [] as Anos[],
    yearsRange: [] as number[],
    amenities: <string[]>[],
  })

  const state = useStorage('filter', initialState)

  const setEditions = (editions: Edition[]) => {
    state.value.editions = editions
  }

  const setYears = (years: Ano[]) => {
    state.value.years = years
  }

  const setCategory = (categories: Categoria[]) => {
    state.value.category = categories
  }

  const setYearsRange = (years: number[]) => {
    state.value.yearsRange = years
  }

  // Você pode chamar essas funções em sua view para passar os dados:
  const initializeData = () => {
    setYears([
      { year: 2012 },
      { year: 2013 },
      { year: 2014 },
      { year: 2015 },
      { year: 2016 },
      { year: 2017 },
      { year: 2018 },
      { year: 2019 },
      { year: 2020 },
      { year: 2021 },
      { year: 2022 },
      { year: 2023 },
      { year: 2024 },
    ])

    setYearsRange([2012, 2024])

    setCategory([
      { id: 1, category: 'Tecnologia' },
      { id: 2, category: 'Saúde' },
      { id: 3, category: 'Negócios' },
      { id: 4, category: 'Educação' },
      { id: 5, category: 'Meio Ambiente' },
      { id: 6, category: 'Cultura' },
      { id: 7, category: 'Esportes' },
      { id: 8, category: 'Moda' },
      { id: 9, category: 'Gastronomia' },
      { id: 10, category: 'Arte' },
      { id: 11, category: 'Música' },
      { id: 12, category: 'Cinema' },
    ])

    setEditions([
      {
        id: 1,
        year: '2024',
        edition_name: 'Edição 2024',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: true,
        category: [1, 2],
      },
      {
        id: 2,
        year: '2023',
        edition_name: 'Edição 2023',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [3, 4],
      },
      {
        id: 3,
        year: '2022',
        edition_name: 'Edição 2022',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 5],
      },
      {
        id: 4,
        year: '2021',
        edition_name: 'Edição 2021',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [8, 2],
      },
      {
        id: 5,
        year: '2020',
        edition_name: 'Edição 2020',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 6],
      },
      {
        id: 6,
        year: '2019',
        edition_name: 'Edição 2019',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 11],
      },
      {
        id: 7,
        year: '2018',
        edition_name: 'Edição 2018',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 2],
      },
      {
        id: 8,
        year: '2017',
        edition_name: 'Edição 2017',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 2],
      },
      {
        id: 9,
        year: '2016',
        edition_name: 'Edição 2016',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 2],
      },
      {
        id: 10,
        year: '2015',
        edition_name: 'Edição 2015',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 2],
      },
      {
        id: 11,
        year: '2014',
        edition_name: 'Edição 2014',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 2],
      },
      {
        id: 12,
        year: '2013',
        edition_name: 'Edição 2013',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 2],
      },
      {
        id: 13,
        year: '2012',
        edition_name: 'Edição 2012',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
        to: '/',
        status: false,
        category: [1, 2],
      },
    ])
  }

  return {
    state,
    initializeData,
    setEditions,
    setYears,
    setCategory,
    setYearsRange,
  }
})
