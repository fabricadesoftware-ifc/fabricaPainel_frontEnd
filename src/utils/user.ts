import { showMessage } from '@/utils/toastify';

type UserType = {
  id: string | number
  [key: string]: any
}

type LoadTeamMembersParams = {
  currentUser: UserType
  teamIds: Array<string | number | UserType> | null
  currentTeam: UserType[]
  searchUserFn: (id: string, role: string) => Promise<UserType[]>
}

export async function loadTeamMembers({
  currentUser,
  teamIds,
  currentTeam,
  searchUserFn,
}: LoadTeamMembersParams): Promise<UserType[]> {
  const teamMembers: UserType[] = []

  if (Array.isArray(teamIds) && teamIds.length > 0) {
    try {
      for (const teamId of teamIds) {
        if (typeof teamId === 'object') {
          teamMembers.push(teamId)
        } else {
          const userData = await searchUserFn(teamId.toString(), 'STUDENT')
          if (userData && userData.length > 0) {
            // teamMembers.push(userData[0])
          }
        }
      }

      const alreadyInTeam = teamMembers.some((member) => member.id === currentUser.id)
      if (!alreadyInTeam) {
        teamMembers.push(currentUser)
      }

      return teamMembers
    } catch (error) {
      console.error('Erro ao carregar membros da equipe:', error)
      return [currentUser]
    }
  } else {
    const alreadyInTeam = currentTeam.some((member) => member.id === currentUser.id)
    if (!alreadyInTeam) {
      return [...currentTeam, currentUser]
    }
    return currentTeam
  }
}


type SelectedStudent = {
  user: string | number
  user_type: string
}

type AddUserParams = {
  selectedStudent: SelectedStudent
  searchUsersFn: (userId: string, userType: string) => Promise<UserType[]>
  verifyUserClassFn: (user: UserType) => boolean
  verifyUserWorksFn: (user: UserType) => Promise<boolean>
  team: UserType[]
  isProjectIntegrated: boolean
  me: UserType
  pushToTeam: (user: UserType) => void
}

export const AddUser = async ({
  selectedStudent,
  searchUsersFn,
  verifyUserClassFn,
  verifyUserWorksFn,
  team,
  isProjectIntegrated,
  me,
  pushToTeam,
}: AddUserParams): Promise<void> => {
  if (!selectedStudent) return
  //@ts-ignore
  console.log(selectedStudent)
  if (selectedStudent.user.toString().length === 10) {
  const users = await searchUsersFn(selectedStudent.user.toString(), selectedStudent.user_type)
  
  if (users.length === 0 || !verifyUserClassFn(users[0])) {
    showMessage(
                `Estudante não encontrado`,
                "error",
                1500,
                "top-right",
                "auto",
                false
            );

  } else {

  const student = users[0]
  const isAlreadyInTeam = await verifyUserWorksFn(student)
  const isRepeated = team.some(stu => stu.registration === Number(selectedStudent.user))

  if (!isProjectIntegrated) {
    if (!isAlreadyInTeam && !isRepeated) {
      pushToTeam(student)
    } else {
      showMessage(
                    `Este estudante já se encontra em uma equipe`,
                    "error",
                    1500,
                    "top-right",
                    "auto",
                    false
                );
    }
  } else {
    const sameClass = me.user_classes?.[0]?.class_name === student.user_classes?.[0]?.class_name

    if (!sameClass) {
      showMessage(
                        `Este Estudante Não pertence a sua turma`,
                        "error",
                        1500,
                        "top-right",
                        "auto",
                        false
                    );
    } else if (!isAlreadyInTeam && !isRepeated) {
      pushToTeam(student)
    } else {
      showMessage(
                    `Este estudante já se encontra em uma equipe`,
                    "error",
                    1500,
                    "top-right",
                    "auto",
                    false
                );
    }
  }
}
  } else {
    showMessage(
      `A matrícula deve conter no mínimo 10 números`,
      "error",
      1500,
      "top-right",
      "auto",
      false
  );
  }
}

