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
                text: 'Cancelado',
                color: 'red-darken-2'
            }
        }
    }
} 

export const resolveUserFunction = (advisor:any, evaluator:any, collaborator:any ) => {

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

}>({
  text: '',
  color: '',
  icon: '',
  function: null,

})

type StoreWithRemoveWork = {
  removeWork: (id: String, token: String) => Promise<any>
}

export const removeWork = async (id: String, store: StoreWithRemoveWork, token: String) => {
    console.log(store)
  await store.removeWork(id, token)
}

export const validate_user_function = (user_function: string) => {
  if (user_function === 'EVALUATOR' || user_function === 'ADVISOR') {
    userCase.text = 'Atribuir Nota'
    userCase.color = '#1F8BDD'
    userCase.icon = '$ratingFull'

    if (user_function == 'EVALUATOR') {
      userCase.function = null  
    } else {
      userCase.function = null
    }
    
  } else {
    userCase.text = 'Cancelar Submissão'
    userCase.color = '#EC3223'
    userCase.icon = '$delete'
    userCase.function = removeWork
  
    
  }
}