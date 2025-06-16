import { ref } from "vue"

// Passos para cadastrar um trabalho

type Step = {
  title: string,
  value: string,
  complete: boolean,
  is_actual: boolean
}

export const steps = ref<Step[]>([
  {
    title: 'Alunos da Equipe',
    value: '1',
    complete: false,
    is_actual: true
  },
  {
    title: 'Informar disciplinas',
    value: '2',
    complete: false,
    is_actual: false
  },
  {
    title: 'Orientador do Projeto',
    value: '3',
    complete: false,
    is_actual: false
  },
  {
    title: 'Colaboradores do projeto',
    value: '4',
    complete: false,
    is_actual: false
  },
  {
    title: 'Proposta de Integração',
    value: '5',
    complete: false,
    is_actual: false
  }
])


export const resetSteps = () => {
  for (let i = 0; i < steps.value.length; i++) {
    steps.value[i].complete = false
    steps.value[i].is_actual = false
  }

}
