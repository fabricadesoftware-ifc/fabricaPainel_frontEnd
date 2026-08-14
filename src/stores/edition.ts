import { defineStore } from 'pinia'
import EditionsService from '@/services/editions'
import { IEdition } from '@/interfaces/edition'
import { showMessage } from '@/utils/toastify'
import { useStorage } from '@vueuse/core'
import api from '@/plugins/api'

const defaultEvaluationCriteria = () => [
  {
    key: 'work',
    target: 'work',
    label: 'Nota do avaliador',
    weight: 50,
    criteria: [
      {
        key: 'work_general',
        label: 'Nota geral do trabalho',
        description: '',
        weight: 100,
      },
    ],
  },
  {
    key: 'student',
    target: 'student',
    label: 'Nota do orientador',
    weight: 50,
    criteria: [
      {
        key: 'student_general',
        label: 'Nota geral do aluno',
        description: '',
        weight: 100,
      },
    ],
  },
]

const evaluationCriteriaField = () => ({
  label: 'Critérios de avaliação',
  value: defaultEvaluationCriteria(),
  type: 'evaluation_criteria',
})

export const useEdition = defineStore('edition', () => {
  const state = useStorage('editionstorage', {
    currentEdition: null as IEdition | null,
    editions: [] as IEdition[],
    loading: false,
    error: null as string | null,
  })

  const newEdtion = useStorage<{ newedition: any[] }>('neweditionstorage', {
    newedition: [
      {
        label: 'nome da edição',
        placeholder: 'nome da edição do painel',
        value: '',
        type: 'text'
      },
      {
        label: 'ano da edição',
        placeholder: 'ano da edição do painel',
        value: '',
        type: "text"
      },
      {
        label: 'tema da edição',
        placeholder: 'tema da edição do painel',
        value: '',
        type: 'text'
      },
      {
        label: 'data do evento',
        value: '',
        type: 'date'
      },
      {
        label: 'data final do evento',
        value: '',
        type: 'date'
      },
      {
        label: 'data de inicio da 1 Aceite/Rejeição',
        value: '',
        type: 'date'
      },
      {
        label: 'data de inicio da 2 Aceite/Rejeição',
        value: '',
        type: 'date'
      },
      {
        label: 'data de inicio da 1 submissão',
        value: '',
        type: 'date'
      },
      {
        label: 'data de inicio da 2 submissão',
        value: '',
        type: 'date'
      },
      {
        label: 'data de inicio da avaliação',
        value: '',
        type: 'date'
      },
      {
        label: 'data de fim da 1 Aceite/Rejeição',
        value: '',
        type: 'date'
      },
      {
        label: 'data de fim da 2 Aceite/Rejeição',
        value: '',
        type: 'date'
      },
      {
        label: 'data de fim da 1 submissão',
        value: '',
        type: 'date'
      },
      {
        label: 'data de fim da 2 submissão',
        value: '',
        type: 'date'
      },
      {
        label: 'data de fim da avaliação',
        value: '',
        type: 'date'
      },
      {
        label: "Limite de alunos na equipe",
        qtds: [
          {
            placeholder: "MIN",
            icon: 'mdi-account',
            value: ""
          },
          {
            placeholder: "MAX",
            icon: "mdi-account-multiple",
            value: ""
          }
        ]
      },
      {
        label: "Limite de colaboradores por projeto",
        qtds: [
          {
            placeholder: "MIN",
            icon: 'mdi-account',
            value: ""
          },
          {
            placeholder: "MAX",
            icon: "mdi-account-multiple",
            value: ""
          }
        ]
      },
      {
        label: "Minimo de disciplinas integradas",
        qtds: [
          {
            placeholder: "MIN",
            icon: 'mdi-book',
            value: ""
          },
          {
            placeholder: "MAX",
            icon: "mdi-book-multiple",
            value: ""
          }
        ]
      },
      {
        label: "por avaliador",
        placeholder: "MAX",
        value: "",
        type: "text",
      },
      {
        label: "por orientador",
        placeholder: "MAX",
        value: "",
        type: "text"
      },
      {
        label: "por colaborador",
        placeholder: "MAX",
        value: "",
        type: "text",
      },
      {
        label: "minimo de palavras por proposta",
        placeholder: "MAX",
        value: "",
        type: "text",
      },
      {
        label: "quantidade de avaliadores por trabalho",
        placeholder: "Quantidade",
        value: "",
        type: "text",
        icon: "mdi-account-multiple"
      },
      {
        label: "carga horária",
        placeholder: "Quantidade",
        value: "",
        type: "text"
      },
      {
        label: "banner da edição",
        value: '',
      }
    ] as any[]
  })

  function ensureNewEditionEvaluationCriteriaField() {
    const fields = newEdtion.value.newedition
    let criteriaIndex = fields.findIndex((field: any) => field?.type === 'evaluation_criteria')
    const legacyGradeIndex = fields.findIndex((field: any) => field?.type === 'grade_weights')

    if (legacyGradeIndex !== -1) {
      fields.splice(legacyGradeIndex, 1)
      criteriaIndex = fields.findIndex((field: any) => field?.type === 'evaluation_criteria')
    }

    if (criteriaIndex === -1) {
      const bannerIndex = fields.findIndex((field: any) =>
        String(field?.label || '').toLowerCase().includes('banner')
      )
      fields.splice(bannerIndex >= 0 ? bannerIndex : fields.length, 0, evaluationCriteriaField())
      criteriaIndex = fields.findIndex((field: any) => field?.type === 'evaluation_criteria')
    }

    if (criteriaIndex !== 24) {
      const [criteriaField] = fields.splice(criteriaIndex, 1)
      fields.splice(24, 0, criteriaField)
    }

    const criteriaField = fields[24]
    if (criteriaField && (!Array.isArray(criteriaField.value) || criteriaField.value.length === 0)) {
      criteriaField.value = defaultEvaluationCriteria()
    }
  }

  const normalizeNewEditionDraft = ensureNewEditionEvaluationCriteriaField

  ensureNewEditionEvaluationCriteriaField()

  const currentEdition = computed(() => state.value.currentEdition)

  async function CreateObjArr() {
    ensureNewEditionEvaluationCriteriaField()

    const fieldMap = [
      ['edition_name'],
      ['year'],
      ['theme'],
      ['event_date'],
      ['final_event_date'],
      ['initial_advisor_acceptance'],
      ['initial_second_advisor_date'],
      ['initial_submission_date'],
      ['initial_second_submission_date'],
      ['initial_evaluators_date'],
      ['final_advisor_acceptance'],
      ['final_second_advisor_date'],
      ['final_submission_date'],
      ['final_second_submission_date'],
      ['final_evaluators_date'],
      ['members_min', 'members_max'],
      ['collaborators_min', 'collaborators_max'],
      ['subjects_min', 'subjects_max'],
      ['works_per_evaluator_max'],
      ['works_per_advisor_max'],
      ['works_per_collaborator_max'],
      ['words_per_work_max'],
      ['evaluators_count'],
      ['workload'],
      ['evaluation_criteria'],
      ['banner'],
    ]

    const payload: Record<string, any> = {}

    newEdtion.value.newedition.forEach((field: any, index: number) => {
      const keys = fieldMap[index]
      if (!keys) return

      if (field?.qtds) {
        keys.forEach((key, keyIndex) => {
          payload[key] = field.qtds?.[keyIndex]?.value
        })
        return
      }

      payload[keys[0]] = field?.type === 'evaluation_criteria'
        ? field.value.map((group: any) => ({
            key: group.key,
            target: group.target,
            label: group.label,
            weight: Number(group.weight),
            criteria: (group.criteria || []).map((criterion: any) => ({
              key: criterion.key,
              label: criterion.label,
              description: criterion.description || '',
              weight: Number(criterion.weight),
            })),
          }))
        : field?.value
    })

    if (payload.banner) {
      const { data } = await api.post('images/', { file: payload.banner }, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      })

      payload.banner = data.attachment_key
    }

    return payload
  }

  // const alertStudent = computed(() => 'A data de submissão é de ' + state.value.currentEdition?.initial_submission_date + ' até ' + state.value.currentEdition?.final_submission_date)
  // const teacherStudent = computed(() => 'Registro de Avaliadores (' + state.value.currentEdition?.initial_registration_evaluator_date + ' até ' + state.value.currentEdition?.final_registration_evaluator_date + ')')

  // const isOpenForWork = computed(() => {
  //   const currentDate = new Date()
  //   const initialSubmissionDate = new Date(state.value.currentEdition?.initial_submission_date)
  //   const finalSubmissionDate = new Date(state.value.currentEdition?.final_submission_date)
  //   return initialSubmissionDate <= currentDate && finalSubmissionDate >= currentDate
  // })
  // const isOpenForRegister = computed(() => {
  //   const currentDate = new Date()
  //   const initialSubmissionDate = new Date(state.value.currentEdition?.initial_registration_theme_date)
  //   const finalSubmissionDate = new Date(state.value.currentEdition?.final_registration_theme_date)
  //   return initialSubmissionDate <= currentDate && finalSubmissionDate >= currentDate
  // })
  // const isOpenForAprove = computed(() => {
  //   const currentDate = new Date()
  //   const initialAdvisorDate = new Date(state.value.currentEdition?.initial_advisor_date)
  //   const finalAdvisorDate = new Date(state.value.currentEdition?.final_advisor_date)
  //   return initialAdvisorDate <= currentDate && finalAdvisorDate >= currentDate
  // })
  // const isOpenForGroup = computed(() => {
  //   const currentDate = new Date()
  //   const initialThemeDate = new Date(state.value.currentEdition?.initial_registration_theme_date)
  //   const finalSubmissionDate = new Date(state.value.currentEdition?.final_submission_date)
  //   return initialThemeDate <= currentDate && finalSubmissionDate >= currentDate
  // })
  // const isOpenForEvaluation = computed(() => {
  //   const currentDate = new Date()
  //   const initialEvaluationDate = new Date(state.value.currentEdition?.initial_evaluators_date)
  //   const finalEvaluationDate = new Date(state.value.currentEdition?.final_evaluators_date)
  //   return initialEvaluationDate <= currentDate && finalEvaluationDate >= currentDate
  // })

  const setLoading = (loading: boolean) => {
    state.value.loading = loading
  }

  const setError = (message: string | null) => {
    state.value.error = message
  }

  const fetchEditions = async () => {
    setLoading(true)
    setError(null)
    try {
      const editions = await EditionsService.getEditions()
      state.value.editions = editions

    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentEdition = async () => {
    setLoading(true)
    setError(null)
    try {
      const edition = await EditionsService.getOpenEdition()
      state.value.currentEdition = edition

    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const createEdition = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await CreateObjArr()
      const newEdition = await EditionsService.createEdition(data)
      state.value.editions.push(newEdition)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
      newEdtion.value.newedition.forEach(s => {
        if (s?.qtds) {
          s.qtds.forEach((q: any) => {
            q.value = "";
          });
        } else if (s?.type === 'evaluation_criteria') {
          s.value = defaultEvaluationCriteria()
        } else {
          s.value = "";
        }
      });
    }
  }

  const updateEdition = async (editionId: any, editionData: IEdition) => {
    setLoading(true)
    setError(null)
    try {
      const updatedEdition = await EditionsService.updateEdition(editionId, editionData)
      const index = state.value.editions.findIndex((edition: any) => edition.id === editionId)
      if (index !== -1) {
        state.value.editions[index] = updatedEdition
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const submitFeedback = async (editionId: string, feedback: string) => {
    setLoading(true)
    setError(null)
    try {
      await EditionsService.submitFeedback(editionId, feedback)
      showMessage('Feedback enviado com sucesso', 'success', 3000, 'top-right', 'light', false)
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    state,
    currentEdition,
    fetchEditions,
    fetchCurrentEdition,
    createEdition,
    updateEdition,
    submitFeedback,
    newEdtion,
    CreateObjArr,
    normalizeNewEditionDraft
  }
})
