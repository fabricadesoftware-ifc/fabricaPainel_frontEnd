import { ref } from "vue";

// Passos para cadastrar um trabalho

type Step = {
  title: string;
  value: string;
  complete: boolean;
  is_actual: boolean;
};

export const steps = ref<Step[]>([
  {
    title: "Alunos da Equipe",
    value: "1",
    complete: false,
    is_actual: true,
  },
  {
    title: "Informar disciplinas",
    value: "2",
    complete: false,
    is_actual: false,
  },
  {
    title: "Orientador do Projeto",
    value: "3",
    complete: false,
    is_actual: false,
  },
  {
    title: "Colaboradores do projeto",
    value: "4",
    complete: false,
    is_actual: false,
  },
  {
    title: "Proposta de Integração",
    value: "5",
    complete: false,
    is_actual: false,
  },
]);

export const resetSteps = () => {
  for (let i = 0; i < steps.value.length; i++) {
    steps.value[i].complete = false;
    steps.value[i].is_actual = false;
  }
};
type User = {
  id: number;
  email: string;
};

type Collaborator = {
  id: number;
  status: number;
};

type Collaborators = {
  id: number,
  status: number
  collaborator: Collaborator,
}



type Work = {
  status: number;
  advisor_status?: number;
  edition?: {
    year: number;
  };
  work_collaborator?: Collaborators[];
  year?: number; 
};

export const hasReachedWorkLimit = (
  user: User,
  userWorks: Work[],
  maxWorks: number,
  is_advisor: boolean,
  year:number = new Date().getFullYear(),
  validStatus:number = 2,
  workValidStatus:number[] = [1, 2, 3],
) => {

  let activeWorks = 0;
  for (const work of userWorks) {
    if (is_advisor) {
      if (work.advisor_status == validStatus && work.edition?.year === year && workValidStatus.includes(work.status)) {
        activeWorks++;
      }
    } else {
      if (work.edition?.year == year && Array.isArray(work.work_collaborator) && workValidStatus.includes(work.status)) {
       const collaboratorInWork = work.work_collaborator.find(u => u.collaborator.id == user.id)
          if (collaboratorInWork?.status == validStatus) {
            activeWorks++;
          }
        
      }
    }
  }

  console.log(`${user.email}_activeWorks: ${activeWorks}/${maxWorks}`, userWorks);
  return activeWorks >= maxWorks;
};
