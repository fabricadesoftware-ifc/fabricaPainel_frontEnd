type Step = {
  title: string,
  value: string,
  complete: boolean,
  is_actual: boolean
}

export const StepsEdition = ref<Step[]>([
  {
    title: 'Informações',
    value: '1',
    complete: false,
    is_actual: true
  },
  {
    title: 'Prazos',
    value: '2',
    complete: false,
    is_actual: false
  },
  {
    title: 'Limites de equipes',
    value: '3',
    complete: false,
    is_actual: false
  },
  {
    title: 'Limites de Avaliação',
    value: '4',
    complete: false,
    is_actual: false
  },
  {
    title: 'logo e banner da edição',
    value: '5',
    complete: false,
    is_actual: false
  }
])