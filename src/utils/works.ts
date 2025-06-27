import { useRouter } from "vue-router"
const router = useRouter()
export const orderByUserId = (members: Array<any>, user_id: number | string) => {
  return members.sort((a, b) => {
    if (a.id === user_id) return -1
    if (b.id === user_id) return 1
    return 0
  })
}

export const resolveStatus = (status:number) => {
    switch (status) {
        case 1: {
            return {
                text: 'Pendente',
                color: 'yellow-darken-2'
            }
        }
        case 2: {
            return {
                text: 'Aprovado',
                color: 'green-darken-2'
            }
        }
        case 3: {
            return {
                text: 'Necessita de Mudanças',
                color: 'indigo-darken-2'
            }
        }
        case 4: {
            return {
                text: 'Rejeitado',
                color: 'red-darken-2'
            }
        }
    }
} 

type User = {id: Number | String}
type Advisor = { id: Number | String }

type Work = { advisor: Advisor, work_collaborator: Array<any>, evaluator: Array<any> }
//@ts-ignore
export const resolveUserFunction = (work:Work, user) => {
  console.log(work)
    const advisor = work.advisor.id == user.id
    const evaluator = work.evaluator.some((s) => s.user.id == user.id)
    const collaborator = work.work_collaborator.some((s) => s.collaborator.id == user.id)
    
    if (advisor) {
        return 'ADVISOR'
    } else if (evaluator) {
        return 'EVALUATOR'
    } else if (collaborator) {
        return 'COLLABORATOR'
    } else {
        return 'STUDENT'
    }
}

// Work Header Functions and Constants

export const userCase = reactive<{
  text: string
  color: string
  icon: string,
  function: Function | null,
  function_two: Function | null,

}>({
  text: '',
  color: '',
  icon: '',
  function: null,
  function_two: null,
})

type StoreWithRemoveWork = {
  removeWork: (id: String, token: String) => Promise<any>
}

type StoreWithAproveWork = {
  approveWork: (verification_token: String) => Promise<any>
}

type StoreWithRejectWork = {
  rejectWork: (verification_token: String) => Promise<any>
}

export const removeWork = async (id: String, store: StoreWithRemoveWork, token: String) => {
    console.log(store)
  await store.removeWork(id, token)
}

export const aproveWork = async (verification_token: String, store: StoreWithAproveWork) => {
  console.log('aq tambme')
  await store.approveWork(verification_token)
}

export const rejectWork = async (verification_token: String, store: StoreWithRejectWork) => {
  await store.rejectWork(verification_token)
}


export const validate_user_function = (user_function: string, work_status: Number) => {
  console.log(user_function)

  if (user_function === 'EVALUATOR' || user_function === 'ADVISOR') {
    if (work_status == 2) {

    
    userCase.text = 'Atribuir Nota'
    userCase.color = '#1F8BDD'
    userCase.icon = '$ratingFull'

    if (user_function == 'EVALUATOR') {
      userCase.function = null  
    } else {
      userCase.function = null
    }
  } else if (user_function === 'ADVISOR' && work_status == 1 || work_status == 3 ) {
      

        userCase.text = 'Aprovar Trabalho'
        userCase.color = '#1F8BDD'
        userCase.icon = '$success'
        userCase.function = aproveWork
        userCase.function_two = rejectWork
  }
    
  } else if (user_function == 'STUDENT') {
    userCase.text = 'Cancelar Submissão'
    userCase.color = '#EC3223'
    userCase.icon = '$delete'
    userCase.function = removeWork  
  }
}