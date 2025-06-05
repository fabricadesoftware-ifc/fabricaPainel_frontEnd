import { ref } from "vue"
export const steps = ref([
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
