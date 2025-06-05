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