type Step = {
  title: string,
  value: string,
  complete: boolean,
  is_actual: boolean
}

export const StepsEdition = ref<Step[]>([
  {
    title: 'Dados basicos',
    value: '1',
    complete: false,
    is_actual: true
  },
  {
    title: 'Evento',
    value: '2',
    complete: false,
    is_actual: false
  },
  {
    title: 'Primeira etapa',
    value: '3',
    complete: false,
    is_actual: false
  },
  {
    title: 'Segunda etapa',
    value: '4',
    complete: false,
    is_actual: false
  },
  {
    title: 'Avaliacao',
    value: '5',
    complete: false,
    is_actual: false
  },
  {
    title: 'Equipe',
    value: '6',
    complete: false,
    is_actual: false
  },
  {
    title: 'Trabalhos',
    value: '7',
    complete: false,
    is_actual: false
  },
  {
    title: 'Proposta',
    value: '8',
    complete: false,
    is_actual: false
  },
  {
    title: 'Banner',
    value: '9',
    complete: false,
    is_actual: false
  }
])
